// Shared by the form (client) and the server action: one source for the allowed values.
export const countries = [
  ["BR", "55"], ["MX", "52"], ["AR", "54"], ["CL", "56"], ["CO", "57"], ["PE", "51"],
  ["UY", "598"], ["PY", "595"], ["BO", "591"], ["EC", "593"], ["VE", "58"], ["CR", "506"],
  ["PA", "507"], ["GT", "502"], ["US", "1"], ["PT", "351"], ["ES", "34"],
] as const;

export const profiles = ["agency", "independent", "agent", "owner"] as const;
export const interests = ["rent", "sale", "both"] as const;
export const solutions = ["portal", "site", "both"] as const;
export const hasSiteOptions = ["yes", "no"] as const;

export type ContactState = {
  status: "idle" | "ok" | "invalid" | "error";
  fields: Record<string, string>;
};
