import { 
  LayoutDashboard, DollarSign, Bell, Lock, Users, TrendingUp,
  Calculator, MousePointerClick, Settings, BarChart3, Eye, Activity
} from 'lucide-react';
import { getDashboardStats, getSiteConfig } from '@/app/actions/adminActions';
import AdminClient from '@/app/admin/AdminClient';
import LogoutButton from '@/app/admin/LogoutButton';
import TrafficChart from '@/app/admin/TrafficChart';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch real data from database
  const [stats, config] = await Promise.all([
    getDashboardStats(),
    getSiteConfig()
  ]);

  // Calculate derived stats
  const estimatedRevenue = stats.recentViews * 0.025;
  const estimatedClicks = Math.floor(stats.recentViews * 0.024);
  const ctr = 2.4;

  // Format daily views for chart
  const chartData = stats.dailyViews.map((item, index) => ({
    day: index + 1,
    traffic: item.count,
    revenue: item.count * 0.025
  }));

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-2 text-slate-100">
            <Lock className="w-5 h-5" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 bg-slate-700 text-white">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Overview</span>
          </div>
          <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-slate-400">
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Analytics</span>
          </div>
          <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-slate-400">
            <DollarSign className="w-5 h-5" />
            <span className="font-medium">Ads Manager</span>
          </div>
          <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-slate-400">
            <Bell className="w-5 h-5" />
            <span className="font-medium">Alerts</span>
          </div>
          <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-slate-400">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </div>
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
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
                  <span>+12%</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">${estimatedRevenue.toFixed(2)}</h3>
              <p className="text-gray-600 text-sm">Estimated Revenue (30d)</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.totalViews.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Total Page Views</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MousePointerClick className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-gray-500 font-medium">CTR: {ctr}%</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{estimatedClicks}</h3>
              <p className="text-gray-600 text-sm">Estimated Ad Clicks</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Calculator className="w-6 h-6 text-orange-600" />
                </div>
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{stats.recentViews.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Views (Last 30 Days)</p>
            </div>
          </div>

          {/* Traffic vs Revenue Chart */}
          <TrafficChart data={chartData} />

          {/* Analytics Table */}
          {stats.topPaths.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Top Visited Pages</h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Page Path</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Views</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.topPaths.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${index < 3 ? 'bg-green-500' : 'bg-blue-500'}`} />
                          <span className="font-medium text-gray-900">{item.path}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1 text-gray-900 font-medium">
                          <Eye className="w-4 h-4 text-gray-400" />
                          {item.count.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {stats.totalViews === 0 && (
            <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Data Yet</h3>
              <p className="text-gray-600 mb-4">Start visiting pages to see analytics data here.</p>
              <p className="text-sm text-gray-500">Database is connected and ready to track visits.</p>
            </div>
          )}

          {/* Client-side interactive components */}
          <AdminClient config={config} />
        </div>
      </main>
    </div>
  );
}
