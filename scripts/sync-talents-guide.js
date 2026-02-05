/**
 * Sync talents from Google Sheets to src/data/talents-guide.ts
 *
 * The spreadsheet must be published to the web (File → Share → Publish to web).
 * Run: node scripts/sync-talents-guide.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SPREADSHEET_ID = "1eTjeMwzIB06nw5tEPctEg6EEGFLD_6o4nYgWl8fNsUs";
const SHEET_GID = 1715408052;
const OUTPUT_FILE = path.join(__dirname, "..", "src", "data", "talents-guide.ts");

// CSV export URL (works if sheet is published to web)
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_GID}`;


function tsEscape(s) {
  if (s == null || s === "") return "";
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function buildTsFile(rows) {
  const lines = [
    `export interface TalentGuideType {`,
    `  branch: string;`,
    `  name: string;`,
    `  description: string;`,
    `  rang: number;`,
    `  focus: number;`,
    `}`,
    ``,
    `export const talentsGuide: TalentGuideType[] = [`,
  ];

  for (const row of rows) {
    const branch = tsEscape(row.branch);
    const name = tsEscape(row.name);
    const description = tsEscape(row.description);
    const rang = row.rang;
    const focus = row.focus;
    const descOneLine = description.replace(/\n/g, " ");

    lines.push(`  {`);
    lines.push(`    branch: "${branch}",`);
    lines.push(`    name: "${name}",`);
    if (descOneLine.length > 80) {
      lines.push(`    description:`);
      lines.push(`      "${descOneLine}",`);
    } else {
      lines.push(`    description: "${descOneLine}",`);
    }
    lines.push(`    rang: ${rang},`);
    lines.push(`    focus: ${focus},`);
    lines.push(`  },`);
  }

  lines.push(`];`);
  lines.push(``);
  return lines.join("\n");
}

async function fetchCsv() {
  const res = await fetch(CSV_URL);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.text();
}

function parseCsv(csv) {
  const rows = [];
  let current = "";
  let inQuotes = false;
  let row = [];

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i++;
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }

  if (current || row.length) {
    row.push(current);
    rows.push(row);
  }

  return rows;
}

function parseRows(rawRows) {
  const rows = [];
  if (!rawRows.length) return rows;

  const header = rawRows[0];
  const branchIdx = header.findIndex((c) => /ветка|branch/i.test(String(c).trim()));
  const rangIdx = header.findIndex((c) => /ранг|rank/i.test(String(c).trim()));
  const nameIdx = header.findIndex((c) => /название|name/i.test(String(c).trim()));
  const descIdx = header.findIndex((c) => /описание|description/i.test(String(c).trim()));
  const focusIdx = header.findIndex((c) => /фокус|focus/i.test(String(c).trim()));

  const bi = branchIdx >= 0 ? branchIdx : 0;
  const fi = focusIdx >= 0 ? focusIdx : 1;
  const ri = rangIdx >= 0 ? rangIdx : 2;
  const ni = nameIdx >= 0 ? nameIdx : 3;
  const di = descIdx >= 0 ? descIdx : 4;

  for (let i = 1; i < rawRows.length; i++) {
    const r = rawRows[i];
    const branch = (r[bi] ?? "").toString().trim();
    const name = (r[ni] ?? "").toString().trim();
    const description = (r[di] ?? "").toString().trim();
    const rangRaw = (r[ri] ?? "").toString().trim();
    const focusRaw = (r[fi] ?? "").toString().trim();

    const rang = rangRaw ? parseInt(rangRaw, 10) : 0;
    const focus = focusRaw ? parseInt(rangRaw, 10) : 0;
    if (!branch && !name && !description && !rang) continue;
    rows.push({
      branch,
      name,
      description,
      rang: Number.isNaN(rang) ? 0 : rang,
      focus: Number.isNaN(focus) ? 0 : focus,
    });
  }

  return rows;
}

async function main() {
  console.log("Fetching CSV from:", CSV_URL);
  const csv = await fetchCsv();

  console.log("Parsing CSV...");
  const rawRows = parseCsv(csv);
  console.log("Rows (with header):", rawRows.length);

  const rows = parseRows(rawRows);
  console.log("Talents parsed:", rows.length);

  const content = buildTsFile(rows);
  fs.writeFileSync(OUTPUT_FILE, content, "utf8");
  console.log("Written:", OUTPUT_FILE);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
