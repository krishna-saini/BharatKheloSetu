import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
export function Button({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={cn("inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50", className)} {...props}>{children}</button>; }
export function Card({ className, children }: { className?: string; children: ReactNode }) { return <div className={cn("rounded-2xl border bg-white shadow-sm", className)}>{children}</div>; }
export function Input(props: InputHTMLAttributes<HTMLInputElement>) { return <input className="field" {...props} />; }
