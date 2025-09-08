"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CleanedDataRecord } from '@/types/data';
import { useMemo } from 'react';

interface TotalWeightChartProps {
  data: CleanedDataRecord[];
}

interface ChartDataPoint {
  month: string;
  totalWeight: number;
}

export default function TotalWeightChart({ data }: TotalWeightChartProps) {
  const chartData = useMemo(() => {
    // Group data by month
    const monthlyData: Record<string, ChartDataPoint> = {};
    
    data.forEach(record => {
      const monthKey = `${record.date.getFullYear()}-${(record.date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          totalWeight: 0
        };
      }
      
      // Add both wet waste and dry waste for total weight
      monthlyData[monthKey].totalWeight += record.wetWaste + record.dryWaste;
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
    payload?: Array<{ value: number }>; 
    label?: string 
  }) => {
    if (!active || !payload || payload.length === 0) return null;
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold font-poppins text-gray-900 mb-2">
          {label ? formatXAxisLabel(label) : ''}
        </p>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full bg-mtaka-green"
            />
            <span className="text-sm font-poppins text-gray-700">
              Total Weight:
            </span>
          </div>
          <span className="text-sm font-semibold font-poppins">
            {payload[0].value.toFixed(1)} kg
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p className="font-poppins">No data available for the selected filters</p>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 40,
                bottom: 80
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="month"
                tickFormatter={formatXAxisLabel}
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={11}
                stroke="#6b7280"
                interval="preserveStartEnd"
                tick={{ fontFamily: 'Poppins, sans-serif' }}
              />
              <YAxis 
                fontSize={11}
                stroke="#6b7280"
                tick={{ fontFamily: 'Poppins, sans-serif' }}
                label={{ 
                  value: 'Total Weight (kg)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fontFamily: 'Poppins, sans-serif', fontSize: '12px' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              <Line
                type="monotone"
                dataKey="totalWeight"
                stroke="#059669" // mtaka-green
                strokeWidth={2}
                dot={{ fill: '#059669', strokeWidth: 1, r: 3 }}
                activeDot={{ r: 5, stroke: '#059669', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600 font-poppins">
        <p>
          Combined weight of wet waste and dry waste materials collected over time.
        </p>
      </div>
    </div>
  );
}