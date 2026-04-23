"use client"

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { Badge } from "./ui/badge";
import { format } from "date-fns";

type Props = {}

export default function AdminEvent({}: Props) {
    const [eventRegistrations, setEventRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const q = query(
              collection(db, "event_registrations"),
              orderBy("created_at", "desc")
            );
      
            const querySnapshot = await getDocs(q);
      
            const registrations = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
      
            setEventRegistrations(registrations);
          } catch (error) {
            console.error("Error fetching blogs:", error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchBlogs();
      }, []);

  return (
    <div>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Phone</TableHead>
                <TableHead className="hidden sm:table-cell">Guests</TableHead>
                <TableHead className="hidden lg:table-cell">How heard</TableHead>
                <TableHead className="hidden md:table-cell">Registered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Loading…</TableCell></TableRow>
              ) : !eventRegistrations || eventRegistrations.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No registrations yet</TableCell></TableRow>
              ) : (
                eventRegistrations.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.full_name}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      <a href={`mailto:${r.email}`} className="hover:text-primary inline-flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {r.email}
                      </a>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      <a href={`tel:${r.phone}`} className="hover:text-primary inline-flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {r.phone}
                      </a>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {r.bringing_guests ? (
                        <Badge variant="secondary">+{r.guest_count}</Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{r.how_heard || "—"}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {format(new Date(r.created_at), "MMM d, p")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
    </div>
  )
}