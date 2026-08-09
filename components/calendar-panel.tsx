"use client";

import { Calendar, dateFnsLocalizer, type Event } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export type CalendarPanelProps = {
  title: string;
  description: string;
  events: Event[];
};

export function CalendarPanel({ title, description, events }: CalendarPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" defaultView="week" views={["week", "day", "agenda"]} />
      </CardContent>
    </Card>
  );
}