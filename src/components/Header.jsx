import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  ChevronDown, 
  User, 
  LogOut,
  X,
  Clock,
  MessageSquare,
  Calendar,
  Mail,
  Briefcase,
  Camera,
  Check,
  ShieldCheck,
  Phone,
  MapPin,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [userData, setUserData] = useState({
    name: 'Sourav',
    role: 'Financial Administrator',
    email: 'sourav@finance.io',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    bio: 'Finance administrator focused on portfolio management and financial operations.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
  });

  const [editFormData, setEditFormData] = useState({ ...userData });
  const [isSaved, setIsSaved] = useState(false);

  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'deadline', 
      title: 'Quarterly Tax Review Due', 
      detail: 'Q3 expense reports & tax filings need approval', 
      time: '10 min ago', 
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' 
    },
    { 
      id: 2, 
      type: 'message', 
      title: 'New message from Auditor', 
      detail: 'Can you confirm last week’s travel reimbursement receipts?', 
      time: '25 min ago', 
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' 
    },
    { 
      id: 3, 
      type: 'meeting', 
      title: 'Budget Allocation Sync', 
      detail: 'Starts in 15 mins • Conference Room B', 
      time: '1 hour ago', 
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' 
    }
  ]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    const sessionData = sessionStorage.getItem('userSession') || sessionStorage.getItem('financeUser');
    const registeredData = sessionStorage.getItem('registeredUser');

    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);
      
      if (registeredData) {
        const parsedRegister = JSON.parse(registeredData);
        setUserData(prev => ({
          ...prev,
          name: parsedRegister.fullName || prev.name,
          email: parsedSession.email,
          role: parsedRegister.role || prev.role
        }));
      } else {
        setUserData(prev => ({
          ...prev,
          name: parsedSession.email ? parsedSession.email.split('@')[0] : prev.name,
          email: parsedSession.email || prev.email
        }));
      }
    }
  }, []);

  const confirmLogout = () => {
    sessionStorage.removeItem('userSession');
    sessionStorage.removeItem('financeUser');
    setIsProfileOpen(false);
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  const removeNotification = (id, e) => {
    e.stopPropagation(); 
    setNotifications(prev => prev.filter(item => item.id !== id));
    triggerToast('Notification cleared');
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false); 
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false); 
  };

  const openProfileModal = (e) => {
    e.preventDefault();
    setIsProfileOpen(false);
    setEditFormData({ ...userData });
    setIsProfileModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserData({ ...editFormData });
    setIsSaved(true);
    triggerToast('Profile changes saved successfully');
    setTimeout(() => {
      setIsSaved(false);
      setIsProfileModalOpen(false);
    }, 800);
  };

  const renderNotificationBadge = (type) => {
    switch (type) {
      case 'deadline':
        return (
          <span className="absolute -bottom-1 -right-1 p-0.5 bg-sky-600 text-white rounded-full ring-2 ring-white">
            <Clock size={10} className="stroke-[3]" />
          </span>
        );
      case 'message':
        return (
          <span className="absolute -bottom-1 -right-1 p-0.5 bg-slate-900 text-white rounded-full ring-2 ring-white">
            <MessageSquare size={10} className="stroke-[3]" />
          </span>
        );
      case 'meeting':
        return (
          <span className="absolute -bottom-1 -right-1 p-0.5 bg-indigo-500 text-white rounded-full ring-2 ring-white">
            <Calendar size={10} className="stroke-[3]" />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <Sparkles size={14} className="text-cyan-400" />
          {toastMessage}
        </div>
      )}

      <header className="w-full h-16 bg-white/90 backdrop-blur-md font-sans border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between select-none relative z-30 shadow-2xs">
        
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button 
            onClick={onMenuClick}
            className="p-2 lg:hidden rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <Menu size={18} />
          </button>

          <div className="relative w-full max-w-sm">
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
              {`Welcome, ${userData.name || 'there'}`} <span className="animate-bounce">💰</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <div className="h-6 w-[1px] bg-slate-200" />

          <div className="relative">
            <button 
              onClick={toggleNotifications}
              className="relative p-2.5 bg-slate-50 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all focus:outline-none hover:scale-105 active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-700" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-cyan-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {isNotificationsOpen && (
              <>
                <div onClick={() => setIsNotificationsOpen(false)} className="fixed inset-0 z-40" />
                <div className="absolute right-[-40px] sm:right-0 mt-3 w-[320px] sm:w-[350px] bg-white rounded-2xl border border-slate-200 shadow-2xl py-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-5 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-xs">Notifications</h3>
                      <span className="bg-cyan-50 text-cyan-700 font-bold text-[10px] px-2 py-0.5 rounded-full border border-cyan-200">
                        {notifications.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="max-h-[350px] overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <p className="text-center text-xs text-slate-400 py-6 font-semibold">No new notifications</p>
                    ) : (
                      notifications.map(item => (
                        <div key={item.id} className="group relative flex items-start gap-3 px-5 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                          <div className="relative flex-shrink-0 mt-0.5">
                            <img src={item.img} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                            {renderNotificationBadge(item.type)}
                          </div>

                          <div className="flex-1 min-w-0 pr-4">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                            <p className="text-[11px] text-slate-500 font-medium leading-snug line-clamp-2 mt-0.5">
                              {item.detail}
                            </p>
                            <span className="text-[10px] font-bold text-slate-400 block mt-1">
                              {item.time}
                            </span>
                          </div>

                          <button 
                            onClick={(e) => removeNotification(item.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-md transition-all absolute right-4 top-3 focus:outline-none"
                            aria-label="Dismiss notification"
                          >
                            <X size={12} className="stroke-[2.5]" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="h-6 w-[1px] bg-slate-200" />

          <div className="relative">
            <button 
              onClick={toggleProfile}
              className="flex items-center gap-2 p-1 hover:bg-slate-100 rounded-xl transition-all focus:outline-none"
            >
              <img 
                src={userData.avatar} 
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" }}
                alt="Profile Avatar" 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200" 
              />
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-slate-900' : ''}`} />
            </button>

            {isProfileOpen && (
              <>
                <div onClick={() => setIsProfileOpen(false)} className="fixed inset-0 z-40" />
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-3 px-4 py-2 mb-1">
                    <img 
                      src={userData.avatar} 
                      alt="" 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200" 
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{userData.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">{userData.role}</p>
                    </div>
                  </div>

                  <hr className="border-slate-100 my-2 mx-3" />

                  <div className="px-2 space-y-0.5 text-left">
                    <button 
                      onClick={openProfileModal}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                    >
                      <User size={15} className="text-cyan-600" />
                      <span>My Profile & Settings</span>
                    </button>
                  </div>

                  <hr className="border-slate-100 my-2 mx-3" />

                  <div className="px-2 text-left">
                    <button 
                      onClick={() => { setIsProfileOpen(false); setIsLogoutModalOpen(true); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                    >
                      <LogOut size={15} />
                      <span>Logout Session</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </header>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Confirm Logout</h3>
              <p className="text-xs text-slate-500 mt-1">Are you sure you want to exit your financial administration portal session?</p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
              >
                Logout Now
              </button>
            </div>
          </div>
        </div>
      )}

      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden my-auto">
            
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 h-28 relative p-4 flex justify-end items-start">
              <button 
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 relative pb-4 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-3">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-slate-900 group">
                  <img 
                    src={editFormData.avatar} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition cursor-pointer">
                    <Camera size={18} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = URL.createObjectURL(e.target.files[0]);
                          setEditFormData({ ...editFormData, avatar: url });
                          triggerToast('Preview avatar uploaded');
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-full text-xs font-bold text-cyan-700 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-cyan-600" />
                    Verified Admin Staff
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">{userData.name}</h2>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">{userData.role} • {userData.location}</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="text" 
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Job Role</label>
                  <div className="relative">
                    <Briefcase size={15} className="absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="text" 
                      value={editFormData.role}
                      onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="email" 
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="text" 
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-2.5 text-slate-400" />
                  <input 
                    type="text" 
                    value={editFormData.location}
                    onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bio</label>
                <textarea 
                  rows={3}
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaved}
                  className="flex items-center gap-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
                >
                  {isSaved ? (
                    <>
                      <Check size={16} />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
}