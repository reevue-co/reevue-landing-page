import { countries, interests, profiles, solutions } from "@/lib/contact";
import { readLocalSheetRows } from "@/lib/local-sheet";

export type Share = {
  key: string;
  count: number;
  ratio: number;
};

export type LeadStats = {
  total: number;
  profiles: Share[];
  interests: Share[];
  solutions: Share[];
  countries: Share[];
};

export type Lead = {
  id: string;
  date: string;
  name: string;
  profile: string;
  agency: string;
  country: string;
  state: string;
  city: string;
  phone: string;
  email: string;
  interest: string;
  solution: string;
  hasSite: string;
  site: string;
  difficulty: string;
  locale: string;
};

const profileIndex = 2;
const countryIndex = 4;
const interestIndex = 9;
const solutionIndex = 10;

export async function getLeads(): Promise<Lead[]> {
  const rows = await readLocalSheetRows();
  return rows
    .map((row, index) => ({
      id: String(index),
      date: cell(row, 0),
      name: cell(row, 1),
      profile: cell(row, profileIndex),
      agency: cell(row, 3),
      country: cell(row, countryIndex),
      state: cell(row, 5),
      city: cell(row, 6),
      phone: cell(row, 7),
      email: cell(row, 8),
      interest: cell(row, interestIndex),
      solution: cell(row, solutionIndex),
      hasSite: cell(row, 11),
      site: cell(row, 12),
      difficulty: cell(row, 13),
      locale: cell(row, 14),
    }))
    .filter((lead) => lead.profile || lead.country || lead.interest)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function getLeadStats(): Promise<LeadStats> {
  const rows = await readLocalSheetRows();
  const leads = rows.filter((row) => row[profileIndex] || row[countryIndex] || row[interestIndex]);
  const total = leads.length;

  return {
    total,
    profiles: ranked(profiles, tally(leads, profileIndex), total),
    interests: ranked(interests, tally(leads, interestIndex), total),
    solutions: ranked(solutions, tally(leads, solutionIndex), total),
    countries: ranked(
      countries.map(([iso]) => iso),
      tally(leads, countryIndex),
      total,
    ).filter((item) => item.count > 0),
  };
}

function cell(row: string[], index: number) {
  return row[index]?.trim() ?? "";
}

function tally(rows: string[][], index: number) {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = row[index]?.trim();
    if (!key) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function ranked(keys: readonly string[], counts: Map<string, number>, total: number): Share[] {
  const known = new Set<string>(keys);
  const extras = [...counts.keys()].filter((key) => !known.has(key));
  return [...keys, ...extras]
    .map((key) => {
      const count = counts.get(key) ?? 0;
      return { key, count, ratio: total === 0 ? 0 : count / total };
    })
    .sort((a, b) => b.count - a.count);
}
