import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Same column order as scripts/google-sheet.gs. Labels stay in English.
const headers = [
  "Date",
  "Name",
  "Profile",
  "Agency",
  "Country",
  "State",
  "City",
  "WhatsApp",
  "Email",
  "Interest",
  "Solution",
  "Has site",
  "Site",
  "Difficulty",
  "Locale",
];

const sheetPath = path.join(process.cwd(), "data", "contacts.xls");

let pending: Promise<void> = Promise.resolve();

export function appendLocalLead(values: string[]): Promise<void> {
  const run = pending.then(() => writeLead(values));
  pending = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function writeLead(values: string[]) {
  await mkdir(path.dirname(sheetPath), { recursive: true });
  let xml: string;
  try {
    xml = await readFile(sheetPath, "utf8");
  } catch (error) {
    if (!isMissing(error)) throw error;
    xml = workbook(row(headers));
    console.info(`[contact] created local sheet at ${path.relative(process.cwd(), sheetPath)}`);
  }
  if (!xml.includes("</Table>")) xml = workbook(row(headers));
  await writeFile(sheetPath, xml.replace("</Table>", `${row(values)}</Table>`), "utf8");
}

function isMissing(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

function workbook(rows: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="Contacts"><Table>
${rows}
</Table></Worksheet></Workbook>
`;
}

function row(values: string[]) {
  const cells = values.map((value) => `<Cell><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`).join("");
  return `<Row>${cells}</Row>`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
