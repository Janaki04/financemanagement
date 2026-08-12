import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  ShieldCheck, 
  Sliders, 
  Save, 
  Check, 
  Camera, 
  Key, 
  Globe, 
  Moon, 
  Smartphone,
  Lock
} from 'lucide-react';

const PALETTE = {
  lightCyan: '#B8E3E9',
  mutedCyan: '#93B1B5',
  deepTeal: '#4F7C82',
  darkTeal: '#0B2E33',
  pageBg: '#EBF6F8'
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);

  const [profile, setProfile] = useState({
    fullName: 'Sourav Sharma',
    email: 'sourav@finance.io',
    role: 'Financial Administrator',
    currency: 'USD ($)',
    timezone: 'UTC -08:00 (Pacific Time)',
    bio: 'Overseeing company portfolio allocation and expense auditing.'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    budgetWarnings: true,
    weeklyReports: false,
    securityNotifs: true
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile Details', icon: User },
    { id: 'notifications', label: 'Notification Settings', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: ShieldCheck },
    { id: 'preferences', label: 'App Preferences', icon: Sliders },
  ];

  return (
    <div className="min-h-screen w-full bg-[#EBF6F8] font-sans text-[#0B2E33] space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-start text-2xl font-black text-[#0B2E33] tracking-tight">System Settings</h1>
          <p className="text-xs font-semibold text-[#4F7C82]">Manage your user account, security options, and financial preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaved}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0B2E33] hover:bg-[#4F7C82] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          {isSaved ? (
            <>
              <Check size={16} className="text-[#B8E3E9]" />
              <span>Saved Successfully</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-3 shadow-xs h-fit space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#B8E3E9] text-[#0B2E33] border border-[#93B1B5]/30' 
                    : 'text-[#4F7C82] hover:bg-[#EBF6F8] hover:text-[#0B2E33]'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#0B2E33]' : 'text-[#4F7C82]'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-3 bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-xs">
          
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-6">
              <h2 className="text-base font-bold text-[#0B2E33] border-b border-[#B8E3E9] pb-3">
                Profile Details
              </h2>

              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#B8E3E9] shadow-xs">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
                    alt="User Avatar"
                    className="w-full h-full object-cover" 
                  />
                  <button type="button" className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition cursor-pointer">
                    <Camera size={18} />
                  </button>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B2E33]">{profile.fullName}</h3>
                  <p className="text-xs font-semibold text-[#4F7C82]">{profile.role}</p>
                  <button type="button" className="mt-2 text-xs font-bold text-[#0B2E33] hover:underline cursor-pointer">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <label className="block text-[#0B2E33] mb-1 font-bold">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  />
                </div>

                <div>
                  <label className="block text-[#0B2E33] mb-1 font-bold">Email Address</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  />
                </div>

                <div>
                  <label className="block text-[#0B2E33] mb-1 font-bold">Role Title</label>
                  <input 
                    type="text" 
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  />
                </div>

                <div>
                  <label className="block text-[#0B2E33] mb-1 font-bold">Base Currency</label>
                  <select 
                    value={profile.currency}
                    onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-[#0B2E33] focus:outline-none focus:border-[#4F7C82] cursor-pointer"
                  >
                    <option value="USD ($)">USD ($) - US Dollar</option>
                    <option value="EUR (€)">EUR (€) - Euro</option>
                    <option value="GBP (£)">GBP (£) - British Pound</option>
                    <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B2E33] mb-1">Administrative Bio</label>
                <textarea 
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-xs font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82] resize-none"
                />
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-base font-bold text-[#0B2E33] border-b border-[#B8E3E9] pb-3">
                Notification Preferences
              </h2>

              <div className="space-y-4">
                {[
                  { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive automated emails for transactions and account updates.' },
                  { key: 'budgetWarnings', label: 'Budget Threshold Warnings', desc: 'Alert when a category spending exceeds 80% of budget limit.' },
                  { key: 'weeklyReports', label: 'Weekly Summary Digest', desc: 'Get a weekly summary report of all expenses and earnings.' },
                  { key: 'securityNotifs', label: 'Security & Login Alerts', desc: 'Get notified immediately about logins from unrecognized devices.' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-[#EBF6F8] rounded-2xl border border-[#B8E3E9]/60">
                    <div>
                      <h4 className="text-xs font-bold text-[#0B2E33]">{item.label}</h4>
                      <p className="text-[11px] font-semibold text-[#4F7C82] mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications[item.key]} 
                        onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#93B1B5]/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B2E33]" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-base font-bold text-[#0B2E33] border-b border-[#B8E3E9] pb-3">
                Security & Authentication
              </h2>

              <div className="flex items-center justify-between p-4 bg-[#EBF6F8] rounded-2xl border border-[#B8E3E9]/60">
                <div>
                  <h4 className="text-xs font-bold text-[#0B2E33] flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#4F7C82]" />
                    Two-Factor Authentication (2FA)
                  </h4>
                  <p className="text-[11px] font-semibold text-[#4F7C82] mt-0.5">Secure your portal login with an authenticator app code.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={security.twoFactor} 
                    onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#93B1B5]/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B2E33]" />
                </label>
              </div>

              <form onSubmit={handleSave} className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-[#0B2E33] uppercase tracking-wider">Update Password</h3>

                <div className="space-y-3 text-xs font-semibold">
                  <div>
                    <label className="block text-[#0B2E33] mb-1">Current Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={security.currentPassword}
                      onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                      className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#0B2E33] mb-1">New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        value={security.newPassword}
                        onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                        className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#0B2E33] mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        value={security.confirmPassword}
                        onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                        className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-base font-bold text-[#0B2E33] border-b border-[#B8E3E9] pb-3">
                Application Preferences
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <label className="block text-[#0B2E33] mb-1 font-bold">Language Format</label>
                  <select className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-[#0B2E33] focus:outline-none focus:border-[#4F7C82] cursor-pointer">
                    <option value="en">English (United States)</option>
                    <option value="es">Español (Spanish)</option>
                    <option value="fr">Français (French)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#0B2E33] mb-1 font-bold">Date Representation</label>
                  <select className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-[#0B2E33] focus:outline-none focus:border-[#4F7C82] cursor-pointer">
                    <option value="YYYY-MM-DD">YYYY-MM-DD (2026-08-12)</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY (12/08/2026)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (08/12/2026)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}