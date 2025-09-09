"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { GroupAnalysisData } from '@/types/data';
import { useMemo } from 'react';

interface GroupTotalWeightDonutChartProps {
  data: GroupAnalysisData[];
}

// Generate distinct colors for each group
const generateColors = (count: number): string[] => {
  const colors = [
    '#2563eb', // Blue
    '#dc2626', // Red
    '#059669', // Green
    '#ea580c', // Orange
    '#7c3aed', // Purple
    '#0891b2', // Cyan
    '#be123c', // Rose
    '#365314', // Lime
    '#1e40af', // Blue-700
    '#b91c1c', // Red-700
    '#047857', // Emerald-700
    '#c2410c', // Orange-700
    '#6d28d9', // Violet-700
    '#0e7490', // Cyan-700
    '#be185d', // Pink-700
    '#166534'  // Green-700
  ];
  
  // If we need more colors, generate additional ones
  while (colors.length < count) {
    const hue = (colors.length * 137.5) % 360; // Golden angle for good distribution
    colors.push(`hsl(${hue}, 60%, 45%)`);
  }
  
  return colors.slice(0, count);
};

export default function GroupTotalWeightDonutChart({ data }: GroupTotalWeightDonutChartProps) {
  const chartData = useMemo(() => {
    const totalWeight = data.reduce((sum, group) => sum + group.totalWeight, 0);
    
    return data.map((group, index) => ({
      name: group.groupName,
      value: group.totalWeight,
      percentage: totalWeight > 0 ? ((group.totalWeight / totalWeight) * 100) : 0,
      fill: generateColors(data.length)[index]
    }));
  }, [data]);

  const CustomTooltip = ({ active, payload }: { 
    active?: boolean; 
    payload?: Array<{ payload: { name: string; value: number; percentage: number } }>; 
  }) => {
    if (!active || !payload || payload.length === 0) return null;
    
    const data = payload[0].payload;
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold font-poppins text-gray-900 mb-2">
          {data.name}
        </p>
        <div className="space-y-1">
          <div className="flex items-center justify-between space-x-4">
            <span className="text-sm font-poppins text-gray-800">
              Total Weight:
            </span>
            <span className="text-sm font-semibold font-poppins text-gray-900">
              {data.value.toFixed(1)} kg
            </span>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-sm font-poppins text-gray-800">
              Percentage:
            </span>
            <span className="text-sm font-semibold font-poppins text-gray-900">
              {data.percentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    );
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { 
    cx?: number; 
    cy?: number; 
    midAngle?: number; 
    innerRadius?: number; 
    outerRadius?: number; 
    percent?: number 
  }) => {
    // Check if all required props are available
    if (cx === undefined || cy === undefined || midAngle === undefined || 
        innerRadius === undefined || outerRadius === undefined || percent === undefined) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Only show percentage labels for slices > 5%
    if (percent < 0.05) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <h4 className="text-lg font-bold text-gray-800 mb-4 font-poppins">
        Group by Total Weight
      </h4>
      
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p className="font-poppins">No data available for the selected filters</p>
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={100}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                stroke="#fff"
                strokeWidth={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  fontSize: '11px',
                  paddingTop: '15px',
                  fontFamily: 'Poppins, sans-serif'
                }}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}