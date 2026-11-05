// National number masks, keyed by dial code. Brazil accepts a 10-digit landline and an 11-digit mobile.
const patterns: Record<string, string | readonly [string, string]> = {
  "55": ["(##) ####-####", "(##) #####-####"],
  "52": "## #### ####",
  "54": "### ####-####",
  "56": "# #### ####",
  "57": "### ### ####",
  "51": "### ### ###",
  "598": "# ### ## ##",
  "595": "### ### ###",
  "591": "# ### ####",
  "593": "## ### ####",
  "58": "### ### ####",
  "506": "#### ####",
  "507": "####-####",
  "502": "#### ####",
  "1": "(###) ###-####",
  "351": "### ### ###",
  "34": "### ## ## ##",
};

function options(dial: string): string[] {
  const entry = patterns[dial] ?? "##########";
  return typeof entry === "string" ? [entry] : [...entry];
}

function slots(pattern: string): number {
  return pattern.split("#").length - 1;
}

function apply(digits: string, pattern: string): string {
  let index = 0;
  let formatted = "";
  for (const char of pattern) {
    if (index >= digits.length) break;
    if (char === "#") formatted += digits[index++];
    else formatted += char;
  }
  return formatted;
}

export function formatPhone(value: string, dial: string): string {
  const available = options(dial);
  const max = Math.max(...available.map(slots));
  const digits = value.replace(/\D/g, "").slice(0, max);
  const pattern = available.find((item, index) => slots(item) >= digits.length || index === available.length - 1) ?? available[0];
  return apply(digits, pattern);
}

export function phoneExample(dial: string): string {
  const available = options(dial);
  return available[available.length - 1].replaceAll("#", "9");
}

export function phonePattern(dial: string): string {
  if (dial === "55") return "\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}";
  return options(dial)[0].replace(/[()\\-]/g, (char) => `\\${char}`).replaceAll("#", "[0-9]");
}

export function caretForDigitCount(formatted: string, digitCount: number): number {
  let seen = 0;
  for (let index = 0; index < formatted.length; index++) {
    if (/\d/.test(formatted[index])) seen += 1;
    if (seen >= digitCount) return index + 1;
  }
  return formatted.length;
}
