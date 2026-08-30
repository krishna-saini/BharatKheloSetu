export const roles = ["Athlete", "Coach", "Support", "Official", "Scout", "Team/Club Admin", "Other"] as const;
export type Role = (typeof roles)[number];
export type Profile = { phone: string; fullName: string; email?: string; dob: string; gender: string; city: string; state: string; country: "IN"; sports: string[]; primaryRole: Role; roleDetails: Record<string, string>; photoURL?: string; bio?: string; preferredLanguage: string; socialLinks: Record<string, string>; achievements: string[]; consent: { given: boolean; timestamp: string }; profileVisible: boolean; profileComplete: boolean; profileCompletionPct: number; createdAt?: unknown; updatedAt?: unknown };
export const roleFields: Record<Role, { key: string; label: string; required?: boolean }[]> = {
  Athlete: [{ key: "sport", label: "Sport", required: true }, { key: "position", label: "Position" }, { key: "jerseyNumber", label: "Jersey number" }, { key: "currentTeam", label: "Current team" }, { key: "dominantSide", label: "Dominant side" }, { key: "heightCm", label: "Height (cm)" }, { key: "weightKg", label: "Weight (kg)" }, { key: "yearsExperience", label: "Years of experience" }, { key: "level", label: "Level" }],
  Coach: [{ key: "coachingLevel", label: "Coaching level" }, { key: "certifications", label: "Certifications" }, { key: "yearsCoaching", label: "Years coaching" }, { key: "currentOrg", label: "Current organisation" }, { key: "specialization", label: "Specialisation" }],
  Support: [{ key: "specialization", label: "Specialisation" }, { key: "qualifications", label: "Qualifications" }, { key: "currentOrg", label: "Current organisation" }],
  Official: [{ key: "sport", label: "Sport" }, { key: "certificationLevel", label: "Certification level" }, { key: "certifyingBody", label: "Certifying body" }, { key: "yearsOfficiating", label: "Years officiating" }],
  Scout: [{ key: "organization", label: "Organisation" }, { key: "sportsCovered", label: "Sports covered" }, { key: "regionsCovered", label: "Regions covered" }],
  "Team/Club Admin": [{ key: "orgName", label: "Organisation name" }, { key: "orgType", label: "Organisation type" }, { key: "city", label: "City" }, { key: "title", label: "Title" }],
  Other: [{ key: "roleTitle", label: "Role title" }],
};
export function getCompletion(profile: Partial<Profile>) { const fields = [profile.fullName, profile.dob, profile.gender, profile.city, profile.state, profile.primaryRole, profile.sports?.length]; return Math.round((fields.filter(Boolean).length / fields.length) * 100); }
