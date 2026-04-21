# 🎤 CareVoice AI
Multilingual voice health companion for elderly. Built for HKICT Awards 2026 (Student Innovation Award).

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
| Innovation | Voice-first UI + speech biomarker tracking (pace/keywords) |
| Impact | Addresses HK elderly medication adherence & isolation |
| UX/Buy-in | Zero-learning interface, WCAG-compliant, PWA installable |
| Ethics | PDPO-ready, on-device voice, clear medical disclaimer |
| Market | Scalable to GBA, freemium caregiver dashboard model |

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
