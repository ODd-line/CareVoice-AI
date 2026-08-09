import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StaffNotesPage() {
  return <Card><CardHeader><CardTitle>Clinical Notes</CardTitle><CardDescription>Draft SOAP notes from voice logs and staff reviews.</CardDescription></CardHeader><CardContent>Mock clinical note workspace ready for FHIR/eHRSS export wiring.</CardContent></Card>;
}