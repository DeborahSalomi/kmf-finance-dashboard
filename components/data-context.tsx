"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import initialDashboardData from "@/data/dashboard.json";
import initialWaterfallData from "@/data/waterfall.json";

interface DataContextType {
  rawData: any;
  setRawData: (data: any) => void;
  dashboardData: any;
  setDashboardData: (data: any) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [rawData, setRawData] = useState<any>(initialWaterfallData);
  const [dashboardData, setDashboardData] = useState<any>(initialDashboardData);

  return (
    <DataContext.Provider value={{ rawData, setRawData, dashboardData, setDashboardData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}