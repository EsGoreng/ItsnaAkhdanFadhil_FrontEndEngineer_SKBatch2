export type Department =
  | "Semua"
  | "Engineering"
  | "Product"
  | "Design"
  | "Data & AI"
  | "Marketing"
  | "People & Operations"
  | "Legal & Compliance"; // Intentionally included with 0 roles to demonstrate empty state directly

export type RoleLevel = "Internship" | "Junior" | "Mid-Level" | "Senior" | "Lead";
export type RoleType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type WorkLocation = "Remote" | "Hybrid (Jakarta)" | "Hybrid (Bandung)" | "On-site (Jakarta)";

export interface Role {
  id: string;
  title: string;
  department: Exclude<Department, "Semua">;
  level: RoleLevel;
  type: RoleType;
  location: WorkLocation;
  summary: string;
  skills: string[];
  salaryRange?: string;
  postedDate: string;
  responsibilities: string[];
  requirements: string[];
}

