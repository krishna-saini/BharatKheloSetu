export const sports = ["Archery", "Athletics", "Badminton", "Basketball", "Boxing", "Chess", "Cricket", "Cycling", "Football", "Gymnastics", "Hockey", "Judo", "Kabaddi", "Karate", "Kho Kho", "Powerlifting", "Shooting", "Skating", "Swimming", "Table Tennis", "Taekwondo", "Tennis", "Volleyball", "Weightlifting", "Wrestling", "Wushu", "Other"] as const;
export const playingLevels = ["School", "District", "State", "National", "International", "Professional League", "Other"] as const;
// Retained only so the legacy /join route can compile; new registrations bypass it.
export const roles = ["Athlete"] as const;
export type Role = (typeof roles)[number];

export type Declaration = { informationTrue: boolean; noGuarantee: boolean; contactPermission: boolean; timestamp: string };
export type Profile = { fullName: string; whatsapp: string; email?: string; gender: string; dob: string; state: string; district: string; sport: string; playingLevel: string; socialLink?: string; photoURL: string; identityProofURL?: string; declaration: Declaration; primaryRole: "athlete"; profileComplete: boolean; profileCompletionPct: number; createdAt?: unknown; updatedAt?: unknown };

export function getCompletion(profile: Partial<Profile>) {
  const fields = [profile.fullName, profile.whatsapp, profile.dob, profile.gender, profile.state, profile.district, profile.sport, profile.playingLevel, profile.photoURL, profile.declaration?.informationTrue, profile.declaration?.noGuarantee, profile.declaration?.contactPermission];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}
