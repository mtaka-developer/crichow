"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GroupAnalysisData } from '@/types/data';
import { useMemo } from 'react';

interface DryWetWasteByGroupChartProps {
  data: GroupAnalysisData[];
}

export default function DryWetWasteByGroupChart({ data }: DryWetWasteByGroupChartProps) {
  const chartData = useMemo(() => {
    // Data is already sorted by total weight (highest first) from the utility function
    return data.map(group => ({
      groupName: group.groupName,
      'Wet Waste': group.totalWetWaste,
      'Dry Waste': group.totalDryWaste,
      totalWeight: group.totalWeight
    }));
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: { 
    active?: boolean; 
    payload?: Array<{ color: string; dataKey: string; value: number }>; 
    label?: string 
  }) => {
    if (!active || !payload || payload.length === 0) return null;
    
    const wetWaste = payload.find(p => p.dataKey === 'Wet Waste')?.value || 0;
    const dryWaste = payload.find(p => p.dataKey === 'Dry Waste')?.value || 0;
    const total = wetWaste + dryWaste;
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold font-anton text-gray-900 mb-2">
          {label}
        </p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-poppins text-gray-700">
                  {entry.dataKey}:
                </span>
              </div>
              <span className="text-sm font-semibold font-poppins">
                {entry.value.toFixed(1)} kg
              </span>
            </div>
          ))}
          <div className="pt-1 mt-1 border-t border-gray-200">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm font-poppins text-gray-700">
                Total:
              </span>
              <span className="text-sm font-bold font-anton text-gray-900">
                {total.toFixed(1)} kg
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h4 className="text-xl font-semibold text-gray-900 mb-4 font-anton">
        Dry and Wet Waste by Group (kg)
      </h4>
      
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p className="font-poppins">No data available for the selected filters</p>
        </div>
      ) : (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="horizontal"
              margin={{
                top: 20,
                right: 30,
                left: 80,
                bottom: 20
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                type="number"
                fontSize={12}
                stroke="#6b7280"
                domain={[0, 'dataMax']}
              />
              <YAxis 
                type="category"
                dataKey="groupName"
                fontSize={12}
                stroke="#6b7280"
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '20px', 
                  fontSize: '12px' 
                }}
              />
              
              <Bar
                dataKey="Wet Waste"
                stackId="waste"
                fill="#2563eb" // Blue for wet waste
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="Dry Waste"
                stackId="waste"
                fill="#dc2626" // Red for dry waste
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600 font-poppins">
        <p>
          Groups are sorted by total waste collected (highest to lowest). 
          Each bar shows the breakdown of wet and dry waste collection.
        </p>
      </div>
    </div>
  );
}