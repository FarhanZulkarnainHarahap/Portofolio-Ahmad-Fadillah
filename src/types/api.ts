export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ApiListResponse<T> = ApiResponse<T[]> & {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type Profile = {
  id: string;
  name: string;
  professionalTitle?: string | null;
  headline?: string | null;
  shortDescription?: string | null;
  about?: string | null;
  workPhilosophy?: string | null;
  professionalValues?: unknown;
  careerGoals?: string | null;
  specializations?: unknown;
  languages?: unknown;
  location?: string | null;
  publicEmail?: string | null;
  whatsapp?: string | null;
  linkedin?: string | null;
  availabilityStatus?: string | null;
  cvMediaId?: string | null;
};

export type Statistic = {
  id: string;
  label: string;
  value: string | number;
  unit?: string | null;
  icon?: string | null;
};

export type Experience = {
  id: string;
  companyName: string;
  position: string;
  location?: string | null;
  workMode?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string | null;
  responsibilities?: { id: string; content: string }[];
  achievements?: { id: string; content: string }[];
};

export type Expertise = {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  level?: number | null;
  category?: { name: string } | null;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string | null;
  fullDescription?: string | null;
  organization?: string | null;
  year?: number | null;
  duration?: string | null;
  status?: string | null;
  role?: string | null;
  problem?: string | null;
  solution?: string | null;
  implementation?: string | null;
  resultsText?: string | null;
  lessons?: string | null;
  isFeatured?: boolean;
  isPublished?: boolean;
  category?: { name: string; slug: string } | null;
  metrics?: { id: string; label: string; value: string; unit?: string | null }[];
  results?: { id: string; content: string }[];
  challenges?: { id: string; content: string }[];
};

export type SimpleContent = {
  id: string;
  title?: string;
  name?: string;
  description?: string | null;
  value?: string | null;
  unit?: string | null;
  year?: number | null;
  category?: string | { name: string } | null;
  issuer?: string | null;
  company?: string | null;
  content?: string | null;
  excerpt?: string | null;
  slug?: string;
};

export type DashboardWidget = {
  id: string;
  title: string;
  period?: string | null;
  value?: string | null;
  unit?: string | null;
  widgetType: "KPI" | "BAR" | "LINE" | "PIE" | "AREA" | "TABLE";
  datasets?: { id: string; label: string; value: string | number; color?: string | null }[];
};

export type AdminDashboard = {
  projects: number;
  experiences: number;
  blogPosts: number;
  documents: number;
  certifications: number;
  newMessages: number;
  draftPosts: number;
  publishedProjects: number;
};
