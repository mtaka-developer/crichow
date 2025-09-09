"use client";

import { useState, useEffect } from 'react';
import DashboardPageWrapper from "@/components/dashboard/DashboardPageWrapper";
import DryWasteFilterComponents from "@/components/dashboard/DryWasteFilterComponents";
import RecyclableMaterialKPIGrid from "@/components/dashboard/RecyclableMaterialKPIGrid";
import DryWasteAnalysisChart from "@/components/dashboard/DryWasteAnalysisChart";
import TotalWeightChart from "@/components/dashboard/TotalWeightChart";
import { RawDataRecord, CleanedDataRecord, DryWasteFilterState, RecyclableMaterialKPIData } from '@/types/data';
import { cleanData, filterDryWasteData, calculateRecyclableMaterialKPIs, getUniqueValues } from '@/lib/dataUtils';

export default function CopyOfDryWasteAnalysisPage() {
  const [cleanedData, setCleanedData] = useState<CleanedDataRecord[]>([]);
  const [filteredData, setFilteredData] = useState<CleanedDataRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<DryWasteFilterState>({
    dateRange: { start: null, end: null },
    selectedGroups: [],
    selectedHouseholds: [],
    selectedMaterialTypes: ['HDPE', 'PET', 'PP', 'Glass', 'Paper', 'Metal']
  });

  const [kpiData, setKpiData] = useState<RecyclableMaterialKPIData>({
    hdpe: 0,
    pet: 0,
    pp: 0,
    glass: 0,
    paper: 0,
    metal: 0
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
        
        // Clean the data
        const cleaned = cleanData(data);
        setCleanedData(cleaned);
        setFilteredData(cleaned); // Initially show all data
        
        // Get unique values for filters
        const unique = getUniqueValues(cleaned);
        setUniqueValues(unique);
        
        // Calculate initial KPIs
        setKpiData(calculateRecyclableMaterialKPIs(cleaned));
        
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
      const filtered = filterDryWasteData(cleanedData, filters);
      setFilteredData(filtered);
      
      // Recalculate KPIs based on filtered data
      setKpiData(calculateRecyclableMaterialKPIs(filtered));
    }
  }, [filters, cleanedData]);

  if (loading) {
    return (
      <DashboardPageWrapper>
        <div className="flex items-center justify-center min-h-64">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mtaka-green"></div>
            <span className="text-gray-600 font-poppins">Loading dry waste analysis data...</span>
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
      <DryWasteFilterComponents 
        filters={filters}
        onFiltersChange={setFilters}
        groups={uniqueValues.groups}
        households={uniqueValues.households}
      />

      {/* Recyclable Material KPI Cards */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 font-sans">Recyclable Material Collection</h3>
          <div className="text-sm text-gray-500 font-poppins">
            Total: <span className="font-semibold text-gray-700">
              {(Object.values(kpiData).reduce((sum, value) => sum + value, 0)).toFixed(1)} kg
            </span>
          </div>
        </div>
        <RecyclableMaterialKPIGrid data={kpiData} />
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        {/* Dry Waste Analysis Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-3">
            <h4 className="text-lg font-semibold text-gray-800 font-poppins">Dry Waste Analysis</h4>
            <p className="text-sm text-gray-600 font-poppins mt-1">Material breakdown over time</p>
          </div>
          <DryWasteAnalysisChart 
            data={filteredData} 
            selectedMaterialTypes={filters.selectedMaterialTypes}
          />
        </div>

        {/* Total Weight Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-3">
            <h4 className="text-lg font-semibold text-gray-800 font-poppins">Total Weight (kg) over Time</h4>
            <p className="text-sm text-gray-600 font-poppins mt-1">Combined weight trends</p>
          </div>
          <TotalWeightChart data={filteredData} />
        </div>
      </div>
    </DashboardPageWrapper>
  );
}