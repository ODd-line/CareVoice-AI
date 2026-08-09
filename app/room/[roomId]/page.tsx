import Link from "next/link";
import { LockKeyhole, ShieldCheck, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
import { secureCareRoom } from "@/lib/mock-data";
import { verifyRoomInvite } from "@/lib/room-invites";

type RoomInvitePageProps = {
  params: Promise<{ roomId: string }>;
  searchParams: Promise<{ token?: string }>;
};

export default async function RoomInvitePage({ params, searchParams }: RoomInvitePageProps) {
  const [{ roomId }, { token }] = await Promise.all([params, searchParams]);
  const session = await auth();
  const tokenMatches = roomId === secureCareRoom.id
    && verifyRoomInvite(token, roomId, session?.user?.email || "", session?.user?.role || "patient");

  return (
    <main className="min-h-screen healthcare-grid px-4 py-10">
      <section className="mx-auto max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <Badge tone={tokenMatches ? "green" : "yellow"}>{tokenMatches ? "Invite verified" : "Access denied"}</Badge>
            <CardTitle className="text-4xl">Join CareVoice Secure Room</CardTitle>
            <CardDescription>{roomId}{tokenMatches ? ` · ${secureCareRoom.ward}` : ""}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="flex items-center gap-2 font-semibold"><LockKeyhole className="h-4 w-4 text-primary" /> Privacy secure join</p>
              <p className="mt-2 text-sm text-muted-foreground">{tokenMatches ? "This server-signed room invitation is valid for the current signed-in user." : "This invitation is missing, invalid, or expired. Ask authorized staff to issue a new link."}</p>
            </div>
            {tokenMatches ? <div className="grid gap-3 md:grid-cols-3">
              {secureCareRoom.assignedTeam.map((person) => <div key={person.name} className="rounded-lg border bg-white p-4">
                <p className="font-semibold">{person.role}</p>
                <p className="text-sm text-muted-foreground">{person.name}</p>
                <p className="mt-2 text-xs text-muted-foreground">{person.access}</p>
              </div>)}
            </div> : null}
            <div className="flex flex-wrap gap-3">
              {tokenMatches ? <Button><UserPlus className="h-4 w-4" /> Request Room Access</Button> : null}
              <Button variant="outline" asChild><Link href="/">Back to CareVoice</Link></Button>
            </div>
            {tokenMatches ? <p className="flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> {secureCareRoom.encryption}</p> : null}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}