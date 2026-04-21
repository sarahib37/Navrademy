"use client";

import { useParams } from "next/navigation";
import EventLanding from "@/components/EventLanding"; 
import { FIRST_EVENT } from "@/lib/eventList";

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string;

  const event = FIRST_EVENT.find((e) => e.slug === slug);

  if (!event) {
    return <div className="p-10 text-center">Event not found</div>;
  }

  return <EventLanding FIRST_EVENT={event} />;
}