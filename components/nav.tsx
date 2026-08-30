import Link from "next/link";
import { Trophy } from "lucide-react";
export function Nav() { return <header className="border-b bg-white"><nav className="container-page flex h-16 items-center justify-between"><Link href="/" className="flex items-center gap-2 font-heading text-lg font-extrabold"><span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white"><Trophy size={17}/></span>BharatKhelo<span className="text-accent">Setu</span></Link><Link href="/login" className="text-sm font-bold text-primary">Sign in</Link></nav></header>; }
