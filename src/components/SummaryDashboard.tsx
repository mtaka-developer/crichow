"use client";

import { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Filters from '../components/Filters';
import { 
  WasteRecord, 
  FilterOptions, 
  filterData, 
  calculateSummaryStats, 
  groupDataByMonth,
  formatDateForInput,
  parseDate
} from '../utils/dataUtils';

// Sample data - replace with your actual data import
const sampleData: WasteRecord[] = [
  {
    "DATE": "13/3/2025",
    "Group": "Kel Takau",
    "HOUSEHOLD NAME": "Okore apartment",
    "WET WASTE (KGS)": 2,
    "DRY WASTE (KGS)": 20,
    "HDPE(KGS)": 5,
    "PET (KGS)": 6,
    "PP (KGS)": 1,
    "PAPER WASTE(KGS)": 4,
    "METAL": 4,
    "GLASS": 0,
    "Location": ""
  },
  {
    "DATE": "13/3/2025",
    "Group": "Kel Takau",
    "HOUSEHOLD NAME": "Okore gate 1A",
    "WET WASTE (KGS)": 25,
    "DRY WASTE (KGS)": 5,
    "HDPE(KGS)": "",
    "PET (KGS)": "",
    "PP (KGS)": "",
    "PAPER WASTE(KGS)": "",
    "METAL": "",
    "GLASS": "",
    "Location": ""
  },
  {
    "DATE": "15/3/2025",
    "Group": "Nawal",
    "HOUSEHOLD NAME": "Zakia Mohammed",
    "WET WASTE (KGS)": 16,
    "DRY WASTE (KGS)": 0.9,
    "HDPE(KGS)": "",
    "PET (KGS)": "",
    "PP (KGS)": "",
    "PAPER WASTE(KGS)": "",
    "METAL": "",
    "GLASS": "",
    "Location": ""
  }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 w-12 h-12 rounded-md ${color} flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function SummaryDashboard() {
  // Replace sampleData with your actual data from /src/data/
  const rawData = sampleData; // TODO: Import your actual data here

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
  
  // Calculate summary statistics
  const summaryStats = useMemo(() => calculateSummaryStats(filteredData), [filteredData]);
  
  // Get monthly data for charts
  const monthlyData = useMemo(() => groupDataByMonth(filteredData), [filteredData]);

  // Prepare data for waste type pie chart
  const wasteTypeData = [
    { name: 'Wet Waste', value: summaryStats.totalWetWaste },
    { name: 'Dry Waste', value: summaryStats.totalDryWaste },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">CRICHOW Project Summary</h1>
        <p className="text-gray-600">
          Overview of waste collection data across all groups and households
        </p>
      </div>

      {/* Filters */}
      <Filters
        data={rawData}
        filters={filters}
        onFiltersChange={setFilters}
        showMaterialFilter={false}
      />

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Number of Groups"
          value={summaryStats.numberOfGroups}
          icon="👥"
          color="bg-blue-500"
        />
        <StatCard
          title="Number of Households"
          value={summaryStats.numberOfHouseholds}
          icon="🏠"
          color="bg-green-500"
        />
        <StatCard
          title="Number of Weeks"
          value={summaryStats.numberOfWeeks}
          icon="📅"
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Wet Waste (kg)"
          value={`${summaryStats.totalWetWaste} kg`}
          icon="🥬"
          color="bg-orange-500"
        />
        <StatCard
          title="Total Dry Waste (kg)"
          value={`${summaryStats.totalDryWaste} kg`}
          icon="♻️"
          color="bg-teal-500"
        />
        <StatCard
          title="Total Waste (kg)"
          value={`${summaryStats.totalWaste} kg`}
          icon="🗑️"
          color="bg-red-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Waste Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Waste Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
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
                dataKey="wetWaste" 
                stroke="#F59E0B" 
                strokeWidth={3}
                name="Wet Waste"
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="dryWaste" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Dry Waste"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Waste Type Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Waste Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={wasteTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {wasteTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} kg`, 'Weight']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Breakdown Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Waste Breakdown</h3>
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
            <Bar dataKey="wetWaste" stackId="a" fill="#F59E0B" name="Wet Waste" />
            <Bar dataKey="dryWaste" stackId="a" fill="#10B981" name="Dry Waste" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {((summaryStats.totalWetWaste / summaryStats.totalWaste) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Wet Waste Ratio</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {((summaryStats.totalDryWaste / summaryStats.totalWaste) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Dry Waste Ratio</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {(summaryStats.totalWaste / summaryStats.numberOfHouseholds).toFixed(1)} kg
            </div>
            <div className="text-sm text-gray-600">Avg per Household</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {(summaryStats.totalWaste / summaryStats.numberOfWeeks).toFixed(1)} kg
            </div>
            <div className="text-sm text-gray-600">Avg per Week</div>
          </div>
        </div>
      </div>
    </div>
  );
}