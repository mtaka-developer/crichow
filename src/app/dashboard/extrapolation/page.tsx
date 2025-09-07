"use client";

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import Filters from '../components/Filters';
import { 
  WasteRecord, 
  FilterOptions, 
  filterData, 
  calculateExtrapolationData,
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
    "DATE": "20/3/2025",
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
  }
];

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color: string;
  trend?: 'up' | 'down' | 'stable';
}

function MetricCard({ title, value, subtitle, icon, color, trend }: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '📊';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-2">
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
        <span className="text-2xl">{getTrendIcon()}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}

interface PredictionData {
  month: string;
  historical?: number;
  predicted?: number;
  wetWaste?: number;
  dryWaste?: number;
}

export default function ExtrapolationPage() {
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
  
  // Calculate extrapolation/prediction data
  const extrapolationData = useMemo(() => calculateExtrapolationData(filteredData), [filteredData]);
  
  // Get monthly historical data
  const monthlyData = useMemo(() => groupDataByMonth(filteredData), [filteredData]);

  // Generate prediction data (simple linear extrapolation)
  const predictionData = useMemo(() => {
    if (monthlyData.length < 2) return [];

    const data: PredictionData[] = [];
    
    // Add historical data
    monthlyData.forEach((month, index) => {
      data.push({
        month: month.month,
        historical: month.wetWaste + month.dryWaste,
        wetWaste: month.wetWaste,
        dryWaste: month.dryWaste
      });
    });

    // Calculate trend for prediction
    if (monthlyData.length >= 2) {
      const recentMonths = monthlyData.slice(-3); // Use last 3 months for trend
      const avgGrowth = recentMonths.length > 1 
        ? (recentMonths[recentMonths.length - 1].wetWaste + recentMonths[recentMonths.length - 1].dryWaste - 
           recentMonths[0].wetWaste - recentMonths[0].dryWaste) / (recentMonths.length - 1)
        : 0;

      // Add 6 months of predictions
      const lastMonth = new Date(monthlyData[monthlyData.length - 1].month);
      const lastValue = monthlyData[monthlyData.length - 1].wetWaste + monthlyData[monthlyData.length - 1].dryWaste;
      
      for (let i = 1; i <= 6; i++) {
        const nextMonth = new Date(lastMonth);
        nextMonth.setMonth(nextMonth.getMonth() + i);
        const monthKey = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}`;
        
        const predictedValue = Math.max(0, lastValue + (avgGrowth * i));
        
        data.push({
          month: monthKey,
          predicted: Math.round(predictedValue * 100) / 100,
          wetWaste: Math.round((predictedValue * 0.7) * 100) / 100, // Assume 70% wet waste
          dryWaste: Math.round((predictedValue * 0.3) * 100) / 100   // Assume 30% dry waste
        });
      }
    }

    return data;
  }, [monthlyData]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Extrapolation & Predictions</h1>
        <p className="text-gray-600">
          Projected waste generation trends and statistical forecasts based on historical data
        </p>
      </div>

      {/* Filters */}
      <Filters
        data={rawData}
        filters={filters}
        onFiltersChange={setFilters}
        showMaterialFilter={false}
      />

      {/* Current Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Period Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Number of Groups"
            value={extrapolationData.numberOfGroups}
            icon="👥"
            color="bg-blue-500"
          />
          <MetricCard
            title="Number of Households"
            value={extrapolationData.numberOfHouseholds}
            icon="🏠"
            color="bg-green-500"
          />
          <MetricCard
            title="Number of Weeks"
            value={extrapolationData.numberOfWeeks}
            icon="📅"
            color="bg-purple-500"
          />
        </div>
      </div>

      {/* Average Weekly Generation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Weekly Waste Generation Per Household</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Average Wet Waste"
            value={`${extrapolationData.averageWeekly.wetWaste} kg`}
            subtitle="per household per week"
            icon="🥬"
            color="bg-orange-500"
            trend="up"
          />
          <MetricCard
            title="Average Dry Waste"
            value={`${extrapolationData.averageWeekly.dryWaste} kg`}
            subtitle="per household per week"
            icon="♻️"
            color="bg-teal-500"
            trend="up"
          />
          <MetricCard
            title="Average Total Waste"
            value={`${extrapolationData.averageWeekly.totalWaste} kg`}
            subtitle="per household per week"
            icon="🗑️"
            color="bg-red-500"
            trend="stable"
          />
        </div>
      </div>

      {/* Average Daily Generation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Daily Waste Generation Per Household</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Average Wet Waste"
            value={`${extrapolationData.averageDaily.wetWaste} kg`}
            subtitle="per household per day"
            icon="🌱"
            color="bg-lime-500"
          />
          <MetricCard
            title="Average Dry Waste"
            value={`${extrapolationData.averageDaily.dryWaste} kg`}
            subtitle="per household per day"
            icon="📦"
            color="bg-cyan-500"
          />
          <MetricCard
            title="Average Total Waste"
            value={`${extrapolationData.averageDaily.totalWaste} kg`}
            subtitle="per household per day"
            icon="⚖️"
            color="bg-indigo-500"
          />
        </div>
      </div>

      {/* Average Monthly Generation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Monthly Waste Generation Per Household</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Average Wet Waste"
            value={`${extrapolationData.averageMonthly.wetWaste} kg`}
            subtitle="per household per month"
            icon="📊"
            color="bg-pink-500"
          />
          <MetricCard
            title="Average Dry Waste"
            value={`${extrapolationData.averageMonthly.dryWaste} kg`}
            subtitle="per household per month"
            icon="🔄"
            color="bg-emerald-500"
          />
          <MetricCard
            title="Average Total Waste"
            value={`${extrapolationData.averageMonthly.totalWaste} kg`}
            subtitle="per household per month"
            icon="📈"
            color="bg-violet-500"
          />
        </div>
      </div>

      {/* Total Monthly Projections */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-semibold mb-4">Total Monthly Community Projections</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
            <div className="text-2xl font-bold mb-1">{extrapolationData.totalMonthly.wetWaste} kg</div>
            <div className="text-blue-100 text-sm">Total Wet Waste</div>
          </div>
          <div className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
            <div className="text-2xl font-bold mb-1">{extrapolationData.totalMonthly.dryWaste} kg</div>
            <div className="text-blue-100 text-sm">Total Dry Waste</div>
          </div>
          <div className="text-center p-4 bg-white bg-opacity-20 rounded-lg">
            <div className="text-2xl font-bold mb-1">{extrapolationData.totalMonthly.totalWaste} kg</div>
            <div className="text-blue-100 text-sm">Total Waste</div>
          </div>
        </div>
      </div>

      {/* Prediction Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Historical vs Predicted */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Waste Generation Forecast
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={predictionData}>
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
                dataKey="historical" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Historical Data"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#EF4444" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Predicted Data"
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Waste Type Prediction */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Waste Type Trends & Predictions
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={predictionData}>
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
              <Area 
                type="monotone" 
                dataKey="wetWaste" 
                stackId="1"
                stroke="#F59E0B" 
                fill="#F59E0B"
                fillOpacity={0.6}
                name="Wet Waste"
              />
              <Area 
                type="monotone" 
                dataKey="dryWaste" 
                stackId="1"
                stroke="#10B981" 
                fill="#10B981"
                fillOpacity={0.6}
                name="Dry Waste"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Analysis & Insights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Key Projections</h4>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-800">6-Month Projection</p>
                  <p className="text-sm text-green-600">
                    Expected total waste: {predictionData.length > 0 
                      ? (predictionData[predictionData.length - 1]?.predicted || 0).toFixed(1) 
                      : 0} kg/month
                  </p>
                </div>
                <span className="text-2xl">📊</span>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-800">Recycling Potential</p>
                  <p className="text-sm text-blue-600">
                    Dry waste accounts for {((extrapolationData.averageMonthly.dryWaste / extrapolationData.averageMonthly.totalWaste) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <span className="text-2xl">♻️</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Recommendations</h4>
            
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-800">
                <strong>Collection Frequency:</strong> Based on current trends, consider adjusting collection schedules to optimize efficiency.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <p className="text-sm text-purple-800">
                <strong>Resource Planning:</strong> Projected monthly waste of {extrapolationData.totalMonthly.totalWaste} kg requires adequate infrastructure planning.
              </p>
            </div>
            
            <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
              <p className="text-sm text-teal-800">
                <strong>Growth Monitoring:</strong> Track actual vs. predicted values to refine forecasting accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}