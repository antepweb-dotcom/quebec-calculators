'use client';

import { useEffect, useState } from 'react';
import { Activity, Users, Eye } from 'lucide-react';

interface LiveStatsProps {
  initialActiveUsers?: number;
}

export default function LiveStats({ initialActiveUsers = 0 }: LiveStatsProps) {
  const [activeUsers, setActiveUsers] = useState(initialActiveUsers);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch live stats every 30 seconds
    const fetchLiveStats = async () => {
      try {
        const response = await fetch('/api/admin/live-stats');
        if (response.ok) {
          const data = await response.json();
          setActiveUsers(data.activeUsers || 0);
          setIsLive(true);
          setError(false);
        } else {
          setError(true);
          setIsLive(false);
        }
      } catch (err) {
        console.error('Failed to fetch live stats:', err);
        setError(true);
        setIsLive(false);
      }
    };

    // Initial fetch
    fetchLiveStats();

    // Poll every 30 seconds
    const interval = setInterval(fetchLiveStats, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm border border-green-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-green-900 uppercase tracking-wide">
              Live Now
            </h3>
            <p className="text-xs text-green-700">Real-time active users</p>
          </div>
        </div>
        {isLive && !error && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-700">LIVE</span>
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-green-900">{activeUsers}</span>
        <div className="flex items-center gap-1 text-green-700">
          <Users className="w-5 h-5" />
          <span className="text-sm font-medium">active users</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-green-200">
        <div className="flex items-center justify-between text-xs text-green-700">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>Updates every 30s</span>
          </div>
          {error ? (
            <span className="font-medium text-gray-500">○ Simulated</span>
          ) : isLive ? (
            <span className="font-medium text-green-600">✓ Connected</span>
          ) : (
            <span className="font-medium text-gray-500">○ Loading...</span>
          )}
        </div>
      </div>
    </div>
  );
}

