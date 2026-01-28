'use client';

import { Bell, Info, Code, Github } from 'lucide-react';

interface AdminClientProps {
  config: {
    id: number;
    isAdsEnabled: boolean;
    adSenseId: string;
    bannerSlotId: string;
    sidebarSlotId: string;
    alertMessage: string;
    isAlertActive: boolean;
  };
}

export default function AdminClient({ config }: AdminClientProps) {
  return (
    <>
      {/* Read-Only Mode Notice */}
      <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
        <div className="flex items-start gap-4">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-base font-bold text-blue-900 mb-2">📖 Read-Only Dashboard (Stateless Architecture)</h4>
            <p className="text-sm text-blue-800 mb-3">
              This dashboard displays current configuration from <code className="px-2 py-0.5 bg-blue-100 rounded text-blue-900 font-mono text-xs">app/site-config.ts</code>
            </p>
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Code className="w-4 h-4" />
              <span className="font-medium">To update settings:</span>
              <span>Edit <code className="px-1.5 py-0.5 bg-blue-100 rounded font-mono text-xs">app/site-config.ts</code> and push to GitHub</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 mt-8">
        {/* Current Ads Configuration */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Ads Configuration 📢</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${config.isAdsEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
              {config.isAdsEnabled ? '✓ Enabled' : '✗ Disabled'}
            </span>
          </div>
          
          <div className="space-y-4">
            {/* Ads Status */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">Master Switch</h4>
                  <p className="text-lg font-bold text-gray-900">
                    {config.isAdsEnabled ? 'All Ads Enabled' : 'All Ads Disabled'}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${config.isAdsEnabled ? 'bg-green-100' : 'bg-gray-200'}`}>
                  <span className="text-2xl">{config.isAdsEnabled ? '✓' : '✗'}</span>
                </div>
              </div>
            </div>

            {/* AdSense ID */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">AdSense Publisher ID</h4>
              <p className="text-base font-mono text-gray-900 bg-white px-3 py-2 rounded border border-gray-200">
                {config.adSenseId || 'Not configured'}
              </p>
            </div>

            {/* Slot IDs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Banner Slot ID</h4>
                <p className="text-base font-mono text-gray-900 bg-white px-3 py-2 rounded border border-gray-200">
                  {config.bannerSlotId || 'Not configured'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Sidebar Slot ID</h4>
                <p className="text-base font-mono text-gray-900 bg-white px-3 py-2 rounded border border-gray-200">
                  {config.sidebarSlotId || 'Not configured'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Alert Configuration */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Alert Banner 🚨</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${config.isAlertActive ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
              {config.isAlertActive ? '✓ Active' : '✗ Inactive'}
            </span>
          </div>
          
          <div className="space-y-4">
            {/* Alert Status */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">Status</h4>
                  <p className="text-lg font-bold text-gray-900">
                    {config.isAlertActive ? 'Alert Banner Visible' : 'Alert Banner Hidden'}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${config.isAlertActive ? 'bg-yellow-100' : 'bg-gray-200'}`}>
                  <Bell className={`w-6 h-6 ${config.isAlertActive ? 'text-yellow-600' : 'text-gray-400'}`} />
                </div>
              </div>
            </div>

            {/* Alert Message */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Current Message</h4>
              <p className="text-base text-gray-900 bg-white px-3 py-2 rounded border border-gray-200 min-h-[60px]">
                {config.alertMessage || 'No message configured'}
              </p>
            </div>

            {/* Live Preview */}
            {config.isAlertActive && config.alertMessage && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Live Preview</h4>
                <div className="p-4 rounded-lg border-l-4 bg-blue-50 border-blue-500 text-blue-900">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5" />
                    <p className="font-medium">{config.alertMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* How to Update Settings */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-200 rounded-lg">
              <Github className="w-6 h-6 text-slate-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-2">How to Update Configuration</h3>
              <ol className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 min-w-[20px]">1.</span>
                  <span>Open <code className="px-2 py-0.5 bg-slate-200 rounded font-mono text-xs">app/site-config.ts</code> in your code editor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 min-w-[20px]">2.</span>
                  <span>Edit the values in the <code className="px-2 py-0.5 bg-slate-200 rounded font-mono text-xs">siteConfig</code> object</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 min-w-[20px]">3.</span>
                  <span>Commit and push to GitHub: <code className="px-2 py-0.5 bg-slate-200 rounded font-mono text-xs">git push</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 min-w-[20px]">4.</span>
                  <span>Vercel will automatically rebuild and deploy your changes</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

