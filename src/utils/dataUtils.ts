// utils/dataUtils.ts
export interface WasteRecord {
  DATE: string;
  Group: string;
  "HOUSEHOLD NAME": string;
  "WET WASTE (KGS)": number;
  "DRY WASTE (KGS)": number;
  "HDPE(KGS)": number | string;
  "PET (KGS)": number | string;
  "PP (KGS)": number | string;
  "PAPER WASTE(KGS)": number | string;
  METAL: number | string;
  GLASS: number | string;
  Location: string;
}

export interface FilterOptions {
  dateRange: {
    start: string;
    end: string;
  };
  groups: string[];
  households: string[];
  materials: string[];
}


// Convert string values to numbers, treating empty strings as 0
export const parseNumericValue = (value: number | string): number => {
  if (typeof value === 'number') return value;
  if (value === '' || value === null || value === undefined) return 0;
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? 0 : parsed;
};

// Parse date from DD/M/YYYY format
export const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

// Format date to YYYY-MM-DD for inputs
// Format date to YYYY-MM-DD for inputs (safe: handles Date or "M/D/YYYY" strings)
export const formatDateForInput = (date: string | Date): string => {
  let parsedDate: Date;

  if (typeof date === 'string') {
    const isoMatch = /^\d{4}-\d{2}-\d{2}$/.test(date);        // 2024-08-12
    const slashMdY = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date); // 8/12/2024 or 08/12/2024

    if (isoMatch) {
      parsedDate = new Date(date); // safe for YYYY-MM-DD
    } else if (slashMdY) {
      const [monthStr, dayStr, yearStr] = date.split('/');
      const month = Number(monthStr);
      const day = Number(dayStr);
      const year = Number(yearStr);
      // construct with local timezone (year, monthIndex, day)
      parsedDate = new Date(year, month - 1, day);
    } else {
      // fallback: try Date constructor but handle invalid result below
      parsedDate = new Date(date);
    }
  } else {
    parsedDate = date;
  }

  // detect invalid date
  if (isNaN(parsedDate.getTime())) {
    // choose behavior: return empty string, null, or throw.
    // Returning empty string avoids the RangeError and keeps forms happy.
    return '';
  }

  // Format using local date parts to avoid timezone shifts from toISOString()
  const yyyy = parsedDate.getFullYear();
  const mm = String(parsedDate.getMonth() + 1).padStart(2, '0'); // monthIndex -> 1-based
  const dd = String(parsedDate.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
};




// Get unique values from array
export const getUniqueValues = (arr: string[]): string[] => {
  return [...new Set(arr)].filter(Boolean).sort();
};

// Filter data based on FilterOptions
export const filterData = (data: WasteRecord[], filters: FilterOptions): WasteRecord[] => {
  return data.filter(record => {
    const recordDate = parseDate(record.DATE);
    const startDate = new Date(filters.dateRange.start);
    const endDate = new Date(filters.dateRange.end);
    
    // Date range filter
    if (recordDate < startDate || recordDate > endDate) {
      return false;
    }
    
    // Group filter
    if (filters.groups.length > 0 && !filters.groups.includes(record.Group)) {
      return false;
    }
    
    // Household filter
    if (filters.households.length > 0 && !filters.households.includes(record["HOUSEHOLD NAME"])) {
      return false;
    }
    
    return true;
  });
};

// Get households for selected groups
export const getHouseholdsForGroups = (data: WasteRecord[], groups: string[]): string[] => {
  if (groups.length === 0) return getUniqueValues(data.map(r => r["HOUSEHOLD NAME"]));
  
  const households = data
    .filter(record => groups.includes(record.Group))
    .map(record => record["HOUSEHOLD NAME"]);
  
  return getUniqueValues(households);
};

// Calculate summary statistics
export const calculateSummaryStats = (data: WasteRecord[]) => {
  const groups = getUniqueValues(data.map(r => r.Group));
  const households = getUniqueValues(data.map(r => r["HOUSEHOLD NAME"]));
  const dates = getUniqueValues(data.map(r => r.DATE));
  
  const totalWetWaste = data.reduce((sum, record) => sum + parseNumericValue(record["WET WASTE (KGS)"]), 0);
  const totalDryWaste = data.reduce((sum, record) => sum + parseNumericValue(record["DRY WASTE (KGS)"]), 0);
  
  return {
    numberOfGroups: groups.length,
    numberOfHouseholds: households.length,
    numberOfWeeks: Math.ceil(dates.length / 7), // Approximate
    totalWetWaste: Math.round(totalWetWaste * 100) / 100,
    totalDryWaste: Math.round(totalDryWaste * 100) / 100,
    totalWaste: Math.round((totalWetWaste + totalDryWaste) * 100) / 100,
  };
};

// Calculate dry waste breakdown
export const calculateDryWasteBreakdown = (data: WasteRecord[]) => {
  const materials = ['HDPE(KGS)', 'PET (KGS)', 'PP (KGS)', 'PAPER WASTE(KGS)', 'METAL', 'GLASS'];
  
  return materials.map(material => ({
    material: material.replace('(KGS)', '').replace(' (KGS)', ''),
    total: Math.round(
      data.reduce((sum, record) => sum + parseNumericValue(record[material as keyof WasteRecord]), 0) * 100
    ) / 100,
  }));
};

// Group data by month for time series
export const groupDataByMonth = (data: WasteRecord[]) => {
  const monthlyData: { [key: string]: any } = {};
  
  data.forEach(record => {
    const date = parseDate(record.DATE);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        wetWaste: 0,
        dryWaste: 0,
        HDPE: 0,
        PET: 0,
        PP: 0,
        PAPER: 0,
        METAL: 0,
        GLASS: 0,
      };
    }
    
    monthlyData[monthKey].wetWaste += parseNumericValue(record["WET WASTE (KGS)"]);
    monthlyData[monthKey].dryWaste += parseNumericValue(record["DRY WASTE (KGS)"]);
    monthlyData[monthKey].HDPE += parseNumericValue(record["HDPE(KGS)"]);
    monthlyData[monthKey].PET += parseNumericValue(record["PET (KGS)"]);
    monthlyData[monthKey].PP += parseNumericValue(record["PP (KGS)"]);
    monthlyData[monthKey].PAPER += parseNumericValue(record["PAPER WASTE(KGS)"]);
    monthlyData[monthKey].METAL += parseNumericValue(record["METAL"]);
    monthlyData[monthKey].GLASS += parseNumericValue(record["GLASS"]);
  });
  
  return Object.values(monthlyData)
    .sort((a: any, b: any) => a.month.localeCompare(b.month))
    .map((item: any) => ({
      ...item,
      wetWaste: Math.round(item.wetWaste * 100) / 100,
      dryWaste: Math.round(item.dryWaste * 100) / 100,
      HDPE: Math.round(item.HDPE * 100) / 100,
      PET: Math.round(item.PET * 100) / 100,
      PP: Math.round(item.PP * 100) / 100,
      PAPER: Math.round(item.PAPER * 100) / 100,
      METAL: Math.round(item.METAL * 100) / 100,
      GLASS: Math.round(item.GLASS * 100) / 100,
    }));
};

// Group data by groups for comparison
export const groupDataByGroups = (data: WasteRecord[]) => {
  const groupData: { [key: string]: any } = {};
  
  data.forEach(record => {
    const group = record.Group;
    
    if (!groupData[group]) {
      groupData[group] = {
        group,
        wetWaste: 0,
        dryWaste: 0,
        HDPE: 0,
        PET: 0,
        PP: 0,
        PAPER: 0,
        METAL: 0,
        GLASS: 0,
        householdCount: new Set(),
      };
    }
    
    groupData[group].wetWaste += parseNumericValue(record["WET WASTE (KGS)"]);
    groupData[group].dryWaste += parseNumericValue(record["DRY WASTE (KGS)"]);
    groupData[group].HDPE += parseNumericValue(record["HDPE(KGS)"]);
    groupData[group].PET += parseNumericValue(record["PET (KGS)"]);
    groupData[group].PP += parseNumericValue(record["PP (KGS)"]);
    groupData[group].PAPER += parseNumericValue(record["PAPER WASTE(KGS)"]);
    groupData[group].METAL += parseNumericValue(record["METAL"]);
    groupData[group].GLASS += parseNumericValue(record["GLASS"]);
    groupData[group].householdCount.add(record["HOUSEHOLD NAME"]);
  });
  
  return Object.values(groupData).map((item: any) => ({
    ...item,
    householdCount: item.householdCount.size,
    totalWaste: Math.round((item.wetWaste + item.dryWaste) * 100) / 100,
    wetWaste: Math.round(item.wetWaste * 100) / 100,
    dryWaste: Math.round(item.dryWaste * 100) / 100,
    HDPE: Math.round(item.HDPE * 100) / 100,
    PET: Math.round(item.PET * 100) / 100,
    PP: Math.round(item.PP * 100) / 100,
    PAPER: Math.round(item.PAPER * 100) / 100,
    METAL: Math.round(item.METAL * 100) / 100,
    GLASS: Math.round(item.GLASS * 100) / 100,
  }));
};

// Calculate extrapolation/prediction data
export const calculateExtrapolationData = (data: WasteRecord[]) => {
  const summary = calculateSummaryStats(data);
  const totalRecords = data.length;
  
  // Calculate averages
  const avgWeeklyWetWaste = summary.totalWetWaste / summary.numberOfWeeks / summary.numberOfHouseholds;
  const avgWeeklyDryWaste = summary.totalDryWaste / summary.numberOfWeeks / summary.numberOfHouseholds;
  const avgWeeklyTotalWaste = avgWeeklyWetWaste + avgWeeklyDryWaste;
  
  return {
    ...summary,
    averageWeekly: {
      wetWaste: Math.round(avgWeeklyWetWaste * 100) / 100,
      dryWaste: Math.round(avgWeeklyDryWaste * 100) / 100,
      totalWaste: Math.round(avgWeeklyTotalWaste * 100) / 100,
    },
    averageDaily: {
      wetWaste: Math.round((avgWeeklyWetWaste / 7) * 100) / 100,
      dryWaste: Math.round((avgWeeklyDryWaste / 7) * 100) / 100,
      totalWaste: Math.round((avgWeeklyTotalWaste / 7) * 100) / 100,
    },
    averageMonthly: {
      wetWaste: Math.round((avgWeeklyWetWaste * 4.33) * 100) / 100, // 4.33 weeks per month
      dryWaste: Math.round((avgWeeklyDryWaste * 4.33) * 100) / 100,
      totalWaste: Math.round((avgWeeklyTotalWaste * 4.33) * 100) / 100,
    },
    totalMonthly: {
      wetWaste: Math.round((avgWeeklyWetWaste * 4.33 * summary.numberOfHouseholds) * 100) / 100,
      dryWaste: Math.round((avgWeeklyDryWaste * 4.33 * summary.numberOfHouseholds) * 100) / 100,
      totalWaste: Math.round((avgWeeklyTotalWaste * 4.33 * summary.numberOfHouseholds) * 100) / 100,
    },
  };
};