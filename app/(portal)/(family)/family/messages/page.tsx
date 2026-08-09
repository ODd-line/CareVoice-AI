import { Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { familyMessages } from "@/lib/mock-data";

export default function FamilyMessagesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Communications</CardTitle>
        <CardDescription>Listen to patient voice notes and send text or voice replies.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {familyMessages.map((message) => (
          <div key={`${message.from}-${message.time}`} className="rounded-lg border p-4">
            <p className="text-sm font-semibold text-muted-foreground">{message.from} · {message.time}</p>
            <p className="text-lg">{message.text}</p>
          </div>
        ))}
        <div className="flex gap-2">
          <Input placeholder="Type a reply for the patient" />
          <Button><Send className="h-4 w-4" /> Send</Button>
          <Button variant="outline"><Mic className="h-4 w-4" /> Voice</Button>
        </div>
      </CardContent>
    </Card>
  );
}