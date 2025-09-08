"use client";

import { useState, useEffect } from 'react';
import DashboardPageWrapper from "@/components/dashboard/DashboardPageWrapper";
import FilterComponents from "@/components/dashboard/FilterComponents";
import KPIGrid from "@/components/dashboard/KPIGrid";
import HouseholdCategorization from "@/components/dashboard/HouseholdCategorization";
import { RawDataRecord, CleanedDataRecord, FilterState, KPIData, HouseholdCategoryData } from '@/types/data';
import { cleanData, filterData, calculateKPIs, calculateHouseholdCategories, getUniqueValues } from '@/lib/dataUtils';

export default function SummaryPage() {
  const [rawData, setRawData] = useState<RawDataRecord[]>([]);
  const [cleanedData, setCleanedData] = useState<CleanedDataRecord[]>([]);
  const [filteredData, setFilteredData] = useState<CleanedDataRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: null, end: null },
    selectedGroup: 'all',
    selectedHousehold: 'all'
  });

  const [kpiData, setKpiData] = useState<KPIData>({
    numberOfGroups: 0,
    numberOfHouseholds: 0,
    numberOfWeeks: 0,
    totalWetWaste: 0,
    totalDryWaste: 0,
    totalWeight: 0
  });

  const [householdCategoryData, setHouseholdCategoryData] = useState<HouseholdCategoryData>({
    domestic: {
      avgWeeklyWetWaste: 0,
      avgWeeklyDryWaste: 0,
      totalHouseholds: 0,
      totalWeeks: 0
    },
    business: {
      avgWeeklyWetWaste: 0,
      avgWeeklyDryWaste: 0,
      totalHouseholds: 0,
      totalWeeks: 0
    }
  });

  const [uniqueValues, setUniqueValues] = useState<{ groups: string[]; households: string[] }>({ groups: [], households: [] });

  // Load and clean data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load the JSON data
        const response = await fetch('/practical-action-data.json');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        
        const data: RawDataRecord[] = await response.json();
        setRawData(data);
        
        // Clean the data
        const cleaned = cleanData(data);
        setCleanedData(cleaned);
        setFilteredData(cleaned); // Initially show all data
        
        // Get unique values for filters
        const unique = getUniqueValues(cleaned);
        setUniqueValues(unique);
        
        // Calculate initial KPIs and categories
        setKpiData(calculateKPIs(cleaned));
        setHouseholdCategoryData(calculateHouseholdCategories(cleaned));
        
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Update filtered data when filters change
  useEffect(() => {
    if (cleanedData.length > 0) {
      const filtered = filterData(cleanedData, filters);
      setFilteredData(filtered);
      
      // Recalculate KPIs and categories based on filtered data
      setKpiData(calculateKPIs(filtered));
      setHouseholdCategoryData(calculateHouseholdCategories(filtered));
    }
  }, [filters, cleanedData]);

  if (loading) {
    return (
      <DashboardPageWrapper title="Summary">
        <div className="flex items-center justify-center min-h-64">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mtaka-green"></div>
            <span className="text-gray-600 font-poppins">Loading data...</span>
          </div>
        </div>
      </DashboardPageWrapper>
    );
  }

  if (error) {
    return (
      <DashboardPageWrapper title="Summary">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-red-800 font-anton">Error Loading Data</h3>
              <p className="text-red-600 font-poppins">{error}</p>
            </div>
          </div>
        </div>
      </DashboardPageWrapper>
    );
  }

  return (
    <DashboardPageWrapper title="Summary">
      {/* Data Overview */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-blue-800 font-poppins text-sm">
            <strong>{rawData.length.toLocaleString()}</strong> raw records loaded, 
            <strong> {cleanedData.length.toLocaleString()}</strong> records after cleaning, 
            <strong> {filteredData.length.toLocaleString()}</strong> records matching current filters
          </span>
        </div>
      </div>

      {/* Filters */}
      <FilterComponents 
        filters={filters}
        onFiltersChange={setFilters}
        groups={uniqueValues.groups}
        households={uniqueValues.households}
      />

      {/* KPI Cards Grid */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 font-anton">Key Performance Indicators</h3>
        <KPIGrid data={kpiData} />
      </div>

      {/* Household Categorization */}
      <HouseholdCategorization data={householdCategoryData} />

      {/* Data Quality Indicators */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 font-anton">Data Quality Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-mtaka-green font-anton">{uniqueValues.groups.length}</div>
            <div className="text-sm text-gray-600 font-poppins">Total Groups</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-practical-orange font-anton">{uniqueValues.households.length}</div>
            <div className="text-sm text-gray-600 font-poppins">Total Households</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 font-anton">
              {((cleanedData.length / rawData.length) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 font-poppins">Data Quality</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 font-anton">
              {cleanedData.length > 0 ? (
                <>
                  {new Date(Math.min(...cleanedData.map(d => d.date.getTime()))).toLocaleDateString()} - {new Date(Math.max(...cleanedData.map(d => d.date.getTime()))).toLocaleDateString()}
                </>
              ) : (
                'No Data'
              )}
            </div>
            <div className="text-sm text-gray-600 font-poppins">Date Range</div>
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}