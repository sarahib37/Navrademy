import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, X } from "lucide-react";
import { type Course } from "@/lib/courses";

interface CourseFormProps {
  initialData?: Partial<Course>;
  onSave: (data: Course) => void;
  onCancel: () => void;
  isEditing: boolean;
  isSaving: boolean;
}

export function CourseForm({
  initialData,
  onSave,
  onCancel,
  isEditing,
  isSaving,
}: CourseFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [id, setId] = useState(initialData?.id ?? "");
  const [category, setCategory] = useState<Course["category"]>(initialData?.category ?? "live");
  const [type, setType] = useState<Course["type"]>(initialData?.type ?? "individual");
  const [price, setPrice] = useState(initialData?.price?.toString() ?? "0");
  const [duration, setDuration] = useState(initialData?.duration ?? "");
  const [students, setStudents] = useState(initialData?.students ?? "0");
  const [level, setLevel] = useState<Course["level"]>(initialData?.level ?? "beginner");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [whoIsFor, setWhoIsFor] = useState<string[]>(
    Array.isArray(initialData?.who_is_for) ? initialData?.who_is_for : []
  );
  
  const [whoIsNotFor, setWhoIsNotFor] = useState<string[]>(
    Array.isArray(initialData?.who_is_not_for) ? initialData?.who_is_not_for : []
  );
  
  const [newWhoIsFor, setNewWhoIsFor] = useState("");
  const [newWhoIsNotFor, setNewWhoIsNotFor] = useState("");
  const [outcomes, setOutcomes] = useState<string[]>(initialData?.outcomes ?? []);
  const [curriculum, setCurriculum] = useState<string[]>(initialData?.curriculum ?? []);
  const [newOutcome, setNewOutcome] = useState("");
  const [newModule, setNewModule] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      id,
      title,
      category,
      type,
      price: parseFloat(price) || 0,
      duration,
      students,
      level,
      description,
      who_is_for: whoIsFor,
      who_is_not_for: whoIsNotFor,
      outcomes,
      curriculum,
    });
  };

  const addItem = (list: string[], setList: (v: string[]) => void, value: string, clear: () => void) => {
    if (value.trim()) {
      setList([...list, value.trim()]);
      clear();
    }
  };

  const removeItem = (list: string[], setList: (v: string[]) => void, index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-8xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {isEditing ? "Edit Course" : "Create New Course"}
        </h2>
      </div>

      {/* Basic Info */}
      <section className="bg-card border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold">Basic Info</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <Select value={category} onValueChange={(v) => setCategory(v as any)} required>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="self-paced">Self-Paced</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={(v) => setType(v as any)} required>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="ID (three unique letters in caps to identify the course)" required />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
          <Input value={duration} required onChange={(e) => setDuration(e.target.value)} placeholder="Duration" />
          <Input value={students} required onChange={(e) => setStudents(e.target.value)} placeholder="Students" />

          <Select value={level} onValueChange={(v) => setLevel(v as any)} required>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Content */}
      <section className="bg-card border rounded-xl p-6 space-y-4">
        <Textarea value={description} required onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      </section>

      <section className="bg-card border rounded-xl p-6 space-y-4">
        <div className="space-y-3">
      <Label>Who this course is for</Label>

      <div className="flex gap-2">
        <Input
          required
          value={newWhoIsFor}
          onChange={(e) => setNewWhoIsFor(e.target.value)}
          placeholder="Add target audience..."
          onKeyDown={(e) =>
            e.key === "Enter" &&
            (e.preventDefault(),
            addItem(whoIsFor, setWhoIsFor, newWhoIsFor, () => setNewWhoIsFor("")))
          }
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() =>
            addItem(whoIsFor, setWhoIsFor, newWhoIsFor, () => setNewWhoIsFor(""))
          }
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {whoIsFor.map((item, i) => (
        <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 text-sm">
          <span className="flex-1">{item}</span>
          <button
            type="button"
            onClick={() => removeItem(whoIsFor, setWhoIsFor, i)}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>

    {/* Who it's NOT for */}
    <div className="space-y-3">
      <Label>Who this course is NOT for</Label>

      <div className="flex gap-2">
        <Input
          required
          value={newWhoIsNotFor}
          onChange={(e) => setNewWhoIsNotFor(e.target.value)}
          placeholder="Add exclusion..."
          onKeyDown={(e) =>
            e.key === "Enter" &&
            (e.preventDefault(),
            addItem(
              whoIsNotFor,
              setWhoIsNotFor,
              newWhoIsNotFor,
              () => setNewWhoIsNotFor("")
            ))
          }
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() =>
            addItem(
              whoIsNotFor,
              setWhoIsNotFor,
              newWhoIsNotFor,
              () => setNewWhoIsNotFor("")
            )
          }
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {whoIsNotFor.map((item, i) => (
        <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 text-sm">
          <span className="flex-1">{item}</span>
          <button
            type="button"
            onClick={() => removeItem(whoIsNotFor, setWhoIsNotFor, i)}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
      </section>

      {/* Outcomes */}
      <section className="bg-card border rounded-xl p-6 space-y-4">
        <div className="flex gap-2">
          <Input  required value={newOutcome} onChange={(e) => setNewOutcome(e.target.value)} placeholder="Add outcome" />
          <Button type="button" onClick={() => addItem(outcomes, setOutcomes, newOutcome, () => setNewOutcome(""))}>
            <Plus />
          </Button>
        </div>

        {outcomes.map((o, i) => (
          <div key={i} className="flex justify-between">
            {o}
            <X onClick={() => removeItem(outcomes, setOutcomes, i)} />
          </div>
        ))}
      </section>

      {/* Curriculum */}
      <section className="bg-card border rounded-xl p-6 space-y-4">
        <div className="flex gap-2">
          <Input required value={newModule} onChange={(e) => setNewModule(e.target.value)} placeholder="Add module" />
          <Button type="button" onClick={() => addItem(curriculum, setCurriculum, newModule, () => setNewModule(""))}>
            <Plus />
          </Button>
        </div>

        {curriculum.map((c, i) => (
          <div key={i} className="flex justify-between">
            {i + 1}. {c}
            <X onClick={() => removeItem(curriculum, setCurriculum, i)} />
          </div>
        ))}
      </section>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : isEditing ? "Update Course" : "Create Course"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}