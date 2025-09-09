"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GroupAnalysisData } from '@/types/data';
import { useMemo } from 'react';

interface DryWetWasteByGroupChartProps {
  data: GroupAnalysisData[];
}

export default function DryWetWasteByGroupChart({ data }: DryWetWasteByGroupChartProps) {
  const chartData = useMemo(() => {
    // Use real data now that we know the chart works
    const result = data.map(group => ({
      groupName: group.groupName,
      wetWaste: group.totalWetWaste,
      dryWaste: group.totalDryWaste,
      totalWeight: group.totalWeight
    }));
    console.log('DryWetWasteByGroupChart real data:', result.slice(0, 3));
    return result;
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: { 
    active?: boolean; 
    payload?: Array<{ color: string; dataKey: string; value: number }>; 
    label?: string 
  }) => {
    if (!active || !payload || payload.length === 0) return null;
    
    const wetWaste = payload.find(p => p.dataKey === 'wetWaste')?.value || 0;
    const dryWaste = payload.find(p => p.dataKey === 'dryWaste')?.value || 0;
    const total = wetWaste + dryWaste;
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold font-poppins text-gray-900 mb-2">
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
                <span className="text-sm font-poppins text-gray-800">
                  {entry.dataKey}:
                </span>
              </div>
              <span className="text-sm font-semibold font-poppins text-gray-900">
                {entry.value.toFixed(1)} kg
              </span>
            </div>
          ))}
          <div className="pt-1 mt-1 border-t border-gray-200">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm font-poppins text-gray-800">
                Total:
              </span>
              <span className="text-sm font-bold font-poppins text-gray-900">
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
      <h4 className="text-lg font-bold text-gray-800 mb-4 font-poppins">
        Dry and Wet Waste by Group (kg)
      </h4>
      
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p className="font-poppins">No data available for the selected filters</p>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 80
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="groupName"
                fontSize={10}
                stroke="#374151"
                tick={{ fontFamily: 'Poppins, sans-serif' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                fontSize={12}
                stroke="#374151"
                tick={{ fontFamily: 'Poppins, sans-serif' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Bar
                dataKey="wetWaste"
                stackId="a"
                fill="#3B82F6"
                name="Wet Waste"
              />
              <Bar
                dataKey="dryWaste"
                stackId="a"
                fill="#EF4444"
                name="Dry Waste"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}