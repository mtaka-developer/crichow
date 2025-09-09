import { RawDataRecord, CleanedDataRecord, KPIData, HouseholdCategoryData, FilterState, DryWasteFilterState, RecyclableMaterialKPIData, GroupAnalysisData, ExtrapolationData } from '@/types/data';

// Business household names as specified in requirements
export const BUSINESS_HOUSEHOLDS = [
  'Tavanas',
  'Mama Babas Shop', 
  'Davis Supermarket',
  'Prison Pub',
  'Hotel Abijan',
  'Taji waters',
  'African blue',
  'Okore mandazi'
];

/**
 * Parse date string in DD/MM/YYYY format to Date object
 * CRITICAL FIX: JSON data uses DD/MM/YYYY format, not MM/DD/YYYY
 */
function parseDate(dateString: string): Date | null {
  if (!dateString || dateString.trim() === '') return null;
  
  const parts = dateString.split('/');
  if (parts.length !== 3) return null;
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-indexed
  const year = parseInt(parts[2], 10);
  
  // Validate input ranges before creating date
  if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1900 || year > 2100) {
    return null;
  }
  
  const date = new Date(year, month, day);
  
  // Validate the date (handles edge cases like Feb 30, etc.)
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }
  
  return date;
}

/**
 * Convert string/number to number, treating empty strings as 0
 */
function toNumber(value: string | number): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    if (value.trim() === '') return 0;
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

/**
 * Get week number in YYYY-WW format
 */
function getWeekNumber(date: Date): string {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const weekNumber = Math.ceil((dayOfYear + startOfYear.getDay() + 1) / 7);
  return `${date.getFullYear()}-${weekNumber.toString().padStart(2, '0')}`;
}

/**
 * Check if household is business type
 */
function isBusinessHousehold(householdName: string): boolean {
  return BUSINESS_HOUSEHOLDS.includes(householdName);
}

/**
 * Clean and process raw data records
 */
export function cleanData(rawData: RawDataRecord[]): CleanedDataRecord[] {
  const cleanedData: CleanedDataRecord[] = [];
  
  for (const record of rawData) {
    // Filter invalid records - must have valid DATE and Group
    if (!record.DATE || !record.Group || record.Group.trim() === '') {
      continue;
    }
    
    const date = parseDate(record.DATE);
    if (!date) continue;
    
    // Convert numerical fields
    const wetWaste = toNumber(record["WET WASTE (KGS)"]);
    const dryWaste = toNumber(record["DRY WASTE (KGS)"]);
    const hdpe = toNumber(record["HDPE(KGS)"]);
    const pet = toNumber(record["PET (KGS)"]);
    const pp = toNumber(record["PP (KGS)"]);
    const paperWaste = toNumber(record["PAPER WASTE(KGS)"]);
    const metal = toNumber(record.METAL);
    const glass = toNumber(record.GLASS);
    
    const cleanedRecord: CleanedDataRecord = {
      date,
      dateString: record.DATE,
      group: record.Group.trim(),
      householdName: record["HOUSEHOLD NAME"] || '',
      wetWaste,
      dryWaste,
      hdpe,
      pet,
      pp,
      paperWaste,
      metal,
      glass,
      location: record.Location,
      totalWaste: wetWaste + dryWaste,
      weekNumber: getWeekNumber(date),
      isBusinessHousehold: isBusinessHousehold(record["HOUSEHOLD NAME"] || '')
    };
    
    cleanedData.push(cleanedRecord);
  }
  
  return cleanedData;
}

/**
 * Apply filters to data
 */
export function filterData(data: CleanedDataRecord[], filters: FilterState): CleanedDataRecord[] {
  return data.filter(record => {
    // Date range filter
    if (filters.dateRange.start && record.date < filters.dateRange.start) {
      return false;
    }
    if (filters.dateRange.end && record.date > filters.dateRange.end) {
      return false;
    }
    
    // Groups filter - convert display names back to internal keys for comparison
    if (filters.selectedGroups && filters.selectedGroups.length > 0) {
      const selectedGroupKeys = filters.selectedGroups.map(displayName => getGroupKeyFromDisplayName(displayName));
      if (!selectedGroupKeys.includes(record.group)) {
        return false;
      }
    }
    
    // Households filter - if households are selected, record must be in one of them
    if (filters.selectedHouseholds && filters.selectedHouseholds.length > 0 && !filters.selectedHouseholds.includes(record.householdName)) {
      return false;
    }
    
    return true;
  });
}

/**
 * Calculate KPI data from filtered records
 */
export function calculateKPIs(data: CleanedDataRecord[]): KPIData {
  const uniqueGroups = new Set(data.map(record => record.group));
  const uniqueWeeks = new Set(data.map(record => record.weekNumber));
  
  const totalWetWaste = data.reduce((sum, record) => sum + record.wetWaste, 0);
  const totalDryWaste = data.reduce((sum, record) => sum + record.dryWaste, 0);
  
  return {
    numberOfGroups: uniqueGroups.size,
    numberOfHouseholds: 138, // Hardcoded value as requested
    numberOfWeeks: uniqueWeeks.size,
    totalWetWaste,
    totalDryWaste,
    totalWeight: totalWetWaste + totalDryWaste
  };
}

// Group name mapping from JSON abbreviations to full display names
export const GROUP_NAME_MAPPING: Record<string, string> = {
  'Kamakowa Jamtaka': 'Kamakowa Jamtaka CBO',
  'Gracious Mums': 'Graceous Moms Women Group',
  'Kel Takau': 'Kel Takau Youth Group',
  'Kibuye WM': 'Kibuye Waste Management Group',
  'Otonglo WM': 'Otonglo Waste Management Group',
  'Nawal': 'Nawal Super Youth Group',
  'Tech Taka': 'Tech Taka Solutions',
  'Manyatta YRC': 'Manyatta Youth Resource Center',
  'Aidi': 'AIDI Youth Group',
  'Amazing Grace': 'Amazing Grace CBO',
  'Determined Achievers': 'Nyalenda Determined Achievers',
  'Duke WMS': 'Duke Waste Management Services Enterprise',
  'United Solutions WM': 'United Solutions Waste Group'
};

// Groups that have business data (mixed domestic and business)
export const GROUPS_WITH_BUSINESS_DATA = [
  'Tech Taka',
  'Kibuye WM', 
  'Manyatta YRC',
  'United Solutions WM'
];

/**
 * Calculate household category data (Business vs Domestic)
 * Updated logic based on group classification:
 * 1. Domestic: All data EXCEPT from groups with business data
 * 2. Business: Only data from groups with business data
 */
export function calculateHouseholdCategories(data: CleanedDataRecord[]): HouseholdCategoryData {
  // Filter data for domestic-only groups (excluding groups with business data)
  const domesticOnlyData = data.filter(record => 
    !GROUPS_WITH_BUSINESS_DATA.includes(record.group) && record.householdName.trim() !== ''
  );
  
  // Filter data for business groups (groups that have mixed business/domestic data)
  const businessGroupData = data.filter(record => 
    GROUPS_WITH_BUSINESS_DATA.includes(record.group) && record.householdName.trim() !== ''
  );
  
  // Domestic-only calculations
  const uniqueDomesticHouseholds = new Set(domesticOnlyData.map(record => record.householdName));
  const uniqueDomesticWeeks = new Set(domesticOnlyData.map(record => record.weekNumber));
  const totalDomesticWetWaste = domesticOnlyData.reduce((sum, record) => sum + record.wetWaste, 0);
  const totalDomesticDryWaste = domesticOnlyData.reduce((sum, record) => sum + record.dryWaste, 0);
  
  const domesticHouseholdCount = uniqueDomesticHouseholds.size || 1;
  const domesticWeekCount = uniqueDomesticWeeks.size || 1;
  
  // Business group calculations
  const uniqueBusinessHouseholds = new Set(businessGroupData.map(record => record.householdName));
  const uniqueBusinessWeeks = new Set(businessGroupData.map(record => record.weekNumber));
  const totalBusinessWetWaste = businessGroupData.reduce((sum, record) => sum + record.wetWaste, 0);
  const totalBusinessDryWaste = businessGroupData.reduce((sum, record) => sum + record.dryWaste, 0);
  
  const businessHouseholdCount = uniqueBusinessHouseholds.size || 1;
  const businessWeekCount = uniqueBusinessWeeks.size || 1;
  
  return {
    // Domestic-only groups (excludes Tech Taka, Kibuye WM, Manyatta YRC, United Solutions WM)
    domestic: {
      avgWeeklyWetWaste: totalDomesticWetWaste / domesticHouseholdCount / domesticWeekCount,
      avgWeeklyDryWaste: totalDomesticDryWaste / domesticHouseholdCount / domesticWeekCount,
      totalHouseholds: uniqueDomesticHouseholds.size,
      totalWeeks: uniqueDomesticWeeks.size
    },
    // Business groups (Tech Taka, Kibuye WM, Manyatta YRC, United Solutions WM only)
    business: {
      avgWeeklyWetWaste: totalBusinessWetWaste / businessHouseholdCount / businessWeekCount,
      avgWeeklyDryWaste: totalBusinessDryWaste / businessHouseholdCount / businessWeekCount,
      totalHouseholds: uniqueBusinessHouseholds.size,
      totalWeeks: uniqueBusinessWeeks.size
    }
  };
}

/**
 * Convert display group name back to internal group key
 */
export function getGroupKeyFromDisplayName(displayName: string): string {
  // Find the key where the value matches the display name
  const entry = Object.entries(GROUP_NAME_MAPPING).find(([, value]) => value === displayName);
  return entry ? entry[0] : displayName;
}

/**
 * Get unique values for filter dropdowns with full display names
 */
export function getUniqueValues(data: CleanedDataRecord[]) {
  // Get unique group names from data and map to full display names
  const uniqueGroupKeys = [...new Set(data.map(record => record.group))].sort();
  const groups = uniqueGroupKeys.map(groupKey => GROUP_NAME_MAPPING[groupKey] || groupKey);
  
  const households = [...new Set(data.map(record => record.householdName).filter(name => name.trim() !== ''))].sort();
  
  return { groups, households };
}

/**
 * Apply dry waste specific filters to data
 */
export function filterDryWasteData(data: CleanedDataRecord[], filters: DryWasteFilterState): CleanedDataRecord[] {
  return data.filter(record => {
    // Date range filter
    if (filters.dateRange.start && record.date < filters.dateRange.start) {
      return false;
    }
    if (filters.dateRange.end && record.date > filters.dateRange.end) {
      return false;
    }
    
    // Groups filter - convert display names back to internal keys for comparison
    if (filters.selectedGroups && filters.selectedGroups.length > 0) {
      const selectedGroupKeys = filters.selectedGroups.map(displayName => getGroupKeyFromDisplayName(displayName));
      if (!selectedGroupKeys.includes(record.group)) {
        return false;
      }
    }
    
    // Households filter - if households are selected, record must be in one of them
    if (filters.selectedHouseholds && filters.selectedHouseholds.length > 0 && !filters.selectedHouseholds.includes(record.householdName)) {
      return false;
    }
    
    return true;
  });
}

/**
 * Calculate recyclable material KPIs from filtered records
 */
export function calculateRecyclableMaterialKPIs(data: CleanedDataRecord[]): RecyclableMaterialKPIData {
  const totalHdpe = data.reduce((sum, record) => sum + record.hdpe, 0);
  const totalPet = data.reduce((sum, record) => sum + record.pet, 0);
  const totalPp = data.reduce((sum, record) => sum + record.pp, 0);
  const totalGlass = data.reduce((sum, record) => sum + record.glass, 0);
  const totalPaper = data.reduce((sum, record) => sum + record.paperWaste, 0);
  const totalMetal = data.reduce((sum, record) => sum + record.metal, 0);
  
  return {
    hdpe: totalHdpe,
    pet: totalPet,
    pp: totalPp,
    glass: totalGlass,
    paper: totalPaper,
    metal: totalMetal
  };
}

/**
 * Calculate group analysis data from filtered records
 */
export function calculateGroupAnalysisData(data: CleanedDataRecord[]): GroupAnalysisData[] {
  // Group data by group name
  const groupMap: Record<string, {
    totalWetWaste: number;
    totalDryWaste: number;
    hdpe: number;
    pet: number;
    pp: number;
    glass: number;
    paper: number;
    metal: number;
  }> = {};

  data.forEach(record => {
    if (!groupMap[record.group]) {
      groupMap[record.group] = {
        totalWetWaste: 0,
        totalDryWaste: 0,
        hdpe: 0,
        pet: 0,
        pp: 0,
        glass: 0,
        paper: 0,
        metal: 0
      };
    }

    const group = groupMap[record.group];
    group.totalWetWaste += record.wetWaste;
    group.totalDryWaste += record.dryWaste;
    group.hdpe += record.hdpe;
    group.pet += record.pet;
    group.pp += record.pp;
    group.glass += record.glass;
    group.paper += record.paperWaste;
    group.metal += record.metal;
  });

  // Convert to array with total weight calculation and sort by total weight (highest first)
  return Object.entries(groupMap)
    .map(([groupName, groupData]) => ({
      groupName,
      totalWetWaste: groupData.totalWetWaste,
      totalDryWaste: groupData.totalDryWaste,
      totalWeight: groupData.totalWetWaste + groupData.totalDryWaste,
      hdpe: groupData.hdpe,
      pet: groupData.pet,
      pp: groupData.pp,
      glass: groupData.glass,
      paper: groupData.paper,
      metal: groupData.metal
    }))
    .sort((a, b) => b.totalWeight - a.totalWeight);
}

/**
 * Calculate extrapolation data from entire dataset for future projections
 */
export function calculateExtrapolationData(
  data: CleanedDataRecord[], 
  targets: { numberOfGroups: number; numberOfHouseholds: number; numberOfWeeks: number }
): ExtrapolationData {
  // Get unique households and weeks from entire dataset
  const uniqueHouseholds = new Set(data.map(record => record.householdName).filter(name => name.trim() !== ''));
  const uniqueWeeks = new Set(data.map(record => record.weekNumber));
  
  const totalHouseholds = uniqueHouseholds.size;
  const totalWeeks = uniqueWeeks.size;
  
  // Calculate total sums
  const totalWetWaste = data.reduce((sum, record) => sum + record.wetWaste, 0);
  const totalDryWaste = data.reduce((sum, record) => sum + record.dryWaste, 0);
  
  // Row 2: Average weekly generation per household
  // Formula: Total sum / Total households / Total weeks
  const avgWeeklyWetWastePerHousehold = totalHouseholds > 0 && totalWeeks > 0 
    ? totalWetWaste / totalHouseholds / totalWeeks 
    : 0;
  const avgWeeklyDryWastePerHousehold = totalHouseholds > 0 && totalWeeks > 0 
    ? totalDryWaste / totalHouseholds / totalWeeks 
    : 0;
  const avgWeeklyTotalWeightPerHousehold = avgWeeklyWetWastePerHousehold + avgWeeklyDryWastePerHousehold;
  
  // Row 3: Average daily generation per household (weekly ÷ 7)
  const avgDailyWetWastePerHousehold = avgWeeklyWetWastePerHousehold / 7;
  const avgDailyDryWastePerHousehold = avgWeeklyDryWastePerHousehold / 7;
  const avgDailyTotalWeightPerHousehold = avgWeeklyTotalWeightPerHousehold / 7;
  
  // Row 4: Average monthly generation per household (weekly × 4)
  const avgMonthlyWetWastePerHousehold = avgWeeklyWetWastePerHousehold * 4;
  const avgMonthlyDryWastePerHousehold = avgWeeklyDryWastePerHousehold * 4;
  const avgMonthlyTotalWeightPerHousehold = avgWeeklyTotalWeightPerHousehold * 4;
  
  // Row 5: Extrapolated totals (weekly average × target households × target weeks)
  const extrapolatedTotalWetWaste = avgWeeklyWetWastePerHousehold * targets.numberOfHouseholds * targets.numberOfWeeks;
  const extrapolatedTotalDryWaste = avgWeeklyDryWastePerHousehold * targets.numberOfHouseholds * targets.numberOfWeeks;
  const extrapolatedTotalWeight = extrapolatedTotalWetWaste + extrapolatedTotalDryWaste;
  
  return {
    avgWeeklyWetWastePerHousehold,
    avgWeeklyDryWastePerHousehold,
    avgWeeklyTotalWeightPerHousehold,
    avgDailyWetWastePerHousehold,
    avgDailyDryWastePerHousehold,
    avgDailyTotalWeightPerHousehold,
    avgMonthlyWetWastePerHousehold,
    avgMonthlyDryWastePerHousehold,
    avgMonthlyTotalWeightPerHousehold,
    extrapolatedTotalWetWaste,
    extrapolatedTotalDryWaste,
    extrapolatedTotalWeight
  };
}