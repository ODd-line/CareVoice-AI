# CareVoice Android App

This is a separate native Android app project for CareVoice. It is not the marketing website and it does not use a WebView.

## What is included

- Login portal screen
- Patient, Hospital Staff, and Family Member role selection
- Local role/profile persistence with `SharedPreferences`
- Patient workspace with guided health log, voice note, SOS, and call family
- Hospital staff workspace with rooms, ward patients, hospital account tools, and patient board creation
- Family workspace with update composer, WhatsApp/SMS/Gmail actions, calendar-style tasks, and call hospital
- Shared encrypted-note placeholder, session status, exports/report actions, data controls, and emergency contact actions

## Open and run

1. Open `carevoice-android/` in Android Studio.
2. Let Android Studio sync Gradle.
3. Run the `app` configuration on an emulator or Android phone.

## Firebase role database

The web app already saves roles in Firestore at `memberProfiles/{uid}`. Native Android Google login needs a separate Firebase Android app registration:

1. Firebase Console -> Project settings -> Add app -> Android.
2. Package name: `com.carevoice.mobile`.
3. Add your debug/release SHA certificate fingerprints.
4. Download `google-services.json` into `carevoice-android/app/`.
5. Add Firebase Auth and Firestore dependencies, then replace the local demo sign-in method with real Google Sign-In.

The current Android app is intentionally dependency-light so it can open as a clean native project first.