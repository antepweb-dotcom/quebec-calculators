'use client';

import { useState, useTransition } from 'react';
import { Power, Save, AlertCircle, CheckCircle } from 'lucide-react';

interface AdsManagerProps {
  settings: any;
  onUpdate: () => void;
}

export default function AdsManager({ settings, onUpdate }: AdsManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [adsEnabled, setAdsEnabled] = useState(settings.adsEnabled);
  const [adSenseId, setAdSenseId] = useState(settings.adSenseId || '');

  const handleToggle = async () => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'ads',
            data: {
              isEnabled: !adsEnabled,
              googleAdSenseId: settings.adSenseId
            }
          })
        });

        const result = await response.json();
        
        if (result.success) {
          setAdsEnabled(!adsEnabled);
          setMessage({ type: 'success', text: `Ads ${!adsEnabled ? 'enabled' : 'disabled'} successfully!` });
          onUpdate();
        } else {
          setMessage({ type: 'error', text: 'Failed to toggle ads' });
        }
      } catch (error) {
        console.error('Toggle error:', error);
        setMessage({ type: 'error', text: 'Failed to toggle ads' });
      }
      setTimeout(() => setMessage(null), 3000);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (adsEnabled && !adSenseId) {
      setMessage({ type: 'error', text: 'AdSense ID is required when ads are enabled' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    
    startTransition(async () => {
      try {
        const response = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'ads',
            data: {
              isEnabled: adsEnabled,
              googleAdSenseId: adSenseId
            }
          })
        });

        const result = await response.json();
        
        if (result.success) {
          setMessage({ type: 'success', text: 'Ads configuration updated successfully!' });
          onUpdate();
        } else {
          setMessage({ type: 'error', text: result.error || 'Failed to update configuration' });
        }
      } catch (error) {
        console.error('Submit error:', error);
        setMessage({ type: 'error', text: 'An error occurred while updating settings' });
      }
      setTimeout(() => setMessage(null), 3000);
    });
  };

  return (
    <div className="space-y-6">
      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Quick Toggle */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Master Switch</h3>
            <p className="text-gray-600">Quickly enable or disable all ads across the site</p>
          </div>
          <button
            onClick={handleToggle}
            disabled={isPending}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              adsEnabled
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Power className="w-5 h-5" />
            {adsEnabled ? 'Ads Enabled' : 'Ads Disabled'}
          </button>
        </div>
      </div>

      {/* Configuration Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Ads Configuration</h3>
        
        <div className="space-y-6">
          {/* Enable/Disable */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="adsEnabled"
                value="true"
                checked={adsEnabled}
                onChange={(e) => setAdsEnabled(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">Enable Ads</span>
                <p className="text-sm text-gray-600">Show ads across all pages</p>
              </div>
            </label>
          </div>

          {/* AdSense ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Google AdSense Publisher ID
            </label>
            <input
              type="text"
              name="adSenseId"
              value={adSenseId}
              onChange={(e) => setAdSenseId(e.target.value)}
              placeholder="ca-pub-2733523563879283"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required={adsEnabled}
            />
            <p className="text-sm text-gray-600 mt-2">
              Your Google AdSense publisher ID (starts with "ca-pub-")
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Save className="w-5 h-5" />
              {isPending ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => {
                setAdsEnabled(settings.adsEnabled);
                setAdSenseId(settings.adSenseId || '');
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Current Status */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-4">Current Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-blue-800">Ads Status:</span>
            <span className={`font-bold ${adsEnabled ? 'text-green-600' : 'text-gray-600'}`}>
              {adsEnabled ? '✓ Enabled' : '✗ Disabled'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-800">AdSense ID:</span>
            <span className="font-mono text-sm text-blue-900">
              {settings.adSenseId || 'Not configured'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-800">Last Updated:</span>
            <span className="text-blue-900">
              {settings.updatedAt ? new Date(settings.updatedAt).toLocaleString() : 'Never'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
