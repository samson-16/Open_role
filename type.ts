// types.ts

export interface jobprops {
  id: string;
  title: string;
  description: string;
  responsibilities: string; // newline‑separated list
  requirements: string; // newline‑separated list
  idealCandidate: string; // single paragraph
  categories: string[]; // array of categories
  opType: "inPerson" | "virtual"; // corresponds to your `type` field
  startDate: string; // ISO datetime
  endDate: string; // ISO datetime
  deadline: string; // ISO datetime
  location: string[]; // array of locations
  requiredSkills: string[]; // array of skills
  whenAndWhere: string;
  orgID: string;
  datePosted: string; // ISO datetime
  status: string; // e.g. "open"
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: null; // or whatever type you expect
  perksAndBenefits: null; // or whatever type you expect
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  orgPrimaryPhone: string;
  orgEmail: string;
  average_rating: number;
  total_reviews: number;
}

export interface JobCardProps {
  id: string;
  title: string;
  description: string;
  orgName: string;
  location: string | string[];
  logoUrl: string;
  categories: string[];
  opType: "inPerson" | "virtual";
  isBookmarked?: boolean;
  onToggleBookmark?: (jobId: string, isCurrentlyBookmarked: boolean) => void;
}
