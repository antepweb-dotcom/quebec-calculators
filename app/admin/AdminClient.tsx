'use client';

import { useState } from 'react';
import { Save, Bell, Info } from 'lucide-react';

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
  const [showToast, setShowToast] = useState(false);

  // Form state
  const [adsEnabled, setAdsEnabled] = useState(config.isAdsEnabled);
  const [adSenseId, setAdSenseId] = useState(config.adSenseId);
  const [bannerSlotId, setBannerSlotId] = useState(config.bannerSlotId);
  const [sidebarSlotId, setSidebarSlotId] = useState(config.sidebarSlotId);
  const [alertActive, setAlertActive] = useState(config.isAlertActive);
  const [alertMessage, setAlertMessage] = useState(config.alertMessage);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // Read-only mode - just log to console
    console.log('Saved locally (read-only mode):', {
      adsEnabled,
      adSenseId,
      bannerSlotId,
      sidebarSlotId,
      alertActive,
      alertMessage
    });
    
    // Show success toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <>
      {/* Read-Only Mode Banner */}
      <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900">Mode Sans Base de Données (Lecture Seule)</h4>
            <p className="text-sm text-blue-700 mt-1">
              Les modifications ne seront pas sauvegardées. Les données sont affichées à partir de fichiers JSON statiques.
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          ✓ Logged to console (read-only mode)
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 mt-8">
        {/* Ads Manager Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Ads Manager 📢</h3>
          
          <div className="space-y-6">
            {/* Master Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Enable All Ads</h4>
                <p className="text-sm text-gray-600">Master switch to control all advertisements</p>
              </div>
              <button
                type="button"
                onClick={() => setAdsEnabled(!adsEnabled)}
                className={`relative w-16 h-8 rounded-full transition-colors ${adsEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${adsEnabled ? 'translate-x-8' : ''}`} />
              </button>
            </div>

            {/* Ad Configuration */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AdSense Publisher ID
                  {adsEnabled && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="text"
                  value={adSenseId}
                  onChange={(e) => setAdSenseId(e.target.value)}
                  placeholder="ca-pub-xxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Slot ID
                </label>
                <input
                  type="text"
                  value={bannerSlotId}
                  onChange={(e) => setBannerSlotId(e.target.value)}
                  placeholder="1234567890"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sidebar Slot ID
                </label>
                <input
                  type="text"
                  value={sidebarSlotId}
                  onChange={(e) => setSidebarSlotId(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Alerts & Announcements 🚨</h3>
          
          <div className="space-y-6">
            {/* Alert Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Show Alert Bar</h4>
                <p className="text-sm text-gray-600">Display a notification banner on the site</p>
              </div>
              <button
                type="button"
                onClick={() => setAlertActive(!alertActive)}
                className={`relative w-16 h-8 rounded-full transition-colors ${alertActive ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${alertActive ? 'translate-x-8' : ''}`} />
              </button>
            </div>

            {/* Alert Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Message
              </label>
              <textarea
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                placeholder="Important announcement..."
                rows={3}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Preview */}
            {alertActive && alertMessage && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Preview</h4>
                <div className="p-4 rounded-lg border-l-4 bg-blue-50 border-blue-500 text-blue-900">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5" />
                    <p className="font-medium">{alertMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          <Save className="w-5 h-5" />
          Save to Console (Read-Only)
        </button>
      </form>
    </>
  );
}
