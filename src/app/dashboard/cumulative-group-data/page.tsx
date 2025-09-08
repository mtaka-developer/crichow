"use client";

import { useState, useEffect } from 'react';
import DashboardPageWrapper from "@/components/dashboard/DashboardPageWrapper";
import FilterComponents from "@/components/dashboard/FilterComponents";
import DryWetWasteByGroupChart from "@/components/dashboard/DryWetWasteByGroupChart";
import GroupTotalWeightDonutChart from "@/components/dashboard/GroupTotalWeightDonutChart";
import WasteCategoriesByGroupChart from "@/components/dashboard/WasteCategoriesByGroupChart";
import { RawDataRecord, CleanedDataRecord, FilterState, GroupAnalysisData } from '@/types/data';
import { cleanData, filterData, calculateGroupAnalysisData, getUniqueValues } from '@/lib/dataUtils';

export default function CumulativeGroupDataPage() {
  const [cleanedData, setCleanedData] = useState<CleanedDataRecord[]>([]);
  const [filteredData, setFilteredData] = useState<CleanedDataRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: null, end: null },
    selectedGroups: [],
    selectedHouseholds: []
  });

  const [groupAnalysisData, setGroupAnalysisData] = useState<GroupAnalysisData[]>([]);
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
        
        // Clean the data
        const cleaned = cleanData(data);
        setCleanedData(cleaned);
        setFilteredData(cleaned); // Initially show all data
        
        // Get unique values for filters
        const unique = getUniqueValues(cleaned);
        setUniqueValues(unique);
        
        // Calculate initial group analysis data
        setGroupAnalysisData(calculateGroupAnalysisData(cleaned));
        
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
      
      // Recalculate group analysis data based on filtered data
      setGroupAnalysisData(calculateGroupAnalysisData(filtered));
    }
  }, [filters, cleanedData]);

  if (loading) {
    return (
      <DashboardPageWrapper>
        <div className="flex items-center justify-center min-h-64">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mtaka-green"></div>
            <span className="text-gray-600 font-poppins">Loading cumulative group analysis data...</span>
          </div>
        </div>
      </DashboardPageWrapper>
    );
  }

  if (error) {
    return (
      <DashboardPageWrapper>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-bold text-red-800 font-sans">Error Loading Data</h3>
              <p className="text-red-600 font-poppins">{error}</p>
            </div>
          </div>
        </div>
      </DashboardPageWrapper>
    );
  }

  return (
    <DashboardPageWrapper>

      {/* Filters */}
      <FilterComponents 
        filters={filters}
        onFiltersChange={setFilters}
        groups={uniqueValues.groups}
        households={uniqueValues.households}
      />

      {/* Analysis Section Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 font-sans">Group Analysis Overview</h3>
        <p className="text-sm text-gray-600 font-poppins mt-1">
          Comprehensive waste collection analysis across all groups
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Dry and Wet Waste by Group Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <DryWetWasteByGroupChart data={groupAnalysisData} />
        </div>

        {/* Group by Total Weight Donut Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <GroupTotalWeightDonutChart data={groupAnalysisData} />
        </div>
      </div>

      {/* Detailed Analysis Section Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 font-sans">Material Breakdown Analysis</h3>
        <p className="text-sm text-gray-600 font-poppins mt-1">
          Detailed view of recyclable materials by group
        </p>
      </div>

      {/* Waste Categories by Group Chart - Full Width */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <WasteCategoriesByGroupChart data={groupAnalysisData} />
      </div>
    </DashboardPageWrapper>
  );
}