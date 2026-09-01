"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, ShieldCheck } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import type { Profile } from "@/lib/profile";
import { Button, Card } from "@/components/ui";
import { Nav } from "@/components/nav";

export default function ProfilePage() { const router = useRouter(); const [profile, setProfile] = useState<Profile>(); const [authResolved, setAuthResolved] = useState(false); useEffect(() => onAuthStateChanged(auth, async user => { setAuthResolved(true); if (!user) { router.replace("/"); return; } const snapshot = await getDoc(doc(db, "users", user.uid)); if (snapshot.exists()) setProfile(snapshot.data() as Profile); }), [router]); if (!authResolved) return <><Nav/><main className="container-page py-16 text-center text-slate-500">Loading your profile…</main></>; if (!profile) return <><Nav/><main className="container-page py-16 text-center text-slate-500">Your profile has not been completed yet.</main></>; return <><Nav/><main className="container-page max-w-3xl py-10"><Card className="overflow-hidden"><div className="h-28 bg-primary"/><div className="px-6 pb-6"><div className="-mt-12 grid h-24 w-24 place-items-center rounded-2xl border-4 border-white bg-orange-100 font-heading text-3xl font-bold text-accent">{profile.fullName.split(" ").map(name => name[0]).slice(0, 2).join("")}</div><div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row"><div><div className="flex items-center gap-2"><h1 className="font-heading text-3xl font-extrabold">{profile.fullName}</h1><ShieldCheck className="text-primary" size={20}/></div><p className="mt-1 font-semibold text-slate-600">Athlete · {profile.sport}</p><p className="mt-2 text-sm text-slate-500">{profile.district}, {profile.state} · {profile.playingLevel}</p></div><Link href="/onboarding/profile"><Button className="gap-2"><Pencil size={16}/> Edit profile</Button></Link></div><div className="mt-7 border-t pt-6"><div className="flex justify-between text-sm font-bold"><span>{profile.profileCompletionPct}% complete</span><span className="text-success">Active</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-surface"><div className="h-full rounded-full bg-accent" style={{ width: `${profile.profileCompletionPct}%` }}/></div></div></div></Card></main></>; }
