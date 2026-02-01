'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, DollarSign, Bell, Settings, BarChart3, 
  Users, MousePointerClick, Eye,
  Calendar, Globe, Smartphone, Monitor, RefreshCw
} from 'lucide-react';
import LogoutButton from './LogoutButton';
import StatsCard from '@/app/admin/components/StatsCard';
import TrafficChart from '@/app/admin/components/TrafficChart';
import TopPagesTable from '@/app/admin/components/TopPagesTable';
import AdsManager from '@/app/admin/components/AdsManager';
import AlertManager from '@/app/admin/components/AlertManager';

type Tab = 'overview' | 'analytics' | 'ads' | 'alerts' | 'settings';

// Helper function to get country flag emoji
function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    'CA': '🇨🇦', 'US': '🇺🇸', 'FR': '🇫🇷', 'GB': '🇬🇧', 'DE': '🇩🇪',
    'ES': '🇪🇸', 'IT': '🇮🇹', 'JP': '🇯🇵', 'CN': '🇨🇳', 'IN': '🇮🇳',
    'BR': '🇧🇷', 'MX': '🇲🇽', 'AU': '🇦🇺', 'NL': '🇳🇱', 'BE': '🇧🇪',
    'CH': '🇨🇭', 'SE': '🇸🇪', 'NO': '🇳🇴', 'DK': '🇩🇰', 'FI': '🇫🇮'
  };
  return flags[countryCode] || '🌍';
}

// Mock data for now (until database is set up)
const mockStats = {
  totalViews: 49820,
  recentViews: 38640,
  uniqueVisitors: 1542,
  topPages: [
    { path: '/salaire-net-quebec', count: 8420 },
    { path: '/calcul-hypotheque', count: 7850 },
    { path: '/tps-tvq-quebec', count: 5240 },
    { path: '/capacite-emprunt', count: 4680 },
    { path: '/pret-auto', count: 3920 }
  ],
  dailyViews: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    count: Math.floor(1200 + Math.random() * 1500)
  })),
  totalAdClicks: 928,
  adClicksBySlot: [
    { slot: 'header', count: 342 },
    { slot: 'sidebar', count: 286 },
    { slot: 'in-article', count: 300 }
  ],
  ctr: 2.4,
  estimatedRevenue: 464.00,
  topReferrers: [
    { referrer: 'google.com', count: 1250 },
    { referrer: 'facebook.com', count: 420 },
    { referrer: 'direct', count: 850 }
  ],
  deviceBreakdown: [
    { device: 'desktop', count: 21252 },
    { device: 'mobile', count: 17388 }
  ],
  countryBreakdown: [
    { country: 'CA', count: 35420 },
    { country: 'US', count: 8240 },
    { country: 'FR', count: 4180 }
  ],
  dataSource: 'memory'
};

const mockSettings = {
  id: 1,
  adsEnabled: true,
  adSenseId: 'ca-pub-XXXXXXXXXXXXXXXX',
  alertActive: false,
  alertMessage: '',
  alertType: 'info' as const,
  updatedAt: new Date().toISOString()
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [stats, setStats] = useState(mockStats);
  const [settings, setSettings] = useState(mockSettings);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLastUpdate(new Date());
  }, []);

  // Load data
  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch real analytics data
      const analyticsResponse = await fetch('/api/admin/analytics', {
        cache: 'no-store'
      });
      const analyticsResult = await analyticsResponse.json();
      
      // Fetch real settings data
      const settingsResponse = await fetch('/api/admin/settings', {
        cache: 'no-store'
      });
      const settingsResult = await settingsResponse.json();
      
      setStats(analyticsResult.data);
      setSettings({
        id: 1,
        adsEnabled: settingsResult.data.ads.isEnabled,
        adSenseId: settingsResult.data.ads.googleAdSenseId,
        alertActive: settingsResult.data.alert.isActive,
        alertMessage: settingsResult.data.alert.message,
        alertType: settingsResult.data.alert.type,
        updatedAt: new Date().toISOString()
      });
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      // Keep mock data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-2 text-slate-100">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">$</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">Admin Panel</h1>
              <p className="text-xs text-slate-400">QCFinance.ca</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          {/* Home Link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-4 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 transition-colors border border-slate-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-medium">View Site</span>
            <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'overview' 
                ? 'bg-slate-700 text-white' 
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Overview</span>
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'analytics' 
                ? 'bg-slate-700 text-white' 
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Analytics</span>
          </button>
          
          <button
            onClick={() => setActiveTab('ads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'ads' 
                ? 'bg-slate-700 text-white' 
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span className="font-medium">Ads Manager</span>
          </button>
          
          <button
            onClick={() => setActiveTab('alerts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'alerts' 
                ? 'bg-slate-700 text-white' 
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="font-medium">Alerts</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'settings' 
                ? 'bg-slate-700 text-white' 
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <div className="text-xs text-slate-500 mb-3 text-center">
            {mounted && lastUpdate ? `Last update: ${lastUpdate.toLocaleTimeString()}` : 'Loading...'}
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {activeTab === 'overview' && 'Overview 💸'}
                {activeTab === 'analytics' && 'Analytics 📊'}
                {activeTab === 'ads' && 'Ads Manager 📢'}
                {activeTab === 'alerts' && 'Alert Banner 🚨'}
                {activeTab === 'settings' && 'Settings ⚙️'}
              </h2>
              <p className="text-gray-600 mt-1">
                {activeTab === 'overview' && 'Real-time dashboard overview'}
                {activeTab === 'analytics' && 'Detailed traffic and user analytics'}
                {activeTab === 'ads' && 'Manage advertising configuration'}
                {activeTab === 'alerts' && 'Configure site-wide alert banner'}
                {activeTab === 'settings' && 'System configuration'}
              </p>
            </div>
            <button
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Estimated Revenue"
                  value={`$${stats.estimatedRevenue.toFixed(2)}`}
                  subtitle="Last 30 days"
                  icon={<DollarSign className="w-6 h-6" />}
                  trend="+12%"
                  color="green"
                />
                <StatsCard
                  title="Total Page Views"
                  value={stats.totalViews.toLocaleString()}
                  subtitle="All time"
                  icon={<Eye className="w-6 h-6" />}
                  color="blue"
                />
                <StatsCard
                  title="Ad Clicks"
                  value={stats.totalAdClicks.toLocaleString()}
                  subtitle={`CTR: ${stats.ctr}%`}
                  icon={<MousePointerClick className="w-6 h-6" />}
                  color="purple"
                />
                <StatsCard
                  title="Unique Visitors"
                  value={stats.uniqueVisitors.toLocaleString()}
                  subtitle="Last 30 days"
                  icon={<Users className="w-6 h-6" />}
                  color="orange"
                />
              </div>

              {/* Traffic Chart */}
              <TrafficChart data={stats.dailyViews} />

              {/* Top Pages */}
              <TopPagesTable pages={stats.topPages} />
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Detailed Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                  title="Recent Views"
                  value={stats.recentViews.toLocaleString()}
                  subtitle="Last 30 days"
                  icon={<Calendar className="w-6 h-6" />}
                  color="blue"
                />
                <StatsCard
                  title="Mobile Traffic"
                  value={String(stats.deviceBreakdown?.find((d: any) => d.device === 'mobile')?.count || 0)}
                  subtitle="Mobile visitors"
                  icon={<Smartphone className="w-6 h-6" />}
                  color="green"
                />
                <StatsCard
                  title="Desktop Traffic"
                  value={String(stats.deviceBreakdown?.find((d: any) => d.device === 'desktop')?.count || 0)}
                  subtitle="Desktop visitors"
                  icon={<Monitor className="w-6 h-6" />}
                  color="purple"
                />
              </div>

              {/* Traffic Chart */}
              <TrafficChart data={stats.dailyViews} />

              {/* Top Pages */}
              <TopPagesTable pages={stats.topPages} />

              {/* Advanced Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Referrers */}
                {stats.topReferrers && stats.topReferrers.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Top Referrers</h3>
                    <div className="space-y-3">
                      {stats.topReferrers.slice(0, 5).map((ref: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                              {ref.referrer}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">{ref.count} visits</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Country Breakdown */}
                {stats.countryBreakdown && stats.countryBreakdown.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Top Countries</h3>
                    <div className="space-y-3">
                      {stats.countryBreakdown.slice(0, 5).map((country: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getCountryFlag(country.country)}</span>
                            <span className="text-sm font-medium text-gray-900">
                              {country.country}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">{country.count} visits</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Ad Performance */}
              {stats.adClicksBySlot && stats.adClicksBySlot.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ad Performance by Slot</h3>
                  <div className="space-y-3">
                    {stats.adClicksBySlot.map((slot: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-medium text-gray-900 capitalize">{slot.slot}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">{slot.count} clicks</span>
                          <span className="text-sm text-green-600 font-medium">
                            ${(slot.count * 0.50).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Source Info */}
              <div className={`p-4 rounded-lg border ${
                stats.dataSource === 'kv' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <p className="text-sm font-medium">
                  {stats.dataSource === 'kv' ? (
                    <span className="text-green-800">
                      ✓ Using Vercel KV (Redis) - Data persists across deployments
                    </span>
                  ) : (
                    <span className="text-yellow-800">
                      ⚠️ Using in-memory storage - Data resets on server restart
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Ads Manager Tab */}
          {activeTab === 'ads' && (
            <AdsManager settings={settings} onUpdate={loadData} />
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <AlertManager settings={settings} onUpdate={loadData} />
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">System Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Analytics Storage</span>
                    <span className={`font-medium ${
                      stats.dataSource === 'kv' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {stats.dataSource === 'kv' ? '✓ Vercel KV (Redis)' : '⚠️ In-Memory'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Last Updated</span>
                    <span className="font-medium text-gray-900">
                      {mounted && settings.updatedAt ? new Date(settings.updatedAt).toLocaleString() : 'Loading...'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Environment</span>
                    <span className="font-medium text-gray-900">
                      {process.env.NODE_ENV === 'production' ? 'Production' : 'Development'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Data Points</span>
                    <span className="font-medium text-gray-900">
                      {stats.totalViews.toLocaleString()} views tracked
                    </span>
                  </div>
                </div>
              </div>

              {/* Analytics Management */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Analytics Management</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 mb-3">
                      <strong>Note:</strong> {stats.dataSource === 'kv' 
                        ? 'Your analytics data is stored in Vercel KV and persists across deployments.' 
                        : 'Currently using in-memory storage. Data will reset on server restart. Set up Vercel KV for persistent storage.'}
                    </p>
                  </div>
                  
                  <button
                    onClick={async () => {
                      if (confirm('Are you sure you want to reset all analytics data? This cannot be undone.')) {
                        try {
                          const response = await fetch('/api/admin/analytics', {
                            method: 'DELETE'
                          });
                          if (response.ok) {
                            alert('Analytics reset successfully!');
                            loadData();
                          }
                        } catch (error) {
                          alert('Failed to reset analytics');
                        }
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset All Analytics Data
                  </button>
                </div>
              </div>

              {/* Vercel KV Setup Guide */}
              {stats.dataSource !== 'kv' && (
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">
                    🚀 Upgrade to Persistent Storage
                  </h3>
                  <p className="text-sm text-purple-800 mb-4">
                    Set up Vercel KV (Redis) for persistent analytics that survive deployments and server restarts.
                  </p>
                  <ol className="space-y-2 text-sm text-purple-800 mb-4">
                    <li className="flex items-start gap-2">
                      <span className="font-bold min-w-[20px]">1.</span>
                      <span>Go to Vercel Dashboard → Storage → Create Database → KV</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold min-w-[20px]">2.</span>
                      <span>Environment variables will be added automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold min-w-[20px]">3.</span>
                      <span>Redeploy your application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold min-w-[20px]">4.</span>
                      <span>Analytics will automatically use KV storage!</span>
                    </li>
                  </ol>
                  <a
                    href="https://vercel.com/docs/storage/vercel-kv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    Read Documentation →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
