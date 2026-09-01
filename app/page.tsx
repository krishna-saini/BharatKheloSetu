"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Nav } from "@/components/nav";
import { signIn } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Home() {
  const router = useRouter();
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  async function register() {
    setJoining(true);
    setError("");
    try {
      const user = await signIn();
      await setDoc(doc(db, "users", user.uid), { primaryRole: "athlete", updatedAt: serverTimestamp() }, { merge: true });
      router.push("/onboarding/profile");
    } catch {
      setError("We couldn’t start your registration. Please check your connection and try again.");
      setJoining(false);
    }
  }

  return <><Nav/><main className="container-page grid min-h-[calc(100vh-64px)] items-center gap-10 py-8 sm:py-12 lg:grid-cols-[1.1fr_.9fr] lg:py-16"><div><p className="eyebrow"><BadgeCheck size={14}/> India&apos;s athlete discovery network</p><h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight sm:text-6xl">Your sporting journey deserves a <span className="text-accent">stronger</span> network.</h1><p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">Create your athlete profile and be ready for the opportunities moving Indian sport forward.</p><div className="mt-7"><button onClick={register} disabled={joining} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-bold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-70">{joining ? "Starting registration…" : "Register as an athlete"} <ArrowRight size={17}/></button></div>{error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}<div className="mt-8 flex gap-7"><Stat value="28" label="States connected"/><Stat value="100%" label="Free to join"/></div></div><ProfilePreview/></main></>;
}

function Stat({value,label}:{value:string;label:string}) { return <div><p className="font-heading text-2xl font-extrabold text-primary">{value}</p><p className="text-xs text-slate-500">{label}</p></div>; }
function ProfilePreview() { return <div className="overflow-hidden rounded-2xl border bg-white shadow-sm"><div className="h-20 bg-primary"/><div className="-mt-10 px-6 pb-6"><div className="grid h-20 w-20 place-items-center rounded-2xl border-4 border-white bg-orange-100 font-heading text-2xl font-bold text-accent">AS</div><div className="mt-3 flex items-start justify-between"><div><h2 className="font-heading text-xl font-bold">Aarav Singh</h2><p className="text-sm text-slate-500">Footballer · Bengaluru</p></div><span className="rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-success">Available</span></div><p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">Profile strength</p><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[82%] rounded-full bg-accent"/></div><div className="mt-4"><span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-primary">Football</span></div></div></div>; }
