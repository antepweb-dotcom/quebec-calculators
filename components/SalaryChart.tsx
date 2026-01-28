'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface SalaryChartProps {
  net: number
  impotFederal: number
  impotQuebec: number
  rrq: number
  rqap: number
  ae?: number
}

export default function SalaryChart({
  net,
  impotFederal,
  impotQuebec,
  rrq,
  rqap,
  ae = 0,
}: SalaryChartProps) {
  const data = [
    {
      name: 'Revenu Net',
      value: net,
      color: '#10b981',
    },
    {
      name: 'Impôt Fédéral',
      value: impotFederal,
      color: '#ef4444',
    },
    {
      name: 'Impôt Québec',
      value: impotQuebec,
      color: '#f97316',
    },
    {
      name: 'RRQ',
      value: rrq,
      color: '#64748b',
    },
    {
      name: 'RQAP',
      value: rqap,
      color: '#94a3b8',
    },
    ...(ae > 0 ? [{
      name: 'AE',
      value: ae,
      color: '#cbd5e1',
    }] : []),
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Custom tooltip for hover interactivity
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload
      const percentage = ((item.value / total) * 100).toFixed(1)
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-gray-200">
          <p className="font-bold text-gray-900 mb-1">{item.name}</p>
          <p className="text-2xl font-bold" style={{ color: item.color }}>
            {item.value.toLocaleString('fr-CA', {
              style: 'currency',
              currency: 'CAD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="text-sm text-gray-600 mt-1">{percentage}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={2}
          dataKey="value"
          label={false}
          labelLine={false}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              stroke="white"
              strokeWidth={2}
            />
          ))}
          {/* Center text using SVG */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-600 text-sm font-medium"
            dy="-10"
          >
            Revenu Net
          </text>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-green-600 text-2xl font-bold"
            dy="15"
          >
            {net.toLocaleString('fr-CA', {
              style: 'currency',
              currency: 'CAD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </text>
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )
}
