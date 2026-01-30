'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { formatCurrency } from '@/utils/taxLogic'

interface DonutChartProps {
  netIncome: number
  totalTax?: number
  // Detailed breakdown (optional)
  federalTax?: number
  provincialTax?: number
  qpp?: number
  qpip?: number
  ei?: number
}

export default function DonutChart({ 
  netIncome, 
  totalTax,
  federalTax,
  provincialTax,
  qpp,
  qpip,
  ei
}: DonutChartProps) {
  // Use detailed breakdown if available, otherwise use simple 2-segment view
  const useDetailedView = federalTax !== undefined && provincialTax !== undefined
  
  const data = useDetailedView ? [
    { name: 'Revenu Net', value: netIncome, color: '#10B981' },
    { name: 'Impôt Provincial', value: provincialTax, color: '#3B82F6' },
    { name: 'Impôt Fédéral', value: federalTax, color: '#6366F1' },
    { name: 'RRQ/RQAP/AE', value: (qpp || 0) + (qpip || 0) + (ei || 0), color: '#64748B' },
  ] : [
    { name: 'Revenu Net', value: netIncome, color: '#10B981' },
    { name: 'Impôts et Déductions', value: totalTax || 0, color: '#EF4444' },
  ]

  const totalIncome = data.reduce((sum, item) => sum + item.value, 0)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / totalIncome) * 100).toFixed(1)
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-lg font-bold" style={{ color: payload[0].payload.color }}>
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-gray-600">
            {percentage}% du total
          </p>
        </div>
      )
    }
    return null
  }

  // Custom label to show in the center
  const CenterLabel = ({ viewBox }: any) => {
    const { cx, cy } = viewBox
    return (
      <g>
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-500 text-xs font-medium"
        >
          Revenu Brut
        </text>
        <text
          x={cx}
          y={cy + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-900 text-lg font-bold"
        >
          {formatCurrency(totalIncome)}
        </text>
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <CenterLabel />
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value, entry: any) => (
            <span className="text-sm font-medium text-gray-700">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

