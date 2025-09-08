import { RawDataRecord, CleanedDataRecord, KPIData, HouseholdCategoryData, FilterState } from '@/types/data';

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
 * Parse date string in MM/DD/YYYY format to Date object
 */
function parseDate(dateString: string): Date | null {
  if (!dateString || dateString.trim() === '') return null;
  
  const parts = dateString.split('/');
  if (parts.length !== 3) return null;
  
  const month = parseInt(parts[0], 10) - 1; // JavaScript months are 0-indexed
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  
  const date = new Date(year, month, day);
  
  // Validate the date
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
    
    // Group filter
    if (filters.selectedGroup && filters.selectedGroup !== 'all' && record.group !== filters.selectedGroup) {
      return false;
    }
    
    // Household filter
    if (filters.selectedHousehold && filters.selectedHousehold !== 'all' && record.householdName !== filters.selectedHousehold) {
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
  const uniqueHouseholds = new Set(data.map(record => record.householdName).filter(name => name.trim() !== ''));
  const uniqueWeeks = new Set(data.map(record => record.weekNumber));
  
  const totalWetWaste = data.reduce((sum, record) => sum + record.wetWaste, 0);
  const totalDryWaste = data.reduce((sum, record) => sum + record.dryWaste, 0);
  
  return {
    numberOfGroups: uniqueGroups.size,
    numberOfHouseholds: uniqueHouseholds.size,
    numberOfWeeks: uniqueWeeks.size,
    totalWetWaste,
    totalDryWaste,
    totalWeight: totalWetWaste + totalDryWaste
  };
}

/**
 * Calculate household category data (Business vs Domestic)
 */
export function calculateHouseholdCategories(data: CleanedDataRecord[]): HouseholdCategoryData {
  const businessData = data.filter(record => record.isBusinessHousehold);
  const domesticData = data.filter(record => !record.isBusinessHousehold);
  
  // Business households calculations
  const uniqueBusinessHouseholds = new Set(businessData.map(record => record.householdName).filter(name => name.trim() !== ''));
  const uniqueBusinessWeeks = new Set(businessData.map(record => record.weekNumber));
  const totalBusinessWetWaste = businessData.reduce((sum, record) => sum + record.wetWaste, 0);
  const totalBusinessDryWaste = businessData.reduce((sum, record) => sum + record.dryWaste, 0);
  
  const businessHouseholdCount = uniqueBusinessHouseholds.size || 1; // Avoid division by zero
  const businessWeekCount = uniqueBusinessWeeks.size || 1;
  
  // Domestic households calculations  
  const uniqueDomesticHouseholds = new Set(domesticData.map(record => record.householdName).filter(name => name.trim() !== ''));
  const uniqueDomesticWeeks = new Set(domesticData.map(record => record.weekNumber));
  const totalDomesticWetWaste = domesticData.reduce((sum, record) => sum + record.wetWaste, 0);
  const totalDomesticDryWaste = domesticData.reduce((sum, record) => sum + record.dryWaste, 0);
  
  const domesticHouseholdCount = uniqueDomesticHouseholds.size || 1;
  const domesticWeekCount = uniqueDomesticWeeks.size || 1;
  
  return {
    business: {
      avgWeeklyWetWaste: totalBusinessWetWaste / businessHouseholdCount / businessWeekCount,
      avgWeeklyDryWaste: totalBusinessDryWaste / businessHouseholdCount / businessWeekCount,
      totalHouseholds: uniqueBusinessHouseholds.size,
      totalWeeks: uniqueBusinessWeeks.size
    },
    domestic: {
      avgWeeklyWetWaste: totalDomesticWetWaste / domesticHouseholdCount / domesticWeekCount,
      avgWeeklyDryWaste: totalDomesticDryWaste / domesticHouseholdCount / domesticWeekCount,
      totalHouseholds: uniqueDomesticHouseholds.size,
      totalWeeks: uniqueDomesticWeeks.size
    }
  };
}

/**
 * Get unique values for filter dropdowns
 */
export function getUniqueValues(data: CleanedDataRecord[]) {
  const groups = [...new Set(data.map(record => record.group))].sort();
  const households = [...new Set(data.map(record => record.householdName).filter(name => name.trim() !== ''))].sort();
  
  return { groups, households };
}