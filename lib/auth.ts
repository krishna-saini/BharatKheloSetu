import { signInAnonymously, signInWithCustomToken, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function signIn(): Promise<User> {
  const credential = await signInAnonymously(auth);
  return credential.user;
}

// Future: a separate OTP service verifies the phone; a backend (Admin SDK)
// mints a Firebase custom token; the client calls this.
export async function signInWithProviderToken(token: string): Promise<User> {
  const credential = await signInWithCustomToken(auth, token);
  return credential.user;
}

export function logout() {
  return signOut(auth);
}
