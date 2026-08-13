import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Menu,
  X,
  Wallet,
  Receipt,
  PlusCircle,
  PieChart,
  BarChart3,
  History,
  TrendingUp,
  LogOut,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  User,
  ExternalLink
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, userBalance = 24850 }) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isBalanceDetailsOpen, setIsBalanceDetailsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const mainMenuItems = [
    { name: 'Dashboard Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Income & Summary', icon: TrendingUp, path: '/summary' },
    { name: 'Expense Tracking', icon: Receipt, path: '/expenses' },
    { name: 'Manage Expense', icon: PlusCircle, path: '/manage-expense' },
    { name: 'Category Breakdown', icon: PieChart, path: '/categories' },
    { name: 'Expense Charts', icon: BarChart3, path: '/charts' },
    { name: 'Transaction History', icon: History, path: '/transactions' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleLogoutConfirm = () => {
    sessionStorage.removeItem('userSession');
    sessionStorage.removeItem('financeUser');
    setIsLogoutModalOpen(false);
    setIsOpen(false);
    triggerToast('Logged out successfully');
    navigate('/login');
  };

  return (
    <>
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <Sparkles size={14} className="text-cyan-400" />
          {toastMessage}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2.5 text-slate-200 bg-[#0F172A] border border-slate-800 rounded-xl shadow-lg lg:hidden hover:bg-slate-800 focus:outline-none active:scale-95 transition-all"
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-40 font-sans
          w-[270px] bg-slate-900 text-slate-300 border-r border-slate-800/80
          flex flex-col h-screen overflow-hidden shadow-2xl
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 text-white p-2.5 rounded-2xl shadow-md shadow-cyan-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-wide block leading-none">
                Finance<span className="text-cyan-400">Portal</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Personal Ledger</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-3 my-2">
          <div 
            onClick={() => setIsBalanceDetailsOpen(!isBalanceDetailsOpen)}
            className="p-3.5 bg-slate-800/50 border border-slate-800 rounded-2xl flex items-center justify-between group hover:border-slate-700 transition-colors cursor-pointer"
          >
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1">
                Total Balance
                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
              <p className="text-sm font-bold text-white mt-0.5">${userBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <span className="p-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-lg border border-emerald-500/20">
              +12.4%
            </span>
          </div>

          {isBalanceDetailsOpen && (
            <div className="mt-2 p-3 bg-slate-800/30 border border-slate-800 rounded-xl space-y-2 text-[11px] animate-in fade-in duration-200">
              <div className="flex justify-between text-slate-400">
                <span>Available Cash</span>
                <span className="font-bold text-slate-200">${(userBalance * 0.7).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Investments</span>
                <span className="font-bold text-cyan-400">${(userBalance * 0.3).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 px-4 overflow-y-auto space-y-1 custom-scrollbar">
          <p className="px-3 text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-2">
            Main Menu
          </p>
          <nav className="space-y-1.5">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/15 to-transparent text-cyan-300 font-semibold border-l-2 border-cyan-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          size={18}
                          className={`shrink-0 transition-colors ${
                            isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        />
                        <span className="tracking-wide">{item.name}</span>
                      </div>
                      
                      {isActive && (
                        <ChevronRight size={14} className="text-cyan-400 animate-pulse" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/50 transition-colors">
            <div 
              onClick={() => { navigate('/settings'); setIsOpen(false); }}
              className="flex items-center gap-3 cursor-pointer overflow-hidden"
            >
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-700"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-200 truncate">Alex Morgan</p>
                <p className="text-[10px] text-slate-400 truncate">Pro Account</p>
              </div>
            </div>

            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Confirm Logout</h3>
              <p className="text-xs text-slate-500 mt-1">Are you sure you want to end your current dashboard session?</p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
              >
                Logout Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;