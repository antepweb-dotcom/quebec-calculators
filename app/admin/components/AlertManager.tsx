'use client';

import { useState, useTransition } from 'react';
import { Bell, Save, AlertCircle, CheckCircle, Power } from 'lucide-react';

interface AlertManagerProps {
  settings: any;
  onUpdate: () => void;
}

export default function AlertManager({ settings, onUpdate }: AlertManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [alertActive, setAlertActive] = useState(settings.alertActive);
  const [alertMessage, setAlertMessage] = useState(settings.alertMessage || '');
  const [alertType, setAlertType] = useState<'info' | 'warning' | 'error' | 'success'>(settings.alertType || 'info');

  const handleToggle = async () => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'alert',
            data: {
              isActive: !alertActive,
              message: alertMessage,
              alertType
            }
          })
        });

        const result = await response.json();
        
        if (result.success) {
          setAlertActive(!alertActive);
          setMessage({ type: 'success', text: `Alert ${!alertActive ? 'activated' : 'deactivated'} successfully!` });
          onUpdate();
        } else {
          setMessage({ type: 'error', text: 'Failed to toggle alert' });
        }
      } catch (error) {
        console.error('Toggle error:', error);
        setMessage({ type: 'error', text: 'Failed to toggle alert' });
      }
      setTimeout(() => setMessage(null), 3000);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (alertActive && !alertMessage) {
      setMessage({ type: 'error', text: 'Alert message is required when alert is active' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    
    startTransition(async () => {
      try {
        const response = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'alert',
            data: {
              isActive: alertActive,
              message: alertMessage,
              alertType
            }
          })
        });

        const result = await response.json();
        
        if (result.success) {
          setMessage({ type: 'success', text: 'Alert configuration updated successfully!' });
          onUpdate();
        } else {
          setMessage({ type: 'error', text: result.error || 'Failed to update configuration' });
        }
      } catch (error) {
        console.error('Submit error:', error);
        setMessage({ type: 'error', text: 'An error occurred while updating alert settings' });
      }
      setTimeout(() => setMessage(null), 3000);
    });
  };

  const alertTypeColors = {
    info: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-900', icon: 'text-blue-600' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-900', icon: 'text-yellow-600' },
    error: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-900', icon: 'text-red-600' },
    success: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-900', icon: 'text-green-600' }
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">Alert Status</h3>
            <p className="text-gray-600">Quickly show or hide the alert banner</p>
          </div>
          <button
            onClick={handleToggle}
            disabled={isPending}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              alertActive
                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Power className="w-5 h-5" />
            {alertActive ? 'Alert Active' : 'Alert Inactive'}
          </button>
        </div>
      </div>

      {/* Configuration Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Alert Configuration</h3>
        
        <div className="space-y-6">
          {/* Enable/Disable */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="alertActive"
                value="true"
                checked={alertActive}
                onChange={(e) => setAlertActive(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">Show Alert Banner</span>
                <p className="text-sm text-gray-600">Display alert at the top of all pages</p>
              </div>
            </label>
          </div>

          {/* Alert Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Alert Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['info', 'warning', 'error', 'success'] as const).map((type) => (
                <label
                  key={type}
                  className={`flex items-center justify-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    alertType === type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="alertType"
                    value={type}
                    checked={alertType === type}
                    onChange={(e) => setAlertType(e.target.value as any)}
                    className="sr-only"
                  />
                  <span className="font-medium text-gray-900 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Alert Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alert Message
            </label>
            <textarea
              name="alertMessage"
              value={alertMessage}
              onChange={(e) => setAlertMessage(e.target.value)}
              placeholder="Enter your alert message here..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required={alertActive}
            />
            <p className="text-sm text-gray-600 mt-2">
              This message will be displayed to all visitors
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
                setAlertActive(settings.alertActive);
                setAlertMessage(settings.alertMessage || '');
                setAlertType(settings.alertType || 'info');
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Live Preview */}
      {alertActive && alertMessage && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Live Preview</h3>
          <div className={`p-4 rounded-lg border-l-4 ${alertTypeColors[alertType].bg} ${alertTypeColors[alertType].border}`}>
            <div className="flex items-center gap-3">
              <Bell className={`w-5 h-5 ${alertTypeColors[alertType].icon}`} />
              <p className={`font-medium ${alertTypeColors[alertType].text}`}>{alertMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
