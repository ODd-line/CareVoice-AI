import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { triagePatients } from "@/lib/mock-data";

export default function StaffPatientsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Records</CardTitle>
        <CardDescription>Search assigned patients and open voice logs or medical history.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Search patient name, HKID, ward, or urgency" />
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Gender</TableHead><TableHead>Room</TableHead><TableHead>Assigned Team</TableHead><TableHead>Urgency</TableHead><TableHead>Last Check-in</TableHead></TableRow></TableHeader>
          <TableBody>
            {triagePatients.map((patient) => <TableRow key={patient.name}><TableCell className="font-semibold">{patient.name}<span className="block text-xs text-muted-foreground">Age {patient.age}</span></TableCell><TableCell>{patient.gender}</TableCell><TableCell>{patient.roomId}</TableCell><TableCell>{patient.assignedNurse}<span className="block text-xs text-muted-foreground">{patient.assignedDoctor}</span></TableCell><TableCell>{patient.urgency}</TableCell><TableCell>{patient.lastCheckIn}</TableCell></TableRow>)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}