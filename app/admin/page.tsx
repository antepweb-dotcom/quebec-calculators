'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, DollarSign, Bell, Lock, LogOut, Users, TrendingUp,
  Calculator, Save, Languages, MousePointerClick, Clock, Settings,
  BarChart3, TrendingDown, Eye, Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Section = 'overview' | 'analytics' | 'ads' | 'alerts' | 'settings';

interface StatsData {
  revenue: { total: number; change: number };
  visitors: { active: number };
  adClicks: { total: number; ctr: number };
  topTool: { name: string };
  trafficRevenue: Array<{ day: number; traffic: number; revenue: number }>;
  toolsPerformance: Array<{ name: string; views: number; avgTime: string; bounceRate: string }>;
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Real data from API
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  
  // Ads Config
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [headerBannerId, setHeaderBannerId] = useState('');
  const [sidebarSquareId, setSidebarSquareId] = useState('');
  const [inArticleId, setInArticleId] = useState('');
  const [adFrequency, setAdFrequency] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Alerts Config
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState<'info' | 'warning' | 'error'>('info');

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    try {
      // Load stats
      const statsRes = await fetch('/api/admin/stats');
      const stats = await statsRes.json();
      setStatsData(stats);

      // Load ads config
      const adsRes = await fetch('/api/admin/ads');
      const ads = await adsRes.json();
      setAdsEnabled(ads.enabled);
      setHeaderBannerId(ads.slots.header.adId);
      setSidebarSquareId(ads.slots.sidebar.adId);
      setInArticleId(ads.slots.inArticle.adId);
      setAdFrequency(ads.frequency);

      // Load alerts config
      const alertsRes = await fetch('/api/admin/alerts');
      const alerts = await alertsRes.json();
      setAlertEnabled(alerts.enabled);
      setAlertMessage(alerts.message);
      setAlertColor(alerts.color);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveAdsConfig() {
    try {
      await fetch('/api/admin/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled: adsEnabled,
          slots: {
            header: { enabled: true, type: 'adsense', adId: headerBannerId, size: '728x90', description: 'Header banner' },
            sidebar: { enabled: true, type: 'adsense', adId: sidebarSquareId, size: '300x600', description: 'Sidebar' },
            inArticle: { enabled: true, type: 'adsense', adId: inArticleId, size: '300x250', description: 'In-article' },
            footer: { enabled: false, type: 'adsense', adId: '', size: '728x90', description: 'Footer' },
            affiliate1: { enabled: true, type: 'affiliate', html: 'deneme', size: 'custom', description: 'Affiliate 1' },
            affiliate2: { enabled: true, type: 'custom', html: 'deneme', size: 'custom', description: 'Custom 2' }
          },
          pages: { all: true, exclude: ['admin'] },
          frequency: adFrequency
        })
      });
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Failed to save ads config:', error);
    }
  }

  async function saveAlertsConfig() {
    try {
      await fetch('/api/admin/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled: alertEnabled,
          message: alertMessage,
          color: alertColor
        })
      });
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Failed to save alerts config:', error);
    }
  }

  const sidebarItems = [
    { id: 'overview' as Section, label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics' as Section, label: 'Analytics', icon: BarChart3 },
    { id: 'ads' as Section, label: 'Ads Manager', icon: DollarSign },
    { id: 'alerts' as Section, label: 'Alerts', icon: Bell },
    { id: 'settings' as Section, label: 'Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          ✓ Changes saved successfully!
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-2 text-slate-100">
            <Lock className="w-5 h-5" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeSection === item.id
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {/* Overview Section */}
          {activeSection === 'overview' && statsData && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Overview 💸</h2>
              
              {/* Hero Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      <span>+{statsData.revenue.change}%</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{statsData.revenue.total.toFixed(2)} $</h3>
                  <p className="text-gray-600 text-sm">Total Revenue (Month)</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{statsData.visitors.active}</h3>
                  <p className="text-gray-600 text-sm">Active Visitors</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <MousePointerClick className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">CTR: {statsData.adClicks.ctr}%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{statsData.adClicks.total}</h3>
                  <p className="text-gray-600 text-sm">Ad Clicks</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Calculator className="w-6 h-6 text-orange-600" />
                    </div>
                    <Activity className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{statsData.topTool.name}</h3>
                  <p className="text-gray-600 text-sm">Top Tool</p>
                </div>
              </div>

              {/* Traffic vs Revenue Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Traffic vs Revenue (Last 30 Days)</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={statsData.trafficRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} stroke="#6b7280" />
                    <YAxis yAxisId="left" stroke="#3b82f6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={2} name="Traffic" dot={{ fill: '#3b82f6', r: 4 }} />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue ($)" dot={{ fill: '#10b981', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === 'analytics' && statsData && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Performance Analytics 📈</h2>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Tool Name</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Views</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Avg Time</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Bounce Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {statsData.toolsPerformance.map((tool, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${index < 3 ? 'bg-green-500' : index < 8 ? 'bg-blue-500' : 'bg-gray-400'}`} />
                              <span className="font-medium text-gray-900">{tool.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="inline-flex items-center gap-1 text-gray-900 font-medium">
                              <Eye className="w-4 h-4 text-gray-400" />
                              {tool.views.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="inline-flex items-center gap-1 text-gray-700">
                              <Clock className="w-4 h-4 text-gray-400" />
                              {tool.avgTime}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              parseInt(tool.bounceRate) < 35 ? 'bg-green-100 text-green-800' : 
                              parseInt(tool.bounceRate) < 45 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {parseInt(tool.bounceRate) < 35 ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                              {tool.bounceRate}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Ads Manager Section */}
          {activeSection === 'ads' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Ads Manager 📢</h2>
              
              <div className="max-w-3xl space-y-6">
                {/* Master Toggle */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Enable All Ads</h3>
                      <p className="text-sm text-gray-600">Master switch to control all advertisements</p>
                    </div>
                    <button
                      onClick={() => setAdsEnabled(!adsEnabled)}
                      className={`relative w-16 h-8 rounded-full transition-colors ${adsEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${adsEnabled ? 'translate-x-8' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Ad Slots */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Ad Slot Configuration</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Header Banner ID</label>
                      <input
                        type="text"
                        value={headerBannerId}
                        onChange={(e) => setHeaderBannerId(e.target.value)}
                        placeholder="ca-pub-xxx"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sidebar Square ID</label>
                      <input
                        type="text"
                        value={sidebarSquareId}
                        onChange={(e) => setSidebarSquareId(e.target.value)}
                        placeholder="1234567890"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">In-Article Native ID</label>
                      <input
                        type="text"
                        value={inArticleId}
                        onChange={(e) => setInArticleId(e.target.value)}
                        placeholder="0987654321"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Frequency */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Ad Frequency</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Low</span>
                      <span className="text-gray-600">Medium</span>
                      <span className="text-gray-600">High</span>
                    </div>
                    
                    <input
                      type="range"
                      min="0"
                      max="2"
                      value={adFrequency === 'low' ? 0 : adFrequency === 'medium' ? 1 : 2}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setAdFrequency(val === 0 ? 'low' : val === 1 ? 'medium' : 'high');
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    
                    <div className="text-center">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {adFrequency.charAt(0).toUpperCase() + adFrequency.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={saveAdsConfig}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Alerts Section */}
          {activeSection === 'alerts' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Alerts & Announcements 🚨</h2>
              
              <div className="max-w-3xl space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Show Alert Bar</h3>
                      <p className="text-sm text-gray-600">Display a notification banner on the homepage</p>
                    </div>
                    <button
                      onClick={() => setAlertEnabled(!alertEnabled)}
                      className={`relative w-16 h-8 rounded-full transition-colors ${alertEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${alertEnabled ? 'translate-x-8' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        value={alertMessage}
                        onChange={(e) => setAlertMessage(e.target.value)}
                        placeholder="Maintenance scheduled tonight..."
                        rows={3}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['info', 'warning', 'error'] as const).map((color) => (
                          <button
                            key={color}
                            onClick={() => setAlertColor(color)}
                            className={`px-4 py-3 rounded-lg border-2 transition-all ${
                              alertColor === color
                                ? `border-${color === 'info' ? 'blue' : color === 'warning' ? 'yellow' : 'red'}-500 bg-${color === 'info' ? 'blue' : color === 'warning' ? 'yellow' : 'red'}-50`
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${color === 'info' ? 'bg-blue-500' : color === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                              <span className="font-medium text-gray-900 capitalize">{color}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {alertEnabled && alertMessage && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Preview</h3>
                    <div className={`p-4 rounded-lg border-l-4 ${
                      alertColor === 'info' ? 'bg-blue-50 border-blue-500 text-blue-900' :
                      alertColor === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-900' :
                      'bg-red-50 border-red-500 text-red-900'
                    }`}>
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5" />
                        <p className="font-medium">{alertMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={saveAlertsConfig}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Settings ⚙️</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <p className="text-gray-600">Settings panel coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
