// CSV processing utilities

export interface CSVRow {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface CSVData {
  headers: string[];
  rows: CSVRow[];
}

/**
 * Find duplicate phone numbers in the dataset
 */
export function findDuplicates(
  rows: CSVRow[],
  phoneColumn: string,
): Map<string, string[]> {
  const phoneMap = new Map<string, string[]>();

  rows.forEach((row) => {
    const phone = row[phoneColumn]?.toString().trim();
    if (phone) {
      if (!phoneMap.has(phone)) {
        phoneMap.set(phone, []);
      }
      phoneMap.get(phone)!.push(row.id);
    }
  });

  // Filter to only duplicates
  const duplicates = new Map<string, string[]>();
  phoneMap.forEach((ids, phone) => {
    if (ids.length > 1) {
      duplicates.set(phone, ids);
    }
  });

  return duplicates;
}

/**
 * Remove duplicate rows based on phone column
 */
export function removeDuplicates(
  rows: CSVRow[],
  phoneColumn: string,
  keepFirst: boolean = true,
): CSVRow[] {
  const seen = new Set<string>();
  const result: CSVRow[] = [];

  const processRows = keepFirst ? rows : [...rows].reverse();

  processRows.forEach((row) => {
    const phone = row[phoneColumn]?.toString().trim();
    if (phone && !seen.has(phone)) {
      seen.add(phone);
      result.push(row);
    } else if (!phone) {
      // Keep rows without phone numbers
      result.push(row);
    }
  });

  return keepFirst ? result : result.reverse();
}

/**
 * Sort rows by a specific column
 */
export function sortRows(
  rows: CSVRow[],
  column: string,
  direction: "asc" | "desc" = "asc",
): CSVRow[] {
  return [...rows].sort((a, b) => {
    const aVal = a[column];
    const bVal = b[column];

    // Try to parse as numbers
    const aNum = parseFloat(aVal);
    const bNum = parseFloat(bVal);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return direction === "asc" ? aNum - bNum : bNum - aNum;
    }

    // String comparison
    const aStr = String(aVal || "").toLowerCase();
    const bStr = String(bVal || "").toLowerCase();

    if (direction === "asc") {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });
}

/**
 * Convert rows to CSV string
 */
export function rowsToCSV(headers: string[], rows: CSVRow[]): string {
  const csvRows: string[] = [];

  // Add headers
  csvRows.push(headers.map((h) => `"${h}"`).join(","));

  // Add data rows
  rows.forEach((row) => {
    const values = headers.map((header) => {
      const value = row[header] ?? "";
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      const stringValue = String(value);
      if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
      ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csvRows.push(values.join(","));
  });

  return csvRows.join("\n");
}

/**
 * Download CSV file
 */
export function downloadCSV(
  filename: string,
  headers: string[],
  rows: CSVRow[],
): void {
  const csv = rowsToCSV(headers, rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/**
 * Detect phone number column automatically
 */
export function detectPhoneColumn(headers: string[]): string | null {
  const phoneKeywords = [
    "phone",
    "mobile",
    "number",
    "tel",
    "contact",
    "msisdn",
    "telephone",
  ];

  const lowerHeaders = headers.map((h) => h.toLowerCase());

  for (const keyword of phoneKeywords) {
    const index = lowerHeaders.findIndex((h) => h.includes(keyword));
    if (index !== -1) {
      return headers[index];
    }
  }

  return null;
}

/**
 * Detect bundle/data column automatically
 */
export function detectBundleColumn(headers: string[]): string | null {
  const bundleKeywords = [
    "bundle",
    "data",
    "package",
    "plan",
    "size",
    "amount",
    "mb",
    "gb",
  ];

  const lowerHeaders = headers.map((h) => h.toLowerCase());

  for (const keyword of bundleKeywords) {
    const index = lowerHeaders.findIndex((h) => h.includes(keyword));
    if (index !== -1) {
      return headers[index];
    }
  }

  return null;
}
