# 🎤 CareVoice AI
Pilot-ready voice triage and caregiver logging tool for elderly care. Built for HKICT Awards 2026 (Student Innovation Award).

## ✅ What is actually doable
- Voice capture in Cantonese and English
- Automatic categorization for medication, symptom, and emergency mentions
- Caregiver handoff notes, session briefs, and CSV evidence export
- A 3-minute judge mode with seeded scenarios for live demo reliability
- Local-first web app that still works without cloud sync during the pitch

## 🚫 What is intentionally out of scope
- No diagnosis claims
- No hospital EMR integration for the competition build
- No promise of replacing clinicians or emergency services
- No dependence on a perfect internet connection for the live demo

## 🚀 Quick Start (VS Code)
1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Open folder in VS Code
3. Right-click `index.html` → "Open with Live Server"
4. Test voice input in Chrome/Edge (requires HTTPS in production)

## 🔑 Firebase Setup (Free)
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create project → Enable Firestore & Authentication
3. Project Settings → Web App → Copy config → Paste into `firebase-config.js`
4. In **Authentication > Sign-in method**, enable **Google**
5. Add your deploy domains in **Authentication > Settings > Authorized domains** (e.g. `your-project.vercel.app`)
6. Paste `firestore.rules` into Firestore Rules and publish

## 🔐 API Keys and Secrets
- Firebase Web API keys in frontend apps are **not secrets** and are expected to be visible in browser code.
- Security comes from Firebase Auth, Firestore Rules, Authorized Domains, and optional App Check.
- You should still restrict API key usage in Google Cloud Console to your allowed web referrers.
- Never put true secrets (service account keys, private server keys) in this frontend repo.

## 🔒 Security Rules (Competition-Safe)
- Rule template is provided in `firestore.rules`
- Allows authenticated users to write/read only their own logs
- Blocks update/delete from client side to keep evidence integrity
- Validates category, language, text length, and latency fields

## ☁️ Deploy to Vercel
```bash
npm i -g vercel
vercel login
vercel --prod
```
Live URL: `https://your-project.vercel.app` (auto HTTPS)

## 🏆 HKICT Alignment
| Criteria | Implementation |
|----------|----------------|
| Innovation | Voice-first triage plus caregiver handoff workflow |
| Impact | Reduces missed medication notes, symptom drift, and manual re-logging |
| UX/Buy-in | Zero-learning interface, bilingual flow, judge-mode demo path |
| Ethics | Clear non-diagnostic disclaimer, human-in-the-loop escalation, scoped data capture |
| Market | NGO / clinic / family caregiver pilot with exportable audit trail |

## 🎯 Competition-Safe MVP Scope
The version in this repo is deliberately narrow so it can be finished, tested, and shown live:
1. Elderly user speaks in Cantonese or English.
2. The app labels the note as medication, symptom, or emergency.
3. The caregiver workspace stores the record, brief, and evidence CSV.
4. Judge Mode plays a repeatable 3-minute demo without needing a real patient.

That is enough to demonstrate function, social impact, and product readiness without overpromising clinical AI.

## 🧭 How the Product Actually Works
1. Open the home page and go to the Voice Capture Studio.
2. Speak naturally in Cantonese or English, or use Judge Mode to seed a realistic demo sequence.
3. The app classifies the input into medication, symptom, or emergency and writes a local log.
4. The member workspace turns those logs into a short brief and an exportable CSV for judges or caregivers.

Judge Mode is intentionally local-first so it still works when Firebase login is not available on stage.

## 🏅 What Past HKICT Student Innovation Winners Tend to Look Like
Public past winners show a clear pattern:
- 2025: ArtInSight, a focused AI art learning platform with a specific learning workflow.
- 2023: Meditech, a medication-adherence solution aimed at a real elderly-care pain point.
- 2022: A human-in-the-loop cobot system with a clear industrial workflow and practical deployment story.

The common thread is not “AI everywhere.” It is a narrow problem, a working prototype, measurable impact, and a credible deployment path. That is the standard this project should keep matching.

## 📌 Official Rule Signals (HKICT 2025/2026 FAQ + EdCity)
- Student Innovation judging weights (Senior Secondary / Higher Education):
  - Innovation and Creativity: 25%
  - Functionality and Performance: 30%
  - Market Potential / Performance: 10%
  - Quality: 20%
  - Social Impact: 15%
- Presentation language can be English, Cantonese, or Putonghua (declare in application)
- Equipment setup time is 3 minutes; overrun reduces presentation time
- Category judging presentation + Q&A is around 20-30 minutes (LO dependent)
- Grand judging uses 15-minute presentation + 10-minute Q&A
- Own device/video demo is allowed
- No strict limit on presenter count (but reasonable team size recommended)
- Best Use of AI is optional and at most one per category; must declare AI/AIGC use in form

## 🎯 Stand-Out Strategy (Ethical Competitive Advantage)
1. Optimize for the 30% Functionality score first
	- Live voice demo in Cantonese and English
	- Show emergency trigger + caregiver escalation in one pass
	- Use the in-app 3-minute Judge Mode to prove execution discipline

2. Use setup-time rule to your advantage
	- Pre-open browser tab and preload microphone permissions before your slot
	- Use one-click Judge Mode start to avoid losing time

3. Maximize AI award chance without overclaiming
	- Explicitly state: AI is assistive, human-in-the-loop, not diagnosis
	- Show AI risk handling, data minimization, and disclaimer in live flow

4. Convert soft claims into hard evidence
	- Use the Evidence Dashboard counters in live judging
	- Export CSV on the spot to prove auditability and reproducibility

5. Use bilingual presentation as a differentiation edge
	- 60 seconds Cantonese user scenario
	- 60 seconds English caregiver summary scenario
	- Shows inclusivity and practical HK deployment readiness

## 📝 Pilot & Submission Tips
- Record a 3-minute Stage-1 demo and a full 15-minute Grand-judging version
- Collect SUS usability scores (target >75; current demo target 82)
- Include architecture diagram, threat model, and data flow in submission PDF
- Keep AI as "assisted tool only" and include limitations statement
- Bring one technical presenter + one market presenter for balanced Q&A coverage
