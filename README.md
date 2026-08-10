# CareVoice

CareVoice began with a simple question: what if an older person could ask for help, check a medication reminder, or reach family without working through a complicated screen?

This repository is the working prototype. It includes the CareVoice web portal, a Raspberry Pi home app, a native Android companion, and an optional local language model. The Pi version is designed to keep the main care and social features available on the local network, even when the internet is unreliable.

CareVoice is a student prototype. It is not a medical device, an emergency service, or a replacement for a clinician. Do not use real patient information in a demo installation.

## What you can use

- **CareVoice Home** is the Raspberry Pi and computer experience. It opens directly at `/desktop` and contains care shortcuts, reminders, local device pairing, and games.
- **Local Mahjong Race** lets one person create a room and share a QR code. Up to eight people on the same Wi-Fi can race on the same tile layout from their own screens.
- **Bedside pairing** creates a short-lived, single-use link between a named patient, their assigned doctor, and the native CareVoice app. Public website hosts are refused by the pairing API.
- **Role workspaces** provide separate patient, family, and staff tools. Protected routes use Auth.js sessions and server-side role checks.
- **CareVoice AI** can use the local Qwen model on the Pi, a configured Gemini provider, or deterministic safety responses when neither model is available.

The repository also contains an older static competition demo. It is useful for offline judging, but it is not part of the authenticated Next.js security boundary.

## Run the computer app

You need Node.js 20.9 or newer and npm.

```bash
git clone https://github.com/ODd-line/CareVoice-AI.git
cd CareVoice-AI
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root address sends you directly to CareVoice Home.

For sign-in and protected staff features, set these values in `.env.local`:

```env
AUTH_SECRET=replace-with-a-long-random-secret
GOOGLE_CLIENT_ID=replace-with-google-client-id
GOOGLE_CLIENT_SECRET=replace-with-google-client-secret
CAREVOICE_STAFF_EMAILS=staff@example.com,nurse@example.com
```

Generate `AUTH_SECRET` with `openssl rand -base64 32`. Optional AI settings are described in [.env.example](.env.example) and [carevoice-llm/README.md](carevoice-llm/README.md).

## Play together on the Pi

1. Put every phone or computer on the same Wi-Fi as the CareVoice Pi.
2. Open **Games**, then **Mahjong 3D**.
3. The host enters a name and chooses **Create room and QR**.
4. Other players scan the QR or open `http://carevoice-micro.local:3000` and enter the room code.
5. Each player clears their own copy of the shared board. The leaderboard updates while everyone plays.

Rooms and scores live in the Pi server process and expire after four hours. They are intentionally local and are not sent to a cloud game service.

## Link the bedside controller

Pairing is deliberately unavailable on a public deployment.

1. On CareVoice Home, open **Settings** and choose **Link bedside controller**.
2. Enter the patient and assigned doctor names.
3. Scan the QR with the native CareVoice Android app, or enter the six-digit code in the app.
4. Keep both devices on the same local network until CareVoice reports that the link is complete.

The code expires after 15 minutes and can be claimed once. The prototype stores this link in the Pi process and the Android app's private preferences. A production healthcare deployment would require an encrypted database, managed device identity, revocation, and a formal enrollment process.

## Raspberry Pi appliance

The files in [carevoice-edge](carevoice-edge) build and install the offline appliance. The default local address is:

```text
http://carevoice-micro.local:3000
```

The installer creates systemd services for the web app and local model, adds the CareVoice desktop launcher, and starts the app in Chromium kiosk-style app mode. Large model files, OS images, caches, and generated bundles stay under ignored `dist/` directories and are never committed.

Useful checks on the Pi:

```bash
sudo systemctl status carevoice-web carevoice-model
curl http://127.0.0.1:3000/desktop
curl http://127.0.0.1:8000/health
```

## Android companion

Open [carevoice-android](carevoice-android) in Android Studio and run the `app` configuration. The app is native Android code, not a WebView. Its bedside connection accepts only local hub addresses and the `carevoice://pair` QR deep link.

This checkout does not include a Gradle wrapper, so command-line Android compilation requires either Android Studio or a locally installed compatible Gradle/Android SDK toolchain.

## Security boundaries

The Next.js portal enforces authentication and roles on the server. Room invitations are signed and tied to an email, role, room, and expiry. Bedside pairing and multiplayer APIs additionally check that the request reached the Pi through localhost, a private IP address, or a `.local` hostname.

Important prototype limits:

- Mahjong rooms, device pairings, applications, schedules, and rate limits use process memory.
- Restarting the server clears local room and pending pairing state.
- Multi-instance deployment needs shared transactional storage.
- Device enrollment needs managed hardware identity before clinical use.
- The static Firebase demo is a separate legacy surface and does not share the portal's authorization guarantees.

Never place service-account files, OAuth client secrets, private keys, patient records, model files, or appliance images in Git.

## Validate a change

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

The focused test suite covers role policy, signed invitations, protected APIs, local-host restrictions, single-use device pairing, and multiplayer Mahjong state.

## Repository guide

```text
app/                 Next.js pages and route handlers
components/          Desktop and portal interfaces
lib/                 Roles, stores, safety rules, and signing code
tests/               Vitest behavior and security tests
carevoice-android/   Native Android companion
carevoice-edge/      Raspberry Pi appliance scripts and services
carevoice-llm/       Optional local-model training and serving tools
```

The best way to understand CareVoice is to run it, create a local Mahjong room, and then pair a bedside device. Those three actions show the project as it actually works, without pretending the prototype is further along than it is.