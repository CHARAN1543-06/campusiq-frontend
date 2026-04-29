export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface College {
  id: number;
  name: string;
  shortName: string;
  location: string;
  city: string;
  state: string;
  type: string;
  logo: string;
  established: number;
  rating: number;
  totalReviews: number;
  fees: number;
  feesDisplay: string;
  courses: string[];
  topCourse: string;
  placementPercent: number;
  avgPackage: number;
  avgPackageDisplay: string;
  highestPackage: number;
  highestPackageDisplay: string;
  topRecruiters: string[];
  naacGrade: string;
  nirfRank: number;
  examAccepted: string[];
  minRank: number;
  maxRank: number;
  image: string;
  about: string;
  facilities: string[];
  reviews: { author: string; rating: number; text: string; year: string }[];
}

export interface CollegesResponse {
  colleges: College[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export async function fetchColleges(params: Record<string, string>): Promise<CollegesResponse> {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/api/colleges?${query}`, { cache: 'no-store' });
  return res.json();
}

export async function fetchCollege(id: string): Promise<College> {
  const res = await fetch(`${API_BASE}/api/colleges/${id}`, { cache: 'no-store' });
  return res.json();
}

export async function compareColleges(ids: number[]): Promise<College[]> {
  const res = await fetch(`${API_BASE}/api/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
  return res.json();
}

export async function predictColleges(exam: string, rank: number) {
  const res = await fetch(`${API_BASE}/api/predict?exam=${exam}&rank=${rank}`, { cache: 'no-store' });
  return res.json();
}

export async function fetchFilterOptions() {
  const res = await fetch(`${API_BASE}/api/filters/options`, { cache: 'no-store' });
  return res.json();
}
