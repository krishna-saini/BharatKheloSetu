"use client";
import { useRouter } from "next/navigation";
import { roles, type Role } from "@/lib/profile";
import { BriefcaseBusiness, ChevronRight, Dumbbell, Shield, Telescope, UsersRound } from "lucide-react";
import { Card } from "@/components/ui";
import { Nav } from "@/components/nav";
const icons=[Dumbbell,UsersRound,BriefcaseBusiness,Shield,Telescope,UsersRound,BriefcaseBusiness];
export default function Join(){const router=useRouter(); function select(role:Role){sessionStorage.setItem("selectedRole",role);router.push("/onboarding/profile");} return <><Nav/><main className="container-page py-12"><p className="eyebrow">Step 1 of 2</p><h1 className="mt-4 font-heading text-3xl font-extrabold">What&apos;s your role in sport?</h1><p className="mt-2 max-w-xl text-slate-600">Choose the role that best describes you. You can refine your profile next.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{roles.map((role,i)=>{const Icon=icons[i];return <button key={role} onClick={()=>select(role)} className="text-left"><Card className="group h-full p-5 transition hover:-translate-y-1 hover:border-primary hover:shadow-md"><Icon className="text-primary"/><div className="mt-6 flex items-center justify-between"><h2 className="font-heading font-bold">{role}</h2><ChevronRight className="text-slate-400 group-hover:text-primary" size={18}/></div></Card></button>})}</div></main></>}
