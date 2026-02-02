'use client';

import { useEffect, useState } from 'react';
import { 
  BarChart3, TrendingUp, Eye, Users,
  Clock, Activity, LogOut, RefreshCw, Smartphone, Monitor, UserCheck,
  ArrowUp, ArrowDown, Minus, Target, Zap, Award, TrendingDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Stats {
  visitors: {
    today: number;
    yesterday: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    allTime: number;
    returning: number;
    returningRate: number;
  };
  views: {
    today: number;
    yesterday: number;
    allTime: number;
  };
  activeNow: number; // Şu an online
  avgPagesPerVisitor: number;
  topPages: Array<{ path: string; count: number }>;
  last30Days: Array<{ date: string; visitors: number; views: number }>;
  topCountries: Array<{ country: string; count: number }>;
  deviceStats: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
}

type TimeRange = '7days' | '30days' | '90days';
type ViewMode = 'visitors' | 'views' | 'both';

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [timeRange, setTimeRange] = useState<TimeRange>('30days');
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const router = useRouter();

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    if (autoRefresh) {
      const interval = setInterval(fetchStats, 10000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleLogout = async () => {
    await fetch('/api/stats/auth', { method: 'DELETE' });
    router.push('/stats/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-blue-400 animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl">Veriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Veri yüklenemedi</div>
      </div>
    );
  }

  // Filter data based on time range
  const getFilteredData = () => {
    const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
    return stats.last30Days.slice(-days);
  };

  const filteredData = getFilteredData();
  const maxVisitors = Math.max(...filteredData.map(d => d.visitors), 1);
  const maxViews = Math.max(...filteredData.map(d => d.views), 1);
  
  // Growth calculations
  const todayGrowth = stats.visitors.yesterday > 0 
    ? (((stats.visitors.today - stats.visitors.yesterday) / stats.visitors.yesterday) * 100)
    : 0;
  
  const weekGrowth = stats.visitors.thisWeek > 0 && stats.visitors.yesterday > 0
    ? (((stats.visitors.thisWeek - stats.visitors.yesterday * 7) / (stats.visitors.yesterday * 7)) * 100)
    : 0;

  const monthGrowth = stats.visitors.thisMonth > 0 && stats.visitors.yesterday > 0
    ? (((stats.visitors.thisMonth - stats.visitors.yesterday * 30) / (stats.visitors.yesterday * 30)) * 100)
    : 0;

  // Calculate averages
  const avgDailyVisitors = filteredData.length > 0 
    ? Math.round(filteredData.reduce((sum, d) => sum + d.visitors, 0) / filteredData.length)
    : 0;

  // Peak day
  const peakDay = filteredData.reduce((max, day) => 
    day.visitors > max.visitors ? day : max, 
    filteredData[0] || { date: '', visitors: 0, views: 0 }
  );

  // Total devices
  const totalDevices = stats.deviceStats.mobile + stats.deviceStats.desktop + stats.deviceStats.tablet;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              Analytics Dashboard
            </h1>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <p className="text-blue-200 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {lastUpdate.toLocaleTimeString('tr-TR')}
              </p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-blue-200">{autoRefresh ? 'Otomatik' : 'Manuel'}</span>
              </div>
              {/* Live Users */}
              <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-green-200 font-semibold">{stats.activeNow} kişi online</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all border ${
                autoRefresh 
                  ? 'bg-green-500/20 border-green-500/30 text-green-200' 
                  : 'bg-white/10 border-white/20 text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              {autoRefresh ? 'Otomatik Açık' : 'Otomatik Kapalı'}
            </button>
            <button
              onClick={fetchStats}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all border border-white/20"
            >
              <RefreshCw className="w-4 h-4" />
              Yenile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg transition-all border border-red-500/30"
            >
              <LogOut className="w-4 h-4" />
              Çıkış
            </button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<Users className="w-6 h-6" />}
            title="Bugün Ziyaretçi"
            value={stats.visitors.today.toLocaleString()}
            growth={todayGrowth}
            subtitle="dün'e göre"
            color="blue"
          />
          <StatCard
            icon={<Eye className="w-6 h-6" />}
            title="Bugün Görüntüleme"
            value={stats.views.today.toLocaleString()}
            growth={stats.views.yesterday > 0 ? (((stats.views.today - stats.views.yesterday) / stats.views.yesterday) * 100) : 0}
            subtitle="dün'e göre"
            color="purple"
          />
          <StatCard
            icon={<UserCheck className="w-6 h-6" />}
            title="Returning Rate"
            value={`${stats.visitors.returningRate.toFixed(1)}%`}
            subtitle={`${stats.visitors.returning.toLocaleString()} returning`}
            color="green"
            showGrowth={false}
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            title="Sayfa/Ziyaretçi"
            value={stats.avgPagesPerVisitor.toFixed(1)}
            subtitle="ortalama engagement"
            color="orange"
            showGrowth={false}
          />
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          <QuickStat label="Dün" value={stats.visitors.yesterday} />
          <QuickStat label="Bu Hafta" value={stats.visitors.thisWeek} growth={weekGrowth} />
          <QuickStat label="Bu Ay" value={stats.visitors.thisMonth} growth={monthGrowth} />
          <QuickStat label="Bu Yıl" value={stats.visitors.thisYear} />
          <QuickStat label="Ortalama/Gün" value={avgDailyVisitors} highlight />
          <QuickStat label="Toplam" value={stats.visitors.allTime} highlight />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Trend Chart */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Trend Analizi</h2>
                  <p className="text-sm text-blue-200">
                    Ortalama: {avgDailyVisitors.toLocaleString()} ziyaretçi/gün
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeRange('7days')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    timeRange === '7days'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-blue-200 hover:bg-white/20'
                  }`}
                >
                  7 Gün
                </button>
                <button
                  onClick={() => setTimeRange('30days')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    timeRange === '30days'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-blue-200 hover:bg-white/20'
                  }`}
                >
                  30 Gün
                </button>
                <button
                  onClick={() => setTimeRange('90days')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    timeRange === '90days'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-blue-200 hover:bg-white/20'
                  }`}
                >
                  90 Gün
                </button>
              </div>
            </div>
            
            {/* Peak Day Info */}
            {peakDay && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-yellow-200">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    En Yüksek: {new Date(peakDay.date).toLocaleDateString('tr-TR')} - {peakDay.visitors.toLocaleString()} ziyaretçi
                  </span>
                </div>
              </div>
            )}
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto custom-scrollbar">
              {filteredData.map((day, index) => {
                const isToday = index === filteredData.length - 1;
                const isPeak = day.visitors === peakDay?.visitors;
                return (
                  <div key={day.date} className={`flex items-center gap-3 ${isToday ? 'bg-blue-500/10 rounded-lg p-2' : ''}`}>
                    <span className={`text-xs w-20 font-medium ${isToday ? 'text-blue-300' : 'text-blue-200'}`}>
                      {new Date(day.date).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' })}
                    </span>
                    <div className="flex-1 flex gap-1.5">
                      {(viewMode === 'visitors' || viewMode === 'both') && (
                        <div className="flex-1 bg-white/5 rounded-full h-7 overflow-hidden relative group">
                          <div
                            className={`h-full rounded-full flex items-center justify-end pr-2 transition-all ${
                              isPeak 
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                            }`}
                            style={{ width: `${Math.max((day.visitors / maxVisitors) * 100, 5)}%` }}
                          >
                            <span className="text-xs text-white font-bold">{day.visitors}</span>
                          </div>
                        </div>
                      )}
                      {(viewMode === 'views' || viewMode === 'both') && (
                        <div className="flex-1 bg-white/5 rounded-full h-7 overflow-hidden relative group">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${Math.max((day.views / maxViews) * 100, 5)}%` }}
                          >
                            <span className="text-xs text-white font-bold">{day.views}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4 text-sm">
                {(viewMode === 'visitors' || viewMode === 'both') && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <span className="text-blue-200">Ziyaretçi</span>
                  </div>
                )}
                {(viewMode === 'views' || viewMode === 'both') && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <span className="text-blue-200">Görüntüleme</span>
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode('both')}
                  className={`px-2 py-1 rounded text-xs ${viewMode === 'both' ? 'bg-white/20 text-white' : 'text-blue-300'}`}
                >
                  İkisi
                </button>
                <button
                  onClick={() => setViewMode('visitors')}
                  className={`px-2 py-1 rounded text-xs ${viewMode === 'visitors' ? 'bg-white/20 text-white' : 'text-blue-300'}`}
                >
                  Ziyaretçi
                </button>
                <button
                  onClick={() => setViewMode('views')}
                  className={`px-2 py-1 rounded text-xs ${viewMode === 'views' ? 'bg-white/20 text-white' : 'text-blue-300'}`}
                >
                  Görüntüleme
                </button>
              </div>
            </div>
          </div>

          {/* Device Stats */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-purple-400" />
              Cihaz Dağılımı
            </h2>
            <div className="space-y-4">
              <DeviceBar
                icon={<Smartphone className="w-5 h-5" />}
                label="Mobil"
                count={stats.deviceStats.mobile}
                total={stats.deviceStats.mobile + stats.deviceStats.desktop + stats.deviceStats.tablet}
                color="from-blue-500 to-cyan-500"
              />
              <DeviceBar
                icon={<Monitor className="w-5 h-5" />}
                label="Masaüstü"
                count={stats.deviceStats.desktop}
                total={stats.deviceStats.mobile + stats.deviceStats.desktop + stats.deviceStats.tablet}
                color="from-purple-500 to-pink-500"
              />
              <DeviceBar
                icon={<Smartphone className="w-5 h-5" />}
                label="Tablet"
                count={stats.deviceStats.tablet}
                total={stats.deviceStats.mobile + stats.deviceStats.desktop + stats.deviceStats.tablet}
                color="from-orange-500 to-red-500"
              />
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              🔥 En Popüler Sayfalar
            </h2>
            <div className="space-y-3">
              {stats.topPages.slice(0, 10).map((page, index) => (
                <div key={page.path} className="flex items-center gap-3 group hover:bg-white/5 p-2 rounded-lg transition-all">
                  <span className={`text-xl font-bold w-8 ${
                    index === 0 ? 'text-yellow-400' : 
                    index === 1 ? 'text-gray-300' : 
                    index === 2 ? 'text-orange-400' : 
                    'text-blue-400'
                  }`}>
                    #{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate text-sm">{page.path}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all"
                          style={{ width: `${(page.count / stats.topPages[0].count) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-blue-200 font-semibold w-12 text-right">{page.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              🌍 Ülke Dağılımı
            </h2>
            <div className="space-y-3">
              {stats.topCountries.slice(0, 10).map((country, index) => {
                const percentage = totalDevices > 0 
                  ? ((country.count / stats.topCountries.reduce((sum, c) => sum + c.count, 0)) * 100).toFixed(1)
                  : '0';
                return (
                  <div key={country.country} className="hover:bg-white/5 p-2 rounded-lg transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold w-6 ${
                          index === 0 ? 'text-yellow-400' : 
                          index === 1 ? 'text-gray-300' : 
                          index === 2 ? 'text-orange-400' : 
                          'text-blue-400'
                        }`}>
                          #{index + 1}
                        </span>
                        <span className="text-white font-medium">{country.country}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-semibold">{country.count.toLocaleString()}</span>
                        <span className="text-blue-300 text-xs ml-2">{percentage}%</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-full h-1.5 overflow-hidden ml-9">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, color, growth, showGrowth = true }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  growth?: number;
  showGrowth?: boolean;
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
  };

  const isPositive = growth && growth > 0;
  const isNegative = growth && growth < 0;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <h3 className="text-blue-200 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <div className="flex items-center gap-2">
        {showGrowth && growth !== undefined && (
          <span className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-400'
          }`}>
            {isPositive && <ArrowUp className="w-3 h-3" />}
            {isNegative && <ArrowDown className="w-3 h-3" />}
            {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
            {Math.abs(growth).toFixed(1)}%
          </span>
        )}
        {subtitle && <p className="text-sm text-blue-300">{subtitle}</p>}
      </div>
    </div>
  );
}

function QuickStat({ label, value, growth, highlight }: {
  label: string;
  value: number;
  growth?: number;
  highlight?: boolean;
}) {
  const isPositive = growth && growth > 0;
  const isNegative = growth && growth < 0;

  return (
    <div className={`bg-white/10 backdrop-blur-xl rounded-xl p-3 border ${
      highlight ? 'border-blue-400 bg-blue-500/10' : 'border-white/20'
    } hover:border-white/30 transition-all`}>
      <p className="text-blue-200 text-xs mb-1">{label}</p>
      <p className={`text-xl font-bold ${highlight ? 'text-blue-400' : 'text-white'}`}>
        {value.toLocaleString()}
      </p>
      {growth !== undefined && (
        <div className={`flex items-center gap-1 text-xs mt-1 ${
          isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-400'
        }`}>
          {isPositive && <TrendingUp className="w-3 h-3" />}
          {isNegative && <TrendingDown className="w-3 h-3" />}
          {Math.abs(growth).toFixed(1)}%
        </div>
      )}
    </div>
  );
}

function DeviceBar({ icon, label, count, total, color }: {
  icon: React.ReactNode;
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-white">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <span className="text-blue-200 font-semibold">{percentage}%</span>
      </div>
      <div className="bg-white/10 rounded-full h-3 overflow-hidden">
        <div
          className={`bg-gradient-to-r ${color} h-full rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-blue-300 mt-1">{count.toLocaleString()} ziyaret</p>
    </div>
  );
}
