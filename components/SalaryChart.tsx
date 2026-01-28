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
      color: '#eab308',
    },
    {
      name: 'RQAP',
      value: rqap,
      color: '#3b82f6',
    },
    ...(ae > 0 ? [{
      name: 'AE',
      value: ae,
      color: '#8b5cf6',
    }] : []),
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const netPercentage = ((net / total) * 100).toFixed(0)

  // Custom tooltip for hover interactivity
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload
      const percentage = ((item.value / total) * 100).toFixed(1)
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-gray-200 relative z-50">
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
    <div className="relative">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={120}
            paddingAngle={3}
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
                strokeWidth={3}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 100 }} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Enhanced Center Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg border-2 border-emerald-100">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">
              Revenu Net
            </p>
            <p className="text-lg font-extrabold text-emerald-600 mb-0.5">
              {net.toLocaleString('fr-CA', {
                style: 'currency',
                currency: 'CAD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
            <div className="flex items-center justify-center gap-1.5">
              <div className="h-0.5 w-6 bg-emerald-500 rounded-full"></div>
              <p className="text-sm font-bold text-emerald-600">
                {netPercentage}%
              </p>
              <div className="h-0.5 w-6 bg-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

