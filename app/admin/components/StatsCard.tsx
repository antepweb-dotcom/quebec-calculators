'use client';

import { TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: string;
  color: 'green' | 'blue' | 'purple' | 'orange';
}

const colorClasses = {
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    trend: 'text-green-600'
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    trend: 'text-blue-600'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    trend: 'text-purple-600'
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    trend: 'text-orange-600'
  }
};

export default function StatsCard({ title, value, subtitle, icon, trend, color }: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${colors.bg} rounded-lg`}>
          <div className={colors.text}>{icon}</div>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${colors.trend} text-sm font-medium`}>
            <TrendingUp className="w-4 h-4" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{subtitle}</p>
    </div>
  );
}
