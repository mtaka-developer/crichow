"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CleanedDataRecord } from '@/types/data';
import { useMemo } from 'react';

interface DryWasteAnalysisChartProps {
  data: CleanedDataRecord[];
  selectedMaterialTypes: string[];
}

interface ChartDataPoint {
  month: string;
  HDPE: number;
  PET: number;
  PP: number;
  Glass: number;
  Paper: number;
  Metal: number;
}

const MATERIAL_COLORS = {
  HDPE: '#2563eb',    // Blue
  PET: '#16a34a',     // Green
  PP: '#9333ea',      // Purple
  Glass: '#4338ca',   // Indigo
  Paper: '#ea580c',   // Orange
  Metal: '#059669'    // Emerald
};

export default function DryWasteAnalysisChart({ data, selectedMaterialTypes }: DryWasteAnalysisChartProps) {
  const chartData = useMemo(() => {
    // Group data by month
    const monthlyData: Record<string, ChartDataPoint> = {};
    
    data.forEach(record => {
      const monthKey = `${record.date.getFullYear()}-${(record.date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          HDPE: 0,
          PET: 0,
          PP: 0,
          Glass: 0,
          Paper: 0,
          Metal: 0
        };
      }
      
      monthlyData[monthKey].HDPE += record.hdpe;
      monthlyData[monthKey].PET += record.pet;
      monthlyData[monthKey].PP += record.pp;
      monthlyData[monthKey].Glass += record.glass;
      monthlyData[monthKey].Paper += record.paperWaste;
      monthlyData[monthKey].Metal += record.metal;
    });
    
    // Convert to array and sort by month
    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  }, [data]);

  const formatXAxisLabel = (value: string) => {
    const [year, month] = value.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const CustomTooltip = ({ active, payload, label }: { 
    active?: boolean; 
    payload?: Array<{ color: string; dataKey: string; value: number }>; 
    label?: string 
  }) => {
    if (!active || !payload || payload.length === 0) return null;
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold font-poppins text-gray-900 mb-2">
          {label ? formatXAxisLabel(label) : ''}
        </p>
        <div className="space-y-1">
          {payload.map((entry: { color: string; dataKey: string; value: number }, index: number) => (
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
        </div>
      </div>
    );
  };

  return (
    <div className="h-96">
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p className="font-poppins">
            No data available for the selected filters
          </p>
        </div>
      ) : (
        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis
                dataKey="month"
                tickFormatter={formatXAxisLabel}
                angle={0}
                textAnchor="middle"
                height={80}
                fontSize={11}
                stroke="#6b7280"
                interval="preserveStartEnd"
                tick={{ fontFamily: "Poppins, sans-serif" }}
              />
              <YAxis
                fontSize={11}
                stroke="#6b7280"
                tick={{ fontFamily: "Poppins, sans-serif" }}
                label={{
                  value: "Quantity (kg)",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    textAnchor: "middle",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "12px",
                  },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: "0px",
                  fontSize: "11px",
                  fontFamily: "Poppins, sans-serif",
                }}
              />
              
              {selectedMaterialTypes.includes("HDPE") && (
                <Line
                  type="monotone"
                  dataKey="HDPE"
                  stroke={MATERIAL_COLORS.HDPE}
                  strokeWidth={2}
                  dot={{ fill: MATERIAL_COLORS.HDPE, strokeWidth: 1, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
              
              {selectedMaterialTypes.includes("PET") && (
                <Line
                  type="monotone"
                  dataKey="PET"
                  stroke={MATERIAL_COLORS.PET}
                  strokeWidth={2}
                  dot={{ fill: MATERIAL_COLORS.PET, strokeWidth: 1, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
              
              {selectedMaterialTypes.includes("PP") && (
                <Line
                  type="monotone"
                  dataKey="PP"
                  stroke={MATERIAL_COLORS.PP}
                  strokeWidth={2}
                  dot={{ fill: MATERIAL_COLORS.PP, strokeWidth: 1, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
              
              {selectedMaterialTypes.includes("Glass") && (
                <Line
                  type="monotone"
                  dataKey="Glass"
                  stroke={MATERIAL_COLORS.Glass}
                  strokeWidth={2}
                  dot={{ fill: MATERIAL_COLORS.Glass, strokeWidth: 1, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
              
              {selectedMaterialTypes.includes("Paper") && (
                <Line
                  type="monotone"
                  dataKey="Paper"
                  stroke={MATERIAL_COLORS.Paper}
                  strokeWidth={2}
                  dot={{ fill: MATERIAL_COLORS.Paper, strokeWidth: 1, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
              
              {selectedMaterialTypes.includes("Metal") && (
                <Line
                  type="monotone"
                  dataKey="Metal"
                  stroke={MATERIAL_COLORS.Metal}
                  strokeWidth={2}
                  dot={{ fill: MATERIAL_COLORS.Metal, strokeWidth: 1, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}