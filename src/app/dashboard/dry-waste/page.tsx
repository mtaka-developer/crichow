"use client";

import { useState, useMemo } from 'react';
import { LineChart, 
  Line, 
  XAxis, 
  YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, BarChart, Bar } from 'recharts';
import Filters from '../../../components/Filters';
import { 
  WasteRecord, 
  FilterOptions, 
  filterData, 
  calculateDryWasteBreakdown, 
  groupDataByMonth,
  formatDateForInput,
  parseDate
} from '../../../utils/dataUtils';
const wasteData = require('@/data/data.json');

const typedWasteData = wasteData as WasteRecord[];

const MATERIAL_COLORS = {
  HDPE: '#3B82F6',
  PET: '#10B981', 
  PP: '#F59E0B',
  PAPER: '#EF4444',
  METAL: '#8B5CF6',
  GLASS: '#06B6D4'
};

interface MaterialCardProps {
  material: string;
  weight: number;
  color: string;
}

function MaterialCard({ material, weight, color }: MaterialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center">
        <div 
          className="flex-shrink-0 w-4 h-4 rounded-full mr-3"
          style={{ backgroundColor: color }}
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{material}</p>
          <p className="text-xl font-bold text-gray-900">{weight} kg</p>
        </div>
      </div>
    </div>
  );
}

export default function DryWasteAnalysis() {
  // Replace sampleData with your actual data from /src/data/
  const rawData = typedWasteData; // TODO: Import your actual data here

  // Get date range from data for initial filters
  const allDates = rawData.map(r => parseDate(r.DATE));
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: {
      start: formatDateForInput(minDate),
      end: formatDateForInput(maxDate),
    },
    groups: [],
    households: [],
    materials: [],
  });

  // Filter data based on current filters
  const filteredData = useMemo(() => filterData(rawData, filters), [rawData, filters]);
  
  // Calculate dry waste breakdown
  const dryWasteBreakdown = useMemo(() => calculateDryWasteBreakdown(filteredData), [filteredData]);
  
  // Get monthly data for charts
  const monthlyData = useMemo(() => groupDataByMonth(filteredData), [filteredData]);

  // Filter monthly data by selected materials if any
  const filteredMonthlyData = useMemo(() => {
    if (filters.materials.length === 0) {
      return monthlyData;
    }
    
    return monthlyData.map(month => {
      const filtered: any = { month: month.month };
      
      if (filters.materials.includes('HDPE')) filtered.HDPE = month.HDPE;
      if (filters.materials.includes('PET')) filtered.PET = month.PET;
      if (filters.materials.includes('PP')) filtered.PP = month.PP;
      if (filters.materials.includes('PAPER WASTE')) filtered.PAPER = month.PAPER;
      if (filters.materials.includes('METAL')) filtered.METAL = month.METAL;
      if (filters.materials.includes('GLASS')) filtered.GLASS = month.GLASS;
      
      return filtered;
    });
  }, [monthlyData, filters.materials]);

  // Calculate total dry waste for the period
  const totalDryWaste = dryWasteBreakdown.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dry Waste Analysis</h1>
        <p className="text-gray-600">
          Detailed breakdown of recyclable materials collection and trends
        </p>
      </div>

      {/* Filters */}
      <Filters
        data={rawData}
        filters={filters}
        onFiltersChange={setFilters}
        showMaterialFilter={true}
      />

      {/* Material Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {dryWasteBreakdown.map((item) => (
          <MaterialCard
            key={item.material}
            material={item.material}
            weight={item.total}
            color={MATERIAL_COLORS[item.material as keyof typeof MATERIAL_COLORS]}
          />
        ))}
      </div>

      {/* Total Dry Waste Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm text-white p-6">
        <div className="text-center">
          <p className="text-blue-100 text-sm mb-2">Total Dry Waste Collected</p>
          <p className="text-4xl font-bold">{totalDryWaste} kg</p>
          <p className="text-blue-100 text-sm mt-2">
            Across {filteredData.length} records from selected filters
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Material Breakdown Over Time */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Material Quantities Over Time
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} kg`, name]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              
              {(filters.materials.length === 0 || filters.materials.includes('HDPE')) && (
                <Line 
                  type="monotone" 
                  dataKey="HDPE" 
                  stroke={MATERIAL_COLORS.HDPE}
                  strokeWidth={2}
                  name="HDPE"
                  dot={{ fill: MATERIAL_COLORS.HDPE, strokeWidth: 2, r: 3 }}
                />
              )}
              {(filters.materials.length === 0 || filters.materials.includes('PET')) && (
                <Line 
                  type="monotone" 
                  dataKey="PET" 
                  stroke={MATERIAL_COLORS.PET}
                  strokeWidth={2}
                  name="PET"
                  dot={{ fill: MATERIAL_COLORS.PET, strokeWidth: 2, r: 3 }}
                />
              )}
              {(filters.materials.length === 0 || filters.materials.includes('PP')) && (
                <Line 
                  type="monotone" 
                  dataKey="PP" 
                  stroke={MATERIAL_COLORS.PP}
                  strokeWidth={2}
                  name="PP"
                  dot={{ fill: MATERIAL_COLORS.PP, strokeWidth: 2, r: 3 }}
                />
              )}
              {(filters.materials.length === 0 || filters.materials.includes('PAPER WASTE')) && (
                <Line 
                  type="monotone" 
                  dataKey="PAPER" 
                  stroke={MATERIAL_COLORS.PAPER}
                  strokeWidth={2}
                  name="Paper"
                  dot={{ fill: MATERIAL_COLORS.PAPER, strokeWidth: 2, r: 3 }}
                />
              )}
              {(filters.materials.length === 0 || filters.materials.includes('METAL')) && (
                <Line 
                  type="monotone" 
                  dataKey="METAL" 
                  stroke={MATERIAL_COLORS.METAL}
                  strokeWidth={2}
                  name="Metal"
                  dot={{ fill: MATERIAL_COLORS.METAL, strokeWidth: 2, r: 3 }}
                />
              )}
              {(filters.materials.length === 0 || filters.materials.includes('GLASS')) && (
                <Line 
                  type="monotone" 
                  dataKey="GLASS" 
                  stroke={MATERIAL_COLORS.GLASS}
                  strokeWidth={2}
                  name="Glass"
                  dot={{ fill: MATERIAL_COLORS.GLASS, strokeWidth: 2, r: 3 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Total Dry Waste Weight Over Time */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Total Dry Waste Weight Over Time
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} kg`, name]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="dryWaste" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Total Dry Waste"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Material Breakdown Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Material Breakdown</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value: number, name: string) => [`${value} kg`, name]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Bar dataKey="HDPE" stackId="a" fill={MATERIAL_COLORS.HDPE} name="HDPE" />
            <Bar dataKey="PET" stackId="a" fill={MATERIAL_COLORS.PET} name="PET" />
            <Bar dataKey="PP" stackId="a" fill={MATERIAL_COLORS.PP} name="PP" />
            <Bar dataKey="PAPER" stackId="a" fill={MATERIAL_COLORS.PAPER} name="Paper" />
            <Bar dataKey="METAL" stackId="a" fill={MATERIAL_COLORS.METAL} name="Metal" />
            <Bar dataKey="GLASS" stackId="a" fill={MATERIAL_COLORS.GLASS} name="Glass" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Material Analysis Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Materials */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Materials by Weight</h3>
          <div className="space-y-3">
            {dryWasteBreakdown
              .sort((a, b) => b.total - a.total)
              .map((item, index) => (
                <div key={item.material} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-sm font-semibold text-gray-600 mr-3">
                      {index + 1}
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: MATERIAL_COLORS[item.material as keyof typeof MATERIAL_COLORS] }}
                      />
                      <span className="font-medium">{item.material}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{item.total} kg</div>
                    <div className="text-sm text-gray-500">
                      {totalDryWaste > 0 ? ((item.total / totalDryWaste) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* Collection Efficiency */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {dryWasteBreakdown.filter(item => item.total > 0).length}
              </div>
              <div className="text-sm text-gray-600">Active Material Types</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {filteredData.length > 0 ? (totalDryWaste / filteredData.length).toFixed(2) : 0} kg
              </div>
              <div className="text-sm text-gray-600">Average per Collection</div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {monthlyData.length > 0 ? (totalDryWaste / monthlyData.length).toFixed(2) : 0} kg
              </div>
              <div className="text-sm text-gray-600">Average per Month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}