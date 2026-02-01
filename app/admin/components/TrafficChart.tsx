'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrafficChartProps {
  data: Array<{ date: string; count: number }>;
}

export default function TrafficChart({ data }: TrafficChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Traffic Trend</h3>
        <div className="h-[350px] flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  // Format data for chart
  const chartData = data.map((item, index) => ({
    day: index + 1,
    views: item.count,
    date: new Date(item.date).toLocaleDateString('fr-CA', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Traffic Trend (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px',
              padding: '12px'
            }}
            labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="views" 
            stroke="#3b82f6" 
            strokeWidth={2} 
            name="Page Views"
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
