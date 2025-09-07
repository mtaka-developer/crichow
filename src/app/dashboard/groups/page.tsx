"use client";

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Line } from 'recharts';
import Filters from '../components/Filters';
import { 
  WasteRecord, 
  FilterOptions, 
  filterData, 
  groupDataByGroups,
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
    "DATE": "15/3/2025",
    "Group": "Nawal",
    "HOUSEHOLD NAME": "Tom Obiero",
    "WET WASTE (KGS)": 21,
    "DRY WASTE (KGS)": 2.3,
    "HDPE(KGS)": 0.9,
    "PET (KGS)": 0.4,
    "PP (KGS)": 0.7,
    "PAPER WASTE(KGS)": 0.3,
    "METAL": 0,
    "GLASS": 0,
    "Location": ""
  },
  {
    "DATE": "15/3/2025",
    "Group": "Kibera East",
    "HOUSEHOLD NAME": "Mary Wanjiku",
    "WET WASTE (KGS)": 18,
    "DRY WASTE (KGS)": 3.5,
    "HDPE(KGS)": 1.2,
    "PET (KGS)": 0.8,
    "PP (KGS)": 0.5,
    "PAPER WASTE(KGS)": 0.7,
    "METAL": 0.3,
    "GLASS": 0,
    "Location": ""
  }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'];

interface GroupCardProps {
  group: any;
  rank: number;
}

function GroupCard({ group, rank }: GroupCardProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (rank === 2) return 'bg-gray-100 text-gray-800 border-gray-200';
    if (rank === 3) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-blue-50 text-blue-800 border-blue-200';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 ${getRankColor(rank).includes('border') ? getRankColor(rank) : 'border-gray-200'} p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{group.group}</h3>
        <div className="flex items-center">
          <span className="text-xl mr-2">{getRankIcon(rank)}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRankColor(rank)}`}>
            #{rank}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-xl font-bold text-green-600">{group.wetWaste} kg</div>
          <div className="text-xs text-gray-600">Wet Waste</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">{group.dryWaste} kg</div>
          <div className="text-xs text-gray-600">Dry Waste</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Households: <strong>{group.householdCount}</strong></span>
          <span>Total: <strong>{group.totalWaste} kg</strong></span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Avg per household: <strong>{(group.totalWaste / group.householdCount).toFixed(1)} kg</strong>
        </div>
      </div>
    </div>
  );
}

export default function GroupComparison() {
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
  
  // Group data by groups
  const groupData = useMemo(() => groupDataByGroups(filteredData), [filteredData]);

  // Sort groups by total waste for ranking
  const rankedGroups = useMemo(() => 
    [...groupData].sort((a, b) => b.totalWaste - a.totalWaste), 
    [groupData]
  );

  // Prepare data for total weights pie chart
  const totalWeightsPieData = groupData.map(group => ({
    name: group.group,
    value: group.totalWaste,
  }));

  // Prepare data for material breakdown by group
  const materialBreakdownData = groupData.map(group => ({
    group: group.group,
    HDPE: group.HDPE,
    PET: group.PET,
    PP: group.PP,
    PAPER: group.PAPER,
    METAL: group.METAL,
    GLASS: group.GLASS,
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Group Comparison</h1>
        <p className="text-gray-600">
          Compare waste collection performance across different groups and communities
        </p>
      </div>

      {/* Filters */}
      <Filters
        data={rawData}
        filters={filters}
        onFiltersChange={setFilters}
        showMaterialFilter={false}
      />

      {/* Group Rankings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Performance Rankings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rankedGroups.map((group, index) => (
            <GroupCard key={group.group} group={group} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Wet vs Dry Waste Comparison */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Wet vs Dry Waste by Group
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={groupData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="group" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} kg`, name]}
                labelFormatter={(label) => `Group: ${label}`}
              />
              <Legend />
              <Bar dataKey="wetWaste" fill="#F59E0B" name="Wet Waste" />
              <Bar dataKey="dryWaste" fill="#10B981" name="Dry Waste" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Total Weights Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Total Weight Distribution by Group
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={totalWeightsPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {totalWeightsPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} kg`, 'Weight']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Material Breakdown by Group */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Dry Waste Material Breakdown by Group
        </h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={materialBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="group" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value: number, name: string) => [`${value} kg`, name]}
              labelFormatter={(label) => `Group: ${label}`}
            />
            <Legend />
            <Bar dataKey="HDPE" stackId="a" fill="#3B82F6" name="HDPE" />
            <Bar dataKey="PET" stackId="a" fill="#10B981" name="PET" />
            <Bar dataKey="PP" stackId="a" fill="#F59E0B" name="PP" />
            <Bar dataKey="PAPER" stackId="a" fill="#EF4444" name="Paper" />
            <Bar dataKey="METAL" stackId="a" fill="#8B5CF6" name="Metal" />
            <Bar dataKey="GLASS" stackId="a" fill="#06B6D4" name="Glass" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Groups</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-800">Most Total Waste</p>
                  <p className="text-sm text-green-600">
                    {rankedGroups[0]?.group} - {rankedGroups[0]?.totalWaste} kg
                  </p>
                </div>
                <span className="text-2xl">🏆</span>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-800">Most Households</p>
                  <p className="text-sm text-blue-600">
                    {[...groupData].sort((a, b) => b.householdCount - a.householdCount)[0]?.group} - {[...groupData].sort((a, b) => b.householdCount - a.householdCount)[0]?.householdCount} households
                  </p>
                </div>
                <span className="text-2xl">👥</span>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-purple-800">Best Recycling Ratio</p>
                  <p className="text-sm text-purple-600">
                    {[...groupData].sort((a, b) => (b.dryWaste / (b.wetWaste + b.dryWaste)) - (a.dryWaste / (a.wetWaste + a.dryWaste)))[0]?.group} - {(([...groupData].sort((a, b) => (b.dryWaste / (b.wetWaste + b.dryWaste)) - (a.dryWaste / (a.wetWaste + a.dryWaste)))[0]?.dryWaste / ([...groupData].sort((a, b) => (b.dryWaste / (b.wetWaste + b.dryWaste)) - (a.dryWaste / (a.wetWaste + a.dryWaste)))[0]?.wetWaste + [...groupData].sort((a, b) => (b.dryWaste / (b.wetWaste + b.dryWaste)) - (a.dryWaste / (a.wetWaste + a.dryWaste)))[0]?.dryWaste)) * 100).toFixed(1)}%
                  </p>
                </div>
                <span className="text-2xl">♻️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Group Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Statistics</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-700">
                  {groupData.length}
                </div>
                <div className="text-sm text-gray-600">Active Groups</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-700">
                  {groupData.reduce((sum, group) => sum + group.householdCount, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Households</div>
              </div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {groupData.length > 0 ? (groupData.reduce((sum, group) => sum + group.totalWaste, 0) / groupData.length).toFixed(1) : 0} kg
                </div>
                <div className="text-sm text-gray-600">Average Waste per Group</div>
              </div>
            </div>
            
            <div className="p-4 bg-teal-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">
                  {groupData.reduce((sum, group) => sum + group.householdCount, 0) > 0 ? 
                    (groupData.reduce((sum, group) => sum + group.totalWaste, 0) / 
                     groupData.reduce((sum, group) => sum + group.householdCount, 0)).toFixed(1) : 0} kg
                </div>
                <div className="text-sm text-gray-600">Average Waste per Household</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}