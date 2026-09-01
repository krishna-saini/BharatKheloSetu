"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { signIn } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { Button, Card } from "@/components/ui";
import { Nav } from "@/components/nav";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function continueToProfile() {
    setError("");
    setBusy(true);

    try {
      const user = await signIn();
      const existing = await getDoc(doc(db, "users", user.uid));
      router.push(existing.exists() && existing.data().profileComplete === true ? "/profile" : "/onboarding/profile");
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  }

  return <><Nav /><main className="container-page grid min-h-[calc(100vh-64px)] place-items-center py-10"><Card className="w-full max-w-md p-6 sm:p-8"><p className="eyebrow">Join the network</p><h1 className="mt-4 font-heading text-3xl font-extrabold">Welcome to the network.</h1><p className="mt-2 text-sm leading-6 text-slate-600">Create your sports profile and connect with the community.</p><Button className="mt-7 w-full" disabled={busy} onClick={continueToProfile}>{busy ? "Continuing…" : "Continue"}</Button>{error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}</Card></main></>;
}
