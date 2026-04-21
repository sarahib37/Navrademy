import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { db } from "@/lib/firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Loader2, Shield } from "lucide-react";
import { sendRegistrationEmail } from "@/lib/eventList";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
  eventTitle: string;
}

const howHeardOptions = [
  "Social Media",
  "Friend / Referral",
  "Google Search",
  "WhatsApp Community",
  "Email Newsletter",
  "Other",
];

const situationOptions = [
  "Student",
  "Graduate",
  "Professional",
  "Job Seeker",
  "Freelancer",
  "Career Switcher",
  "Other",
];

export default function EventRegistrationModal({ open, onOpenChange, eventId, eventTitle }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentSituation, setCurrentSituation] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [bringingGuests, setBringingGuests] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referrerName, setReferrerName] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const reset = () => {
    setFullName(""); setEmail(""); setPhone(""); setCurrentSituation("");
    setHowHeard(""); setBringingGuests(false); setGuestCount(1); setReferrerName(""); setSuccess(false); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    if (howHeard === "Friend / Referral" && !referrerName.trim()) {
      toast({
        title: "Please provide referrer name or email",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "event_registrations"), {
        event_id: eventId,
        event_title: eventTitle,
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        how_heard: howHeard || currentSituation || "",
        referrer_name: howHeard === "Friend / Referral" ? referrerName.trim() : "",
        current_situation: currentSituation || "",
        bringing_guests: bringingGuests,
        guest_count: bringingGuests ? guestCount : 0,
        created_at: serverTimestamp(),
      });

      await sendRegistrationEmail(email)

      setSuccess(true);

      queryClient.invalidateQueries({
        queryKey: ["event-registrations-count", eventId],
      });

    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };

  if (success) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <CheckCircle className="h-16 w-16 text-primary" />
            <h3 className="text-2xl font-heading font-bold">You're In! 🎉</h3>
            <p className="text-muted-foreground">
              Your spot has been reserved. Please check your mail for more info.
            </p>
            <Button onClick={() => handleClose(false)} className="mt-2">Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">Reserve Your Spot</DialogTitle>
          <DialogDescription>Fill out the details below to register for the experience.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Adaeze Okafor" required maxLength={100} />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required maxLength={255} />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 800 000 0000" required maxLength={20} />
          </div>
          <div>
            <Label>Current Level</Label>
            <Select value={currentSituation} onValueChange={setCurrentSituation}>
              <SelectTrigger><SelectValue placeholder="Select your level" /></SelectTrigger>
              <SelectContent>
                {situationOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>How did you hear about this?</Label>
            <Select value={howHeard} onValueChange={setHowHeard}>
              <SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger>
              <SelectContent>
                {howHeardOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
            {howHeard === "Friend / Referral" && (
              <div className="space-y-3">
                <Label htmlFor="referrerName">Referrer's Name</Label>
                <Input
                  id="referrerName"
                  value={referrerName}
                  onChange={(e) => setReferrerName(e.target.value)}
                  placeholder="e.g. John Doe"
                  maxLength={100}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="guests">Are you coming with someone?</Label>
            <Switch id="guests" checked={bringingGuests} onCheckedChange={setBringingGuests} />
          </div>
          {bringingGuests && (
            <div>
              <Label htmlFor="guestCount">How many guests?</Label>
              <Input id="guestCount" type="number" min={1} max={10} value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Registering...</> : "RESERVE MY SPOT →"}
          </Button>
          <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1">
            <Shield className="h-3 w-3" />
            Your info is safe. No spam, ever.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
