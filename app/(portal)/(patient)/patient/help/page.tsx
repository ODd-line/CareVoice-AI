import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PatientHelpPage() {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-4xl">Call for Help</CardTitle>
        <CardDescription className="text-xl">Large emergency contacts for elderly patients.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Button size="lg" variant="destructive" className="min-h-24 text-2xl"><PhoneCall className="h-8 w-8" /> Call Family</Button>
        <Button size="lg" variant="destructive" className="min-h-24 text-2xl"><PhoneCall className="h-8 w-8" /> Call Hospital</Button>
      </CardContent>
    </Card>
  );
}