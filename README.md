# BharatKheloSetu

Phase 1 of a mobile-first professional profile and directory network for Indian sport. It includes a landing page, interim Firebase anonymous authentication, role-based onboarding, and an editable profile summary.

## Local setup

1. Install Node.js 20+ and run `npm install`.
2. Copy `.env.local.example` to `.env.local` and provide the values from **Firebase console → Project settings → Your apps → Web app**:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
3. In Firebase Authentication, enable **Anonymous** as a sign-in provider. Add `localhost` to Authorized domains for local development.
4. Create a Firestore database, then deploy the included rules: `firebase deploy --only firestore:rules` (after installing and authenticating the Firebase CLI). The included `firebase.json` points Firebase CLI at `firestore.rules`.
5. Start the app: `npm run dev`, then open `http://localhost:3000`.

## Firebase security and admin access

The `firestore.rules` policy lets users read and write only their own `users/{uid}` document. A user with the Firebase custom claim `admin: true` may read all user profiles.

To grant the claim, create a service-account credential and export the three server-only variables in `.env.local` (or your shell): `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`. Then run:

```bash
npm run set-admin -- YOUR_FIREBASE_UID
```

Never expose these three Admin SDK values in browser code or commit `.env.local`.

## Data model

Profiles live at `users/{uid}` and include a manually entered phone number, basic information, sport(s), primary role, role-specific details, achievements (up to 10), social links, consent, visibility, and completion metadata. Date of birth is validated client-side at 18+ before the profile is written.

## Authentication roadmap

Authentication is temporarily anonymous. OTP will be added later through a third-party provider that verifies the phone number; a backend using the Firebase Admin SDK will mint a Firebase custom token for the client to sign in with.
