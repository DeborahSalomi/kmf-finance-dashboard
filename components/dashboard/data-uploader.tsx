"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { UploadCloud } from "lucide-react";

type ParsedData = {
  financial: Record<string, any[]>;
  procurement: any[];
};

export function DataUploader({
  onDataParsed,
}: {
  onDataParsed: (data: ParsedData) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const masterData: ParsedData = {
      financial: {},
      procurement: [],
    };

    try {
      for (const file of Array.from(files)) {
        const data = await readFile(file);

        const name = file.name.toLowerCase();

        // Financial Files
        if (
          /(profit|loss|p&l|income|balance|financial|ledger|trial|cash|expense|revenue)/.test(
            name
          )
        ) {
          masterData.financial[file.name] = data;
        }

        // Procurement Files
        else if (
          /(procurement|purchase|po|vendor|invoice|supplier|material)/.test(
            name
          )
        ) {
          masterData.procurement.push(...data);
        }

        // Unknown file → treat as financial by default
        else {
          masterData.financial[file.name] = data;
        }
      }

      onDataParsed(masterData);
    } catch (error) {
      console.error("Error reading files:", error);
      alert("Failed to process one or more files.");
    } finally {
      setIsUploading(false);

      // Allow selecting the same file again
      e.target.value = "";
    }
  };

  const readFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = reject;

      reader.onload = (evt) => {
        try {
          let workbook: XLSX.WorkBook;

          if (file.name.toLowerCase().endsWith(".csv")) {
            const text = evt.target?.result as string;
            workbook = XLSX.read(text, { type: "string" });
          } else {
            const binary = evt.target?.result as string;
            workbook = XLSX.read(binary, { type: "binary" });
          }

          const sheet = workbook.Sheets[workbook.SheetNames[0]];

          const rawData = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: "",
            blankrows: false,
          }) as any[][];

          if (!rawData.length) {
            resolve([]);
            return;
          }

          // Detect header row automatically
          let headerRowIndex = 0;

          const keywords = [
            "revenue",
            "amount",
            "particulars",
            "description",
            "item",
            "vendor",
            "supplier",
            "date",
            "balance",
            "account",
            "debit",
            "credit",
            "invoice",
            "purchase",
            "expense",
            "sales",
            "material",
            "qty",
            "quantity",
            "price",
            "total",
          ];

          for (let i = 0; i < Math.min(15, rawData.length); i++) {
            const rowText = rawData[i]
              .map((cell) => String(cell).toLowerCase())
              .join(" ");

            if (keywords.some((k) => rowText.includes(k))) {
              headerRowIndex = i;
              break;
            }
          }

          const headers = rawData[headerRowIndex].map((header, index) =>
            header && String(header).trim() !== ""
              ? String(header).trim()
              : `Column_${index + 1}`
          );

          const cleanData = rawData
            .slice(headerRowIndex + 1)
            .filter((row) =>
              row.some(
                (cell) =>
                  cell !== "" &&
                  cell !== null &&
                  cell !== undefined &&
                  String(cell).trim() !== ""
              )
            )
            .map((row) => {
              const obj: Record<string, any> = {};

              headers.forEach((header, i) => {
                obj[header] = row[i] ?? "";
              });

              return obj;
            });

          resolve(cleanData);
        } catch (err) {
          reject(err);
        }
      };

      if (file.name.toLowerCase().endsWith(".csv")) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    });
  };

  return (
    <div className="relative w-full cursor-pointer group">
      <input
        type="file"
        multiple
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
        className="absolute inset-0 z-10 opacity-0 cursor-pointer"
      />

      <div className="flex items-center justify-center gap-2 p-4 transition-all border-2 border-dashed rounded-xl bg-zinc-900 border-zinc-700 group-hover:border-emerald-500">
        <UploadCloud
          className={`w-5 h-5 ${
            isUploading
              ? "animate-pulse text-emerald-500"
              : "text-zinc-400"
          }`}
        />

        <span className="text-sm font-bold text-zinc-300">
          {isUploading
            ? "Processing files..."
            : "Upload CSV / Excel Files"}
        </span>
      </div>
    </div>
  );
}