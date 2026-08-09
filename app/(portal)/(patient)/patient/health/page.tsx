import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { voiceLogs } from "@/lib/mock-data";

export default function PatientHealthPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Health</CardTitle>
        <CardDescription>Past voice logs and basic vitals.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {voiceLogs.map((log) => (
          <div key={log.time} className="rounded-lg border p-4">
            <p className="font-semibold">{log.time}</p>
            <p className="text-muted-foreground">{log.summary}</p>
            <p className="mt-2 text-sm font-medium">{log.vitals}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}