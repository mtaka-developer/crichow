// Data types for CRICHOW project
export interface RawDataRecord {
  DATE: string;
  Group: string;
  "HOUSEHOLD NAME": string;
  "WET WASTE (KGS)": number | string;
  "DRY WASTE (KGS)": number | string;
  "HDPE(KGS)": number | string;
  "PET (KGS)": number | string;
  "PP (KGS)": number | string;
  "PAPER WASTE(KGS)": number | string;
  METAL: number | string;
  GLASS: number | string;
  Location?: string;
}

export interface CleanedDataRecord {
  date: Date;
  dateString: string; // Original date string for reference
  group: string;
  householdName: string;
  wetWaste: number;
  dryWaste: number;
  hdpe: number;
  pet: number;
  pp: number;
  paperWaste: number;
  metal: number;
  glass: number;
  location?: string;
  // Calculated fields
  totalWaste: number;
  weekNumber: string; // Format: YYYY-WW
  isBusinessHousehold: boolean;
}

export interface FilterState {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  selectedGroups: string[];
  selectedHouseholds: string[];
}

export interface DryWasteFilterState {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  selectedGroups: string[];
  selectedHouseholds: string[];
  selectedMaterialTypes: string[];
}

export interface KPIData {
  numberOfGroups: number;
  numberOfHouseholds: number;
  numberOfWeeks: number;
  totalWetWaste: number;
  totalDryWaste: number;
  totalWeight: number;
}

export interface HouseholdCategoryData {
  domestic: {
    avgWeeklyWetWaste: number;
    avgWeeklyDryWaste: number;
    totalHouseholds: number;
    totalWeeks: number;
  };
  business: {
    avgWeeklyWetWaste: number;
    avgWeeklyDryWaste: number;
    totalHouseholds: number;
    totalWeeks: number;
  };
}

export interface RecyclableMaterialKPIData {
  hdpe: number;
  pet: number;
  pp: number;
  glass: number;
  paper: number;
  metal: number;
}

export interface GroupAnalysisData {
  groupName: string;
  totalWetWaste: number;
  totalDryWaste: number;
  totalWeight: number;
  hdpe: number;
  pet: number;
  pp: number;
  glass: number;
  paper: number;
  metal: number;
}

export interface ExtrapolationData {
  avgWeeklyWetWastePerHousehold: number;
  avgWeeklyDryWastePerHousehold: number;
  avgWeeklyTotalWeightPerHousehold: number;
  avgDailyWetWastePerHousehold: number;
  avgDailyDryWastePerHousehold: number;
  avgDailyTotalWeightPerHousehold: number;
  avgMonthlyWetWastePerHousehold: number;
  avgMonthlyDryWastePerHousehold: number;
  avgMonthlyTotalWeightPerHousehold: number;
  extrapolatedTotalWetWaste: number;
  extrapolatedTotalDryWaste: number;
  extrapolatedTotalWeight: number;
}