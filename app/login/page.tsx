"use client";

import { useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { Button, Card } from "@/components/ui";
import { Nav } from "@/components/nav";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
}

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function continueAnonymously() {
    setError("");
    setBusy(true);
    try {
      const credential = await signInAnonymously(auth);
      const existing = await getDoc(doc(db, "users", credential.user.uid));
      router.push(existing.exists() && existing.data().profileComplete ? "/profile" : "/join");
    } catch (caughtError) {
      setError(errorMessage(caughtError));
    } finally {
      setBusy(false);
    }
  }

  return <><Nav/><main className="container-page grid min-h-[calc(100vh-64px)] place-items-center py-10"><Card className="w-full max-w-md p-6 sm:p-8"><p className="eyebrow">Quick start</p><h1 className="mt-4 font-heading text-3xl font-extrabold">Welcome to the network.</h1><p className="mt-2 text-sm leading-6 text-slate-600">Create your sporting profile in a few minutes. You can add your contact number while completing it.</p><Button className="mt-7 w-full" disabled={busy} onClick={continueAnonymously}>{busy ? "Continuing…" : "Continue"}</Button>{error && <p className="mt-4 break-words text-sm font-semibold text-red-600">{error}</p>}</Card></main></>;
}
