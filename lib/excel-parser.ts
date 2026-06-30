import * as XLSX from "xlsx";

export async function parseAndAutoDetectExcel(file: File) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rawData = XLSX.utils.sheet_to_json(worksheet);

  if (!rawData || rawData.length === 0) return [];

  const standardizedData = rawData.map((row: any) => {
    const cleanRow: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(row)) {
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");
      const numericValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value;

      // Smart Heuristic Mapping
      if (normalizedKey.includes("name") || normalizedKey.includes("year") || normalizedKey.includes("fy") || normalizedKey.includes("date")) {
        cleanRow["name"] = value;
      } else if (normalizedKey.includes("rev") || normalizedKey.includes("sale") || normalizedKey.includes("income")) {
        cleanRow["Revenue"] = numericValue;
      } else if (normalizedKey.includes("prof") || normalizedKey.includes("net") || normalizedKey.includes("margin")) {
        cleanRow["Profit"] = numericValue;
      } else if (normalizedKey.includes("proc") || normalizedKey.includes("cogs") || normalizedKey.includes("raw")) {
        cleanRow["Procurement"] = numericValue;
      } else if (normalizedKey.includes("trans") || normalizedKey.includes("logis") || normalizedKey.includes("freight")) {
        cleanRow["Transport"] = numericValue;
      } else if (normalizedKey.includes("mfg") || normalizedKey.includes("manuf") || normalizedKey.includes("op")) {
        cleanRow["Manufacturing"] = numericValue;
      } else {
        cleanRow[key] = numericValue; 
      }
    }
    return cleanRow;
  });

  return standardizedData;
}