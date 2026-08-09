import {
  BellRing,
  Bot,
  Gamepad2,
  Languages,
  Pill,
  Radio,
  ShieldCheck,
  Timer,
  UsersRound
} from "lucide-react";

const capabilities = [
  { icon: Bot, label: "CareVoice AI", state: "Working", detail: "Speech or text input, spoken bilingual replies, bounded intent routing, and urgent-phrase escalation." },
  { icon: Pill, label: "Medication", state: "Working", detail: "Staff-approved reminder, physical YES/help response, missed-dose alert, and nurse review without dose changes." },
  { icon: BellRing, label: "Nurse request", state: "Working", detail: "Bedside request, acknowledgement, estimated response, timeout escalation, and audit history." },
  { icon: UsersRound, label: "Family link", state: "Working", detail: "Approved summaries, calls, voice notes, shared visits, alerts, and role-limited access." },
  { icon: Gamepad2, label: "Social games", state: "Working", detail: "A large-control memory game designed for the Micro joystick without diagnostic scoring." },
  { icon: Radio, label: "Local recovery", state: "Simulated", detail: "Essential actions queue during network loss and synchronize when the ward link returns." },
  { icon: Languages, label: "Accessibility", state: "Working", detail: "Cantonese and English profiles, speech output, large controls, contrast, and low-navigation workflows." },
  { icon: ShieldCheck, label: "Clinical boundary", state: "Enforced", detail: "Signed roles, recipient-bound rooms, human review, explicit non-diagnostic language, and no automatic dose advice." }
];

const validationMetrics = [
  { value: "Task %", label: "Completion rate", detail: "Profile load, reminder response, family contact, and nurse request completed without assistance." },
  { value: "Errors", label: "Wrong-control rate", detail: "Accidental input, misunderstood prompt, wrong profile, and recovery from a mistaken response." },
  { value: "Seconds", label: "Response time", detail: "Time from physical press to confirmation and from nurse request to acknowledgement." },
  { value: "5-point", label: "Comprehension", detail: "Whether users understand system status, next action, and who received the request." },
  { value: "Offline", label: "Recovery test", detail: "Queue an action, interrupt connectivity, restore the link, and verify one-time synchronization." }
];

export function CareVoiceSystemOverview() {
  return (
    <section id="system" className="product-band system-overview-section">
      <div className="section-heading">
        <p className="product-kicker">The complete CareVoice system</p>
        <h2>The controller is the doorway. The care loop is the product.</h2>
        <p>Everything below connects to a role-specific workspace after Google sign-in. AI supports communication and triage; people remain responsible for clinical decisions.</p>
      </div>

      <div className="system-capability-grid">
        {capabilities.map(({ icon: Icon, label, state, detail }, index) => (
          <article key={label}>
            <div className="system-capability-index"><span>{String(index + 1).padStart(2, "0")}</span><em>{state}</em></div>
            <Icon aria-hidden="true" />
            <h3>{label}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </div>

      <div className="iena-response">
        <div className="iena-response-copy">
          <Timer aria-hidden="true" />
          <p className="product-kicker">Built against the IENA review</p>
          <h3>Prove accessibility before expanding the feature list.</h3>
          <p>The MVP test uses four essential controls: CareVoice, medication, family, and nurse. NFC loads the profile, every action confirms visibly, and the staff handoff is recorded.</p>
        </div>
        <div className="validation-metric-grid">
          {validationMetrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <h4>{metric.label}</h4>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}