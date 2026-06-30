"use client";

import { useState, useCallback } from "react";
import { UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import { parseAndAutoDetectExcel } from "@/lib/excel-parser";

interface DataUploaderProps {
  onDataParsed: (data: any[]) => void;
}

export function DataUploader({ onDataParsed }: DataUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");

  const handleProcessFile = async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
      setStatus("error");
      return;
    }
    
    setStatus("processing");
    try {
      const parsedData = await parseAndAutoDetectExcel(file);
      onDataParsed(parsedData);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  }, []);

  return (
    <div 
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`relative w-full p-6 border-2 border-dashed rounded-2xl transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer ${
        isDragging ? "border-emerald-500 bg-emerald-500/10" : "border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900/50 hover:border-zinc-700"
      }`}
    >
      <input 
        type="file" 
        accept=".xlsx, .xls, .csv"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        onChange={(e) => e.target.files && handleProcessFile(e.target.files[0])}
      />
      
      {status === "idle" && (
        <>
          <div className="p-3 bg-zinc-900 rounded-full mb-3 shadow-xl border border-zinc-800">
            <UploadCloud className="w-6 h-6 text-zinc-400" />
          </div>
          <p className="text-sm font-medium text-zinc-200">Upload Financial Model</p>
          <p className="text-xs text-zinc-500 mt-1">Drag & drop .xlsx or .csv (Auto-detects mapping)</p>
        </>
      )}

      {status === "processing" && (
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-medium text-emerald-400">Running AI Heuristics...</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
          <p className="text-sm font-medium text-emerald-400">Data Mapped Successfully</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center">
          <AlertCircle className="w-8 h-8 text-rose-500 mb-2" />
          <p className="text-sm font-medium text-rose-400">Invalid File Format</p>
        </div>
      )}
    </div>
  );
}