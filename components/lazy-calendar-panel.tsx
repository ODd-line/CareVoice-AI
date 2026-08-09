"use client";

import dynamic from "next/dynamic";
import type { CalendarPanelProps } from "@/components/calendar-panel";

const CalendarPanel = dynamic(
  () => import("@/components/calendar-panel").then((module) => module.CalendarPanel),
  {
    ssr: false,
    loading: () => <div className="min-h-96 animate-pulse rounded-lg border bg-muted/40" aria-label="Loading calendar" />
  }
);

export function LazyCalendarPanel(props: CalendarPanelProps) {
  return <CalendarPanel {...props} />;
}