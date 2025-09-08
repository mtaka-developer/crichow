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
    // Data is already sorted by total weight from the utility function
    return data.map(group => ({
      groupName: group.groupName,
      HDPE: group.hdpe,
      PET: group.pet,
      PP: group.pp,
      PAPER: group.paper,
      METAL: group.metal,
      GLASS: group.glass,
      totalRecyclable: group.hdpe + group.pet + group.pp + group.paper + group.metal + group.glass
    }));
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
                  <span className="text-sm font-poppins text-gray-700">
                    {entry.dataKey}:
                  </span>
                </div>
                <span className="text-sm font-semibold font-poppins">
                  {entry.value.toFixed(1)} kg
                </span>
              </div>
            ))}
          {total > 0 && (
            <div className="pt-1 mt-1 border-t border-gray-200">
              <div className="flex items-center justify-between space-x-4">
                <span className="text-sm font-poppins text-gray-700">
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
    <div>
      <h4 className="text-lg font-bold text-gray-800 mb-4 font-poppins">
        Waste Categories by Group (kg)
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
                top: 10,
                right: 20,
                left: 100,
                bottom: 10
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                type="number"
                fontSize={11}
                stroke="#6b7280"
                domain={[0, 'dataMax']}
                tick={{ fontFamily: 'Poppins, sans-serif' }}
              />
              <YAxis 
                type="category"
                dataKey="groupName"
                fontSize={11}
                stroke="#6b7280"
                width={90}
                tick={{ fontFamily: 'Poppins, sans-serif' }}
                interval={0}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '15px', 
                  fontSize: '11px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
              
              <Bar
                dataKey="HDPE"
                stackId="recyclable"
                fill={MATERIAL_COLORS.HDPE}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="PET"
                stackId="recyclable"
                fill={MATERIAL_COLORS.PET}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="PP"
                stackId="recyclable"
                fill={MATERIAL_COLORS.PP}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="PAPER"
                stackId="recyclable"
                fill={MATERIAL_COLORS.PAPER}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="METAL"
                stackId="recyclable"
                fill={MATERIAL_COLORS.METAL}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="GLASS"
                stackId="recyclable"
                fill={MATERIAL_COLORS.GLASS}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600 font-poppins">
        <p>
          Groups maintain the same order as the first chart (sorted by total waste). 
          Each bar shows the breakdown of recyclable materials collected by each group.
        </p>
      </div>
    </div>
  );
}