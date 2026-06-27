export interface DashboardMetrics {
  Revenue_Billion: number;
  NetProfit_Billion: number;
  GrossMargin: number;
  NetMargin: number;
  PurchaseRatio: number;
  CAGR: number;
  AverageProfit: number;
  WorstCase: number;
  BestCase: number;
  ProbabilityOfLoss: number;
}

export interface WaterfallData {
  Revenue: number;
  Procurement: number;
  Transport: number;
  Manufacturing: number;
  Net_Profit: number;
}
export interface ScenarioData {
  Scenario: string;
  Revenue_Change: number;
  Purchase_Change: number;
  Manufacturing_Change: number;
  Profit_Million: number;
}

export interface RiskMetrics {
  AverageProfit: number;
  WorstCase: number;
  BestCase: number;
  ProbabilityOfLoss: number;
}

export interface ForecastData {
  Year: string;
  Revenue: number;
  Net_Profit: number;
}