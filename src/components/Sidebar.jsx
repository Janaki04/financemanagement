import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  X,
  Wallet,
  Receipt,
  PlusCircle,
  PieChart,
  BarChart3,
  History,
  TrendingUp
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
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

  const activeClass = 
    "relative flex items-center gap-3.5 px-4 py-3 text-[#0B2E33] bg-[#B8E3E9] border border-[#93B1B5]/40 rounded-xl font-bold transition-all duration-200 group shadow-xs";
  
  const inactiveClass = 
    "flex items-center gap-3.5 px-4 py-3 text-[#0B2E33] hover:text-[#0B2E33] hover:bg-[#B8E3E9]/40 rounded-xl font-semibold transition-all duration-200";

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2.5 text-[#0B2E33] bg-white border border-[#B8E3E9] rounded-xl shadow-md lg:hidden hover:bg-[#B8E3E9]/30 focus:outline-none active:scale-95 transition-all"
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-[#0B2E33]/30 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-40 font-sans
          w-[260px] p-5 bg-[#4F7C82] text-[#B8E3E9] border-r border-[#B8E3E9]
          flex flex-col h-screen overflow-y-auto shadow-sm
          transform transition-all duration-300 ease-in-out
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between mb-8 mt-12 lg:mt-2 px-1">
          <div className="flex items-center gap-3">
            <div className="bg-[#0B2E33] text-[#B8E3E9] p-2 rounded-xl flex items-center justify-center shadow-xs">
              <Wallet className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xl font-black text-[#0B2E33] tracking-tight">Finance Portal</span>
          </div>
        </div>

        <div className="flex flex-col flex-1 w-full space-y-7">
          <div>
            <p className="px-4 text-[10px] font-bold text-[#93B1B5] tracking-widest uppercase mb-2">
              Main Menu
            </p>
            <nav className="space-y-1">
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon 
                          size={19} 
                          className={`shrink-0 transition-colors ${
                            isActive ? 'text-[#0B2E33]' : 'text-[#0B2E33] group-hover:text-[#0B2E33]'
                          }`} 
                        />
                        <span className="text-xs tracking-wide">{item.name}</span>
                        
                        {/* Right Active Indicator Pill */}
                        {isActive && (
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#0B2E33] rounded-l-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;