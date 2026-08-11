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
  ShieldCheck
} from 'lucide-react';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [userData, setUserData] = useState({
    name: 'Sourav',
    role: 'Financial Administrator',
    email: 'sourav@finance.io',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    bio: 'Finance administrator focused on portfolio management and financial operations.'
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

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('userSession');
    sessionStorage.removeItem('financeUser');
    setIsProfileOpen(false);
    navigate('/login');
  };

  const removeNotification = (id, e) => {
    e.stopPropagation(); 
    setNotifications(prev => prev.filter(item => item.id !== id));
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
    setTimeout(() => {
      setIsSaved(false);
      setIsProfileModalOpen(false);
    }, 1000);
  };

  const renderNotificationBadge = (type) => {
    switch (type) {
      case 'deadline':
        return (
          <span className="absolute -bottom-1 -right-1 p-0.5 bg-[#4F7C82] text-white rounded-full ring-2 ring-white">
            <Clock size={10} className="stroke-[3]" />
          </span>
        );
      case 'message':
        return (
          <span className="absolute -bottom-1 -right-1 p-0.5 bg-[#0B2E33] text-white rounded-full ring-2 ring-white">
            <MessageSquare size={10} className="stroke-[3]" />
          </span>
        );
      case 'meeting':
        return (
          <span className="absolute -bottom-1 -right-1 p-0.5 bg-[#93B1B5] text-[#0B2E33] rounded-full ring-2 ring-white">
            <Calendar size={10} className="stroke-[3]" />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className="w-full h-16 bg-white backdrop-blur-md font-sans border-b border-[#B8E3E9] px-4 sm:px-6 flex items-center justify-between select-none relative z-30 shadow-2xs">
        
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button 
            onClick={onMenuClick}
            className="p-2 lg:hidden rounded-lg bg-white shadow-xs border border-[#B8E3E9] text-[#0B2E33] hover:bg-[#B8E3E9]/30 transition-colors focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <Menu size={20} />
          </button>

          <div className="relative w-full max-w-sm">
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2E33] flex items-center gap-2 tracking-tight">
              {`Welcome, ${userData.name || 'there'}`} <span className="animate-bounce">💰</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <div className="h-6 w-[1px] bg-[#B8E3E9]"></div>

          <div className="relative">
            <button 
              onClick={toggleNotifications}
              className="relative p-2.5 bg-white rounded-full border border-[#B8E3E9] text-[#0B2E33] hover:bg-[#B8E3E9]/30 transition-all focus:outline-none hover:scale-105 active:scale-95 shadow-2xs"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-[#0B2E33]" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#4F7C82] rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {isNotificationsOpen && (
              <>
                <div onClick={() => setIsNotificationsOpen(false)} className="fixed inset-0 z-40" />
                <div className="absolute right-[-40px] sm:right-0 mt-3 w-[320px] sm:w-[350px] bg-white rounded-2xl border border-[#B8E3E9] shadow-xl py-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-5 pb-3 border-b border-[#B8E3E9]/50">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#0B2E33] text-sm">Notifications</h3>
                      <span className="bg-[#B8E3E9] text-[#0B2E33] font-extrabold text-xs px-2 py-0.5 rounded-full">
                        {notifications.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="max-h-[350px] overflow-y-auto divide-y divide-[#B8E3E9]/30">
                    {notifications.length === 0 ? (
                      <p className="text-center text-xs text-[#4F7C82] py-6 font-semibold">No new notifications</p>
                    ) : (
                      notifications.map(item => (
                        <div key={item.id} className="group relative flex items-start gap-3 px-5 py-3 hover:bg-[#EBF6F8] transition-colors cursor-pointer">
                          <div className="relative flex-shrink-0 mt-0.5">
                            <img src={item.img} alt="" className="w-8 h-8 rounded-full object-cover border border-[#B8E3E9]" />
                            {renderNotificationBadge(item.type)}
                          </div>

                          <div className="flex-1 min-w-0 pr-4">
                            <h4 className="text-xs font-bold text-[#0B2E33] truncate">{item.title}</h4>
                            <p className="text-[11px] text-[#4F7C82] font-semibold leading-snug line-clamp-2 mt-0.5">
                              {item.detail}
                            </p>
                            <span className="text-[10px] font-bold text-[#93B1B5] block mt-1">
                              {item.time}
                            </span>
                          </div>

                          <button 
                            onClick={(e) => removeNotification(item.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 bg-[#B8E3E9]/50 hover:bg-[#4F7C82]/20 text-[#0B2E33] rounded-md transition-all absolute right-4 top-3 focus:outline-none"
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

          <div className="h-6 w-[1px] bg-[#B8E3E9]"></div>

          <div className="relative">
            <button 
              onClick={toggleProfile}
              className="flex items-center gap-2 pl-1 pr-1 py-1 hover:bg-[#B8E3E9]/30 rounded-xl transition-all focus:outline-none"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" }}
                alt="Profile Avatar" 
                className="w-9 h-9 rounded-full object-cover border border-[#B8E3E9] shadow-2xs" 
              />
              <ChevronDown size={14} className={`text-[#4F7C82] transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-[#0B2E33]' : ''}`} />
            </button>

            {isProfileOpen && (
              <>
                <div onClick={() => setIsProfileOpen(false)} className="fixed inset-0 z-40" />
                <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl border border-[#B8E3E9] shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-3 px-4 py-2 mb-1">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                      alt="" 
                      className="w-10 h-10 rounded-full object-cover border border-[#B8E3E9]" 
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="text-xs font-bold text-[#0B2E33] truncate">{userData.name}</h4>
                      <p className="text-[11px] text-[#4F7C82] font-semibold truncate mt-0.5">{userData.role}</p>
                    </div>
                  </div>

                  <hr className="border-[#B8E3E9]/50 my-1 mx-3" />

                  <div className="px-2 py-1 space-y-0.5 text-left">
                    <button 
                      onClick={openProfileModal}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-[#0B2E33] hover:bg-[#B8E3E9]/40 rounded-xl transition-all cursor-pointer text-left border-0 bg-transparent"
                    >
                      <User size={16} className="text-[#4F7C82]" />
                      <span>My Profile</span>
                    </button>
                  </div>

                  <hr className="border-[#B8E3E9]/50 my-1 mx-3" />

                  <div className="px-2 pt-0.5 text-left">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-[#4F7C82] hover:text-[#0B2E33] hover:bg-[#B8E3E9]/40 rounded-xl transition-all cursor-pointer text-left border-0 bg-transparent"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </header>

      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-[#0B2E33]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#B8E3E9] shadow-2xl w-full max-w-lg overflow-hidden my-auto">
            
            <div className="bg-gradient-to-r from-[#0B2E33] to-[#4F7C82] h-28 relative p-4 flex justify-end items-start">
              <button 
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 relative pb-4 border-b border-[#B8E3E9]/50">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-3">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition cursor-pointer">
                    <Camera size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#B8E3E9]/40 border border-[#B8E3E9] rounded-full text-xs font-bold text-[#0B2E33] flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#4F7C82]" />
                    Verified Staff
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#0B2E33]">{userData.name}</h2>
                <p className="text-xs font-semibold text-[#4F7C82] mt-0.5">{userData.role} • {userData.location}</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0B2E33] mb-1">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-2.5 text-[#4F7C82]" />
                    <input 
                      type="text" 
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#0B2E33] mb-1">Job Role</label>
                  <div className="relative">
                    <Briefcase size={15} className="absolute left-3 top-2.5 text-[#4F7C82]" />
                    <input 
                      type="text" 
                      value={editFormData.role}
                      onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0B2E33] mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-2.5 text-[#4F7C82]" />
                  <input 
                    type="email" 
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0B2E33] mb-1">Bio</label>
                <textarea 
                  rows={3}
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                  className="w-full p-3 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#B8E3E9]/50">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 bg-[#EBF6F8] hover:bg-[#B8E3E9]/50 text-[#0B2E33] font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaved}
                  className="flex items-center gap-2 px-5 py-2 bg-[#0B2E33] hover:bg-[#4F7C82] text-white font-bold rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
                >
                  {isSaved ? (
                    <>
                      <Check size={16} className="text-[#B8E3E9]" />
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