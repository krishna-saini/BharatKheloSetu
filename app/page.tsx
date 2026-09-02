import { ArrowRight, BadgeCheck } from "lucide-react";
import { Nav } from "@/components/nav";
import { GOOGLE_FORM_URL } from "@/lib/config";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="container-page flex min-h-[calc(100vh-64px)] flex-col items-center justify-center py-12 text-center">
        <div className="flex max-w-3xl flex-col items-center">
          <p className="eyebrow">
            <BadgeCheck size={14} /> India&apos;s athlete discovery network
          </p>

          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Your sporting journey deserves a{" "}
            <span className="text-accent">stronger</span> network.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Create your athlete profile and be ready for the opportunities moving
            Indian sport forward.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Register as an athlete <ArrowRight size={17} />
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 border-t border-slate-200 pt-8">
            <Stat value="28" label="States connected" />
            <div className="h-8 w-px bg-slate-200" />
            <Stat value="100%" label="Free to join" />
          </div>
        </div>
      </main>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-heading text-2xl font-extrabold text-primary">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

