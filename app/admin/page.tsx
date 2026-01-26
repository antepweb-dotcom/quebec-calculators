'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  DollarSign, 
  Bell, 
  Lock, 
  LogOut,
  Users,
  TrendingUp,
  Calculator,
  Save,
  X,
  Languages,
  MousePointerClick,
  Clock,
  Settings,
  BarChart3,
  TrendingDown,
  Eye,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Section = 'overview' | 'analytics' | 'ads' | 'alerts' | 'settings';
type Language = 'tr' | 'en';

const translations = {
  tr: {
    adminPanel: 'Yönetim Paneli',
    overview: 'Genel Bakış',
    analytics: 'Performans Analizi',
    adsManager: 'Reklam Yönetimi',
    alertsAnnouncements: 'Uyarılar & Duyurular',
    settings: 'Ayarlar',
    logout: 'Çıkış Yap',
    totalRevenue: 'Toplam Gelir (Ay)',
    activeVisitors: 'Aktif Ziyaretçi',
    adClicks: 'Reklam Tıklamaları',
    topTool: 'En İyi Araç',
    trafficVsRevenue: 'Trafik vs Gelir (Son 30 Gün)',
    traffic: 'Trafik',
    revenue: 'Gelir',
    toolName: 'Araç Adı',
    views: 'Görüntüleme',
    avgTime: 'Ort. Süre',
    bounceRate: 'Çıkış Oranı',
    enableAllAds: 'Tüm Reklamları Etkinleştir',
    adSlotConfiguration: 'Reklam Slot Yapılandırması',
    headerBannerId: 'Header Banner ID',
    sidebarSquareId: 'Sidebar Kare ID',
    inArticleNativeId: 'Makale İçi Native ID',
    adFrequency: 'Reklam Sıklığı',
    low: 'Düşük',
    medium: 'Orta',
    high: 'Yüksek',
    saveChanges: 'Değişiklikleri Kaydet',
    showAlertBar: 'Uyarı Çubuğunu Göster',
    message: 'Mesaj',
    messagePlaceholder: 'Bu akşam bakım yapılacak...',
    color: 'Renk',
    info: 'Bilgi',
    warning: 'Uyarı',
    error: 'Hata',
    preview: 'Önizleme',
    changesSaved: 'Değişiklikler kaydedildi! (Simülasyon)',
    ctr: 'TO',
    day: 'Gün'
  },
  en: {
    adminPanel: 'Admin Panel',
    overview: 'Overview',
    analytics: 'Performance Analytics',
    adsManager: 'Ads Manager',
    alertsAnnouncements: 'Alerts & Announcements',
    settings: 'Settings',
    logout: 'Logout',
    totalRevenue: 'Total Revenue (Month)',
    activeVisitors: 'Active Visitors',
    adClicks: 'Ad Clicks',
    topTool: 'Top Tool',
    trafficVsRevenue: 'Traffic vs Revenue (Last 30 Days)',
    traffic: 'Traffic',
    revenue: 'Revenue',
    toolName: 'Tool Name',
    views: 'Views',
    avgTime: 'Avg Time',
    bounceRate: 'Bounce Rate',
    enableAllAds: 'Enable All Ads',
    adSlotConfiguration: 'Ad Slot Configuration',
    headerBannerId: 'Header Banner ID',
    sidebarSquareId: 'Sidebar Square ID',
    inArticleNativeId: 'In-Article Native ID',
    adFrequency: 'Ad Frequency',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    saveChanges: 'Save Changes',
    showAlertBar: 'Show Alert Bar',
    message: 'Message',
    messagePlaceholder: 'Maintenance scheduled tonight...',
    color: 'Color',
    info: 'Info',
    warning: 'Warning',
    error: 'Error',
    preview: 'Preview',
    changesSaved: 'Changes saved! (Simulation)',
    ctr: 'CTR',
    day: 'Day'
  }
};

// Mock Data
const trafficRevenueData = [
  { day: 1, traffic: 1200, revenue: 28.5 },
  { day: 5, traffic: 1450, revenue: 35.2 },
  { day: 10, traffic: 1680, revenue: 42.8 },
  { day: 15, traffic: 1920, revenue: 48.3 },
  { day: 20, traffic: 2100, revenue: 52.7 },
  { day: 25, traffic: 2350, revenue: 58.9 },
  { day: 30, traffic: 2580, revenue: 65.4 }
];

const toolsPerformanceData = [
  { name: 'Calcul Hypothèque', views: 8420, avgTime: '4:32', bounceRate: '32%' },
  { name: 'Salaire Net Québec', views: 7850, avgTime: '3:45', bounceRate: '28%' },
  { name: 'TPS/TVQ Québec', views: 5240, avgTime: '2:18', bounceRate: '45%' },
  { name: 'Capacité d\'Emprunt', views: 4680, avgTime: '3:52', bounceRate: '35%' },
  { name: 'Prêt Auto', views: 3920, avgTime: '3:28', bounceRate: '38%' },
  { name: 'Taux Horaire', views: 3540, avgTime: '2:05', bounceRate: '42%' },
  { name: 'Épargne Retraite', views: 3180, avgTime: '4:15', bounceRate: '30%' },
  { name: 'Augmentation Loyer 2026', views: 2840, avgTime: '2:42', bounceRate: '40%' },
  { name: 'Pourboire', views: 2520, avgTime: '1:35', bounceRate: '52%' },
  { name: 'Prêt Étudiant', views: 2180, avgTime: '3:38', bounceRate: '36%' },
  { name: 'Dettes & Crédit', views: 1920, avgTime: '4:05', bounceRate: '33%' },
  { name: 'Taxe de Bienvenue', views: 1680, avgTime: '2:55', bounceRate: '41%' },
  { name: 'Inflation', views: 1420, avgTime: '3:12', bounceRate: '37%' },
  { name: 'Frais de Garde', views: 1180, avgTime: '2:48', bounceRate: '39%' },
  { name: 'Paie Vacances', views: 980, avgTime: '2:22', bounceRate: '44%' },
  { name: 'Assurance Emploi', views: 840, avgTime: '2:58', bounceRate: '40%' }
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [showToast, setShowToast] = useState(false);
  const [language, setLanguage] = useState<Language>('tr');
  
  // Ads Manager State
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [headerBannerId, setHeaderBannerId] = useState('ca-pub-1234567890');
  const [sidebarSquareId, setSidebarSquareId] = useState('1234567890');
  const [inArticleId, setInArticleId] = useState('0987654321');
  const [adFrequency, setAdFrequency] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Affiliate/Custom Ads State
  const [affiliateHtml1, setAffiliateHtml1] = useState('');
  const [affiliateHtml2, setAffiliateHtml2] = useState('');
  const [customHtml, setCustomHtml] = useState('');
  
  // Alerts State
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState<'info' | 'warning' | 'error'>('info');

  // Load config on mount
  useEffect(() => {
    fetch('/api/ads/config')
      .then(res => res.json())
      .then(data => {
        if (data.enabled !== undefined) setAdsEnabled(data.enabled);
        if (data.frequency) setAdFrequency(data.frequency);
        if (data.slots?.header?.adId) setHeaderBannerId(data.slots.header.adId);
        if (data.slots?.sidebar?.adId) setSidebarSquareId(data.slots.sidebar.adId);
        if (data.slots?.inArticle?.adId) setInArticleId(data.slots.inArticle.adId);
        if (data.slots?.affiliate1?.html) setAffiliateHtml1(data.slots.affiliate1.html);
        if (data.slots?.affiliate2?.html) setCustomHtml(data.slots.affiliate2.html);
      })
      .catch(err => console.error('Failed to load config:', err));
  }, []);

  const t = translations[language];

  const handleSave = async () => {
    try {
      const config = {
        enabled: adsEnabled,
        slots: {
          header: {
            enabled: adsEnabled,
            type: 'adsense',
            adId: headerBannerId,
            size: '728x90',
            description: 'Header banner - top of page'
          },
          sidebar: {
            enabled: adsEnabled,
            type: 'adsense',
            adId: sidebarSquareId,
            size: '300x600',
            description: 'Sidebar - right column'
          },
          inArticle: {
            enabled: adsEnabled,
            type: 'adsense',
            adId: inArticleId,
            size: '300x250',
            description: 'In-article - middle of content'
          },
          footer: {
            enabled: false,
            type: 'adsense',
            adId: '',
            size: '728x90',
            description: 'Footer banner - bottom of page'
          },
          affiliate1: {
            enabled: affiliateHtml1.length > 0,
            type: 'affiliate',
            html: affiliateHtml1,
            size: 'custom',
            description: 'Custom affiliate slot 1'
          },
          affiliate2: {
            enabled: customHtml.length > 0,
            type: 'custom',
            html: customHtml,
            size: 'custom',
            description: 'Custom HTML slot 2'
          }
        },
        pages: {
          all: true,
          exclude: ['admin']
        },
        frequency: adFrequency
      };

      const response = await fetch('/api/ads/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        alert('Kaydetme hatası!');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Kaydetme hatası!');
    }
  };

  const sidebarItems = [
    { id: 'overview' as Section, label: t.overview, icon: LayoutDashboard },
    { id: 'analytics' as Section, label: t.analytics, icon: BarChart3 },
    { id: 'ads' as Section, label: t.adsManager, icon: DollarSign },
    { id: 'alerts' as Section, label: t.alertsAnnouncements, icon: Bell },
    { id: 'settings' as Section, label: t.settings, icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-100">
              <Lock className="w-5 h-5" />
              <h1 className="text-xl font-bold">{t.adminPanel}</h1>
            </div>
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
              title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
            >
              <Languages className="w-5 h-5" />
            </button>
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
            <span className="font-medium">{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.overview} 💸</h2>
              
              {/* Hero Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Revenue */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12%</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">1,245.80 $</h3>
                  <p className="text-gray-600 text-sm">{t.totalRevenue}</p>
                </div>

                {/* Active Visitors */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">142</h3>
                  <p className="text-gray-600 text-sm">{t.activeVisitors}</p>
                </div>

                {/* Ad Clicks */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <MousePointerClick className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{t.ctr}: 2.4%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">840</h3>
                  <p className="text-gray-600 text-sm">{t.adClicks}</p>
                </div>

                {/* Top Tool */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Calculator className="w-6 h-6 text-orange-600" />
                    </div>
                    <Activity className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Calcul Hypothèque</h3>
                  <p className="text-gray-600 text-sm">{t.topTool}</p>
                </div>
              </div>

              {/* Traffic vs Revenue Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{t.trafficVsRevenue}</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trafficRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="day" 
                      label={{ value: t.day, position: 'insideBottom', offset: -5 }}
                      stroke="#6b7280"
                    />
                    <YAxis yAxisId="left" stroke="#3b82f6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="traffic" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name={t.traffic}
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name={t.revenue + ' ($)'}
                      dot={{ fill: '#10b981', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === 'analytics' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.analytics} 📈</h2>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {t.toolName}
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {t.views}
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {t.avgTime}
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {t.bounceRate}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {toolsPerformanceData.map((tool, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${
                                index < 3 ? 'bg-green-500' : index < 8 ? 'bg-blue-500' : 'bg-gray-400'
                              }`} />
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
                              parseInt(tool.bounceRate) < 35 
                                ? 'bg-green-100 text-green-800' 
                                : parseInt(tool.bounceRate) < 45 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {parseInt(tool.bounceRate) < 35 ? (
                                <TrendingDown className="w-3 h-3 mr-1" />
                              ) : (
                                <TrendingUp className="w-3 h-3 mr-1" />
                              )}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.adsManager} 📢</h2>
              
              <div className="max-w-3xl space-y-6">
                {/* Master Toggle Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {t.enableAllAds}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Master switch to control all advertisements
                      </p>
                    </div>
                    <button
                      onClick={() => setAdsEnabled(!adsEnabled)}
                      className={`relative w-16 h-8 rounded-full transition-colors ${
                        adsEnabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                          adsEnabled ? 'translate-x-8' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Ad Slot Configuration */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.adSlotConfiguration}</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.headerBannerId}
                      </label>
                      <input
                        type="text"
                        value={headerBannerId}
                        onChange={(e) => setHeaderBannerId(e.target.value)}
                        placeholder="ca-pub-xxx"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.sidebarSquareId}
                      </label>
                      <input
                        type="text"
                        value={sidebarSquareId}
                        onChange={(e) => setSidebarSquareId(e.target.value)}
                        placeholder="1234567890"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.inArticleNativeId}
                      </label>
                      <input
                        type="text"
                        value={inArticleId}
                        onChange={(e) => setInArticleId(e.target.value)}
                        placeholder="0987654321"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Ad Frequency Slider */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.adFrequency}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t.low}</span>
                      <span className="text-gray-600">{t.medium}</span>
                      <span className="text-gray-600">{t.high}</span>
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
                        {adFrequency === 'low' ? t.low : adFrequency === 'medium' ? t.medium : t.high}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Affiliate/Custom Ads Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Affiliate & Custom Ads</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Affiliate Slot 1 (HTML)
                      </label>
                      <textarea
                        value={affiliateHtml1}
                        onChange={(e) => setAffiliateHtml1(e.target.value)}
                        placeholder='<a href="https://affiliate.com/ref"><img src="banner.jpg" alt="Ad"/></a>'
                        rows={4}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">Paste your affiliate banner HTML code here</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom HTML Slot 2
                      </label>
                      <textarea
                        value={customHtml}
                        onChange={(e) => setCustomHtml(e.target.value)}
                        placeholder='<!-- Amazon Native Shopping Ads or any custom HTML -->'
                        rows={4}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">Any custom HTML/JavaScript code</p>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  <Save className="w-5 h-5" />
                  {t.saveChanges}
                </button>
              </div>
            </div>
          )}

          {/* Alerts Section */}
          {activeSection === 'alerts' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.alertsAnnouncements} 🚨</h2>
              
              <div className="max-w-3xl space-y-6">
                {/* Alert Toggle */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {t.showAlertBar}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Display a notification banner on the homepage
                      </p>
                    </div>
                    <button
                      onClick={() => setAlertEnabled(!alertEnabled)}
                      className={`relative w-16 h-8 rounded-full transition-colors ${
                        alertEnabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                          alertEnabled ? 'translate-x-8' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Alert Configuration */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.message}
                      </label>
                      <textarea
                        value={alertMessage}
                        onChange={(e) => setAlertMessage(e.target.value)}
                        placeholder={t.messagePlaceholder}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.color}
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => setAlertColor('info')}
                          className={`px-4 py-3 rounded-lg border-2 transition-all ${
                            alertColor === 'info'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full" />
                            <span className="font-medium text-gray-900">{t.info}</span>
                          </div>
                        </button>

                        <button
                          onClick={() => setAlertColor('warning')}
                          className={`px-4 py-3 rounded-lg border-2 transition-all ${
                            alertColor === 'warning'
                              ? 'border-yellow-500 bg-yellow-50'
                              : 'border-gray-200 bg-white hover:border-yellow-300'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                            <span className="font-medium text-gray-900">{t.warning}</span>
                          </div>
                        </button>

                        <button
                          onClick={() => setAlertColor('error')}
                          className={`px-4 py-3 rounded-lg border-2 transition-all ${
                            alertColor === 'error'
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 bg-white hover:border-red-300'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                            <span className="font-medium text-gray-900">{t.error}</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                {alertEnabled && alertMessage && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      {t.preview}
                    </h3>
                    <div
                      className={`p-4 rounded-lg border-l-4 ${
                        alertColor === 'info'
                          ? 'bg-blue-50 border-blue-500 text-blue-900'
                          : alertColor === 'warning'
                          ? 'bg-yellow-50 border-yellow-500 text-yellow-900'
                          : 'bg-red-50 border-red-500 text-red-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5" />
                        <p className="font-medium">{alertMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  <Save className="w-5 h-5" />
                  {t.saveChanges}
                </button>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.settings} ⚙️</h2>
              
              <div className="max-w-3xl">
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Coming Soon
                  </h3>
                  <p className="text-gray-600">
                    Additional settings and configurations will be available here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-white border border-gray-200 rounded-lg shadow-2xl p-4 flex items-center gap-3 animate-slide-up">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-gray-900 font-medium">
            {t.changesSaved}
          </p>
          <button
            onClick={() => setShowToast(false)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
