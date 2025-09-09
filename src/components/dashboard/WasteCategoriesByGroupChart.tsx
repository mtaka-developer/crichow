"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GroupAnalysisData } from '@/types/data';
import { useMemo } from 'react';

interface WasteCategoriesByGroupChartProps {
  data: GroupAnalysisData[];
}

const MATERIAL_COLORS = {
  HDPE: '#2563eb',    // Blue
  PET: '#16a34a',     // Green
  PP: '#9333ea',      // Purple
  PAPER: '#ea580c',   // Orange
  METAL: '#059669',   // Emerald
  GLASS: '#4338ca'    // Indigo
};

export default function WasteCategoriesByGroupChart({ data }: WasteCategoriesByGroupChartProps) {
  const chartData = useMemo(() => {
    // Use real data
    const result = data.map(group => ({
      groupName: group.groupName,
      HDPE: group.hdpe,
      PET: group.pet,
      PP: group.pp,
      PAPER: group.paper,
      METAL: group.metal,
      GLASS: group.glass,
      totalRecyclable: group.hdpe + group.pet + group.pp + group.paper + group.metal + group.glass
    }));
    console.log('WasteCategoriesByGroupChart real data:', result.slice(0, 3));
    return result;
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: { 
    active?: boolean; 
    payload?: Array<{ color: string; dataKey: string; value: number }>; 
    label?: string 
  }) => {
    if (!active || !payload || payload.length === 0) return null;
    
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold font-poppins text-gray-900 mb-2">
          {label}
        </p>
        <div className="space-y-1">
          {payload
            .filter(entry => entry.value > 0)
            .map((entry, index) => (
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
          {total > 0 && (
            <div className="pt-1 mt-1 border-t border-gray-200">
              <div className="flex items-center justify-between space-x-4">
                <span className="text-sm font-poppins text-gray-800">
                  Total Recyclable:
                </span>
                <span className="text-sm font-bold font-poppins text-gray-900">
                  {total.toFixed(1)} kg
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-96">
      <h4 className="text-lg font-bold text-gray-800 mb-4 font-poppins">
        Waste Categories by Group (kg)
      </h4>

      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p className="font-poppins">
            No data available for the selected filters
          </p>
        </div>
      ) : (
        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 80,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="groupName"
                fontSize={10}
                stroke="#374151"
                tick={{ fontFamily: "Poppins, sans-serif" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                fontSize={12}
                stroke="#374151"
                tick={{ fontFamily: "Poppins, sans-serif" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              
              <Bar
                dataKey="HDPE"
                stackId="a"
                fill={MATERIAL_COLORS.HDPE}
                name="HDPE"
              />
              <Bar
                dataKey="PET"
                stackId="a"
                fill={MATERIAL_COLORS.PET}
                name="PET"
              />
              <Bar
                dataKey="PP"
                stackId="a"
                fill={MATERIAL_COLORS.PP}
                name="PP"
              />
              <Bar
                dataKey="PAPER"
                stackId="a"
                fill={MATERIAL_COLORS.PAPER}
                name="PAPER"
              />
              <Bar
                dataKey="METAL"
                stackId="a"
                fill={MATERIAL_COLORS.METAL}
                name="METAL"
              />
              <Bar
                dataKey="GLASS"
                stackId="a"
                fill={MATERIAL_COLORS.GLASS}
                name="GLASS"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}