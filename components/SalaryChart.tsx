'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

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
      description: 'Ce qui reste dans vos poches',
    },
    {
      name: 'Impôt Fédéral',
      value: impotFederal,
      color: '#ef4444',
      description: 'Impôt fédéral',
    },
    {
      name: 'Impôt Québec',
      value: impotQuebec,
      color: '#f97316',
      description: 'Impôt provincial',
    },
    {
      name: 'RRQ',
      value: rrq,
      color: '#64748b',
      description: 'Régime de rentes du Québec',
    },
    {
      name: 'RQAP',
      value: rqap,
      color: '#94a3b8',
      description: 'Régime québécois d\'assurance parentale',
    },
    ...(ae > 0 ? [{
      name: 'AE',
      value: ae,
      color: '#cbd5e1',
      description: 'Assurance-emploi',
    }] : []),
  ]

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-gray-200">
          <p className="font-bold text-gray-900 mb-1">{data.name}</p>
          <p className="text-2xl font-bold mb-1" style={{ color: data.color }}>
            {data.value.toLocaleString('fr-CA', {
              style: 'currency',
              currency: 'CAD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="text-sm text-gray-600">{data.description}</p>
        </div>
      )
    }
    return null
  }

  // Custom legend
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Custom label to show percentage
  const renderLabel = (entry: any) => {
    const percent = ((entry.value / total) * 100).toFixed(1)
    // Only show label if segment is large enough (>5%)
    if (parseFloat(percent) > 5) {
      return `${percent}%`
    }
    return ''
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            label={renderLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center text showing net income */}
      <div className="text-center -mt-64 pointer-events-none">
        <p className="text-sm text-gray-600 font-medium">Revenu Net</p>
        <p className="text-3xl font-bold text-green-600">
          {net.toLocaleString('fr-CA', {
            style: 'currency',
            currency: 'CAD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
    </div>
  )
}
