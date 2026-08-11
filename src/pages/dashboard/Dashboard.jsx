import React, { useState } from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  Wallet, 
  Users, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight,
  CheckCircle2,
  Clock,
  PieChart as PieIcon,
  BarChart2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const PALETTE = {
  bgLight: '#F3F9FA',     
  cardBg: '#FFFFFF',      
  borderCyan: '#B8E3E9', 
  mutedCyan: '#93B1B5', 
  deepTeal: '#4F7C82', 
  darkTeal: '#0B2E33',
  alertRed: '#E53E3E', 
  alertGreen: '#2F855A'
};

const pieData = [
  { name: 'Food & Dining', value: 35, color: '#4F7C82' },
  { name: 'Transportation', value: 20, color: '#93B1B5' },
  { name: 'Shopping', value: 20, color: '#0B2E33' },
  { name: 'Utilities', value: 15, color: '#88BDC4' },
  { name: 'Others', value: 10, color: '#C6E8ED' }
];

const trendData = [
  { month: 'May', food: 160, transport: 160, shopping: 160 },
  { month: 'Jun', food: 190, transport: 165, shopping: 175 },
  { month: 'Jul', food: 190, transport: 175, shopping: 183 },
  { month: 'Aug', food: 190, transport: 175, shopping: 183 },
  { month: 'Sep', food: 220, transport: 175, shopping: 184 },
  { month: 'Oct', food: 230, transport: 185, shopping: 195 },
  { month: 'Nov', food: 260, transport: 185, shopping: 210 },
  { month: 'Dec', food: 275, transport: 190, shopping: 220 },
  { month: 'Jan', food: 275, transport: 200, shopping: 220 },
  { month: 'Feb', food: 275, transport: 200, shopping: 235 },
  { month: 'Mar', food: 275, transport: 200, shopping: 255 },
  { month: 'Apr', food: 275, transport: 210, shopping: 260 },
];

const initialTransactions = [
  { id: 1, description: 'Grocery Store', category: 'Food', amount: -85.50, status: 'Completed', date: '2026-05-28' },
  { id: 2, description: 'Salary Deposit', category: 'Income', amount: 3200.00, status: 'Pending', date: '2026-06-01' },
  { id: 3, description: 'Gas Station', category: 'Transportation', amount: -45.20, status: 'Completed', date: '2026-06-15' },
  { id: 4, description: 'Online Shopping', category: 'Shopping', amount: -129.99, status: 'Completed', date: '2026-06-30' },
  { id: 5, description: 'Restaurant Bill', category: 'Dining', amount: -78.50, status: 'Completed', date: '2026-07-10' },
  { id: 6, description: 'Gym Membership', category: 'Traveling', amount: -78.50, status: 'Pending', date: '2026-07-25' },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('YTD');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTransactions = initialTransactions.filter((tx) => {
    const matchesSearch = 
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen w-full bg-[#EBF6F8] font-sans text-[#0B2E33] space-y-6">
       <div>
          <h1 className="text-start text-[#0B2E33] text-2xl font-black tracking-tight">Dashboard</h1>
          <p className="text-start text-[#4F7C82] text-xs text-slate-500">Overview about Expenses,Income,Users and Budget</p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4F7C82]">Total Expenses</p>
            <div className="p-2 rounded-xl bg-[#E53E3E]/10 text-[#E53E3E]">
              <TrendingDown size={18} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-[#0B2E33]">$15,240</h3>
            <span className="inline-flex items-center text-[11px] font-bold text-[#E53E3E] bg-[#E53E3E]/10 px-2 py-0.5 rounded-full">
              <ArrowDownRight size={12} className="mr-0.5" /> 8.2%
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4F7C82]">Total Income</p>
            <div className="p-2 rounded-xl bg-[#2F855A]/10 text-[#2F855A]">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-[#0B2E33]">$17,000</h3>
            <span className="inline-flex items-center text-[11px] font-bold text-[#2F855A] bg-[#2F855A]/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={12} className="mr-0.5" /> 12.1%
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4F7C82]">Budget Remaining</p>
            <div className="p-2 rounded-xl bg-[#4F7C82]/10 text-[#4F7C82]">
              <Wallet size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#0B2E33]">$1,760</h3>
            <div className="w-full bg-[#B8E3E9]/50 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-[#4F7C82] h-1.5 rounded-full" style={{ width: '68%' }} />
            </div>
            <p className="text-[10px] text-[#4F7C82] font-medium mt-1">68% remaining</p>
          </div>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4F7C82]">Active Users</p>
            <div className="p-2 rounded-xl bg-[#0B2E33]/10 text-[#0B2E33]">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-[#0B2E33]">1,248</h3>
            <span className="inline-flex items-center text-[11px] font-bold text-[#2F855A] bg-[#2F855A]/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={12} className="mr-0.5" /> 5.4%
            </span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#0B2E33] tracking-tight flex items-center gap-2">
              <PieIcon size={18} className="text-[#4F7C82]" />
              Category Breakdown
            </h2>
          </div>
          
          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#B8E3E9]/60">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs font-semibold text-[#4F7C82]">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-bold text-[#0B2E33] tracking-tight flex items-center gap-2">
              <BarChart2 size={18} className="text-[#4F7C82]" />
              Expense Trends
            </h2>
            <div className="flex items-center gap-1 bg-[#F3F9FA] border border-[#B8E3E9] p-1 rounded-xl self-start sm:self-auto">
              {['6M', 'YTD', 'All'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    timeRange === range
                      ? 'bg-[#4F7C82] text-white shadow-xs'
                      : 'text-[#4F7C82] hover:bg-[#B8E3E9]/40'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PALETTE.deepTeal} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={PALETTE.deepTeal} stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorShop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PALETTE.darkTeal} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={PALETTE.darkTeal} stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorTrans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PALETTE.mutedCyan} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={PALETTE.mutedCyan} stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke={PALETTE.deepTeal} fontSize={11} tickLine={false} />
                <YAxis stroke={PALETTE.deepTeal} fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: PALETTE.borderCyan, borderRadius: '12px', fontSize: '12px', color: PALETTE.darkTeal }}
                />
                <Area type="monotone" dataKey="food" stroke={PALETTE.deepTeal} strokeWidth={2.5} fillOpacity={1} fill="url(#colorFood)" />
                <Area type="monotone" dataKey="shopping" stroke={PALETTE.darkTeal} strokeWidth={2.5} fillOpacity={1} fill="url(#colorShop)" />
                <Area type="monotone" dataKey="transport" stroke={PALETTE.mutedCyan} strokeWidth={2.5} fillOpacity={1} fill="url(#colorTrans)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#B8E3E9]/60 text-xs text-[#4F7C82] font-semibold">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#4F7C82]" /> Food & Dining</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#0B2E33]" /> Shopping</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#93B1B5]" /> Transportation</span>
          </div>

        </div>

      </div>

      <div className="bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-[#0B2E33] tracking-tight">Recent Transactions</h2>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4F7C82]" />
              <input 
                type="text"
                placeholder="Search description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#F3F9FA] border border-[#B8E3E9] rounded-xl text-xs text-[#0B2E33] placeholder-[#4F7C82]/60 focus:outline-none focus:border-[#4F7C82] transition-all"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#F3F9FA] border border-[#B8E3E9] rounded-xl px-3 py-2 text-xs text-[#0B2E33] font-semibold focus:outline-none focus:border-[#4F7C82] cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-[#4F7C82]">
            <thead>
              <tr className="border-b border-[#B8E3E9] text-[#0B2E33] uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8E3E9]/40">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#F3F9FA] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0B2E33]">{tx.description}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#4F7C82]">{tx.category}</td>
                    <td className={`py-3.5 px-4 font-black ${tx.amount > 0 ? 'text-[#2F855A]' : 'text-[#E53E3E]'}`}>
                      {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        tx.status === 'Completed' 
                          ? 'bg-[#2F855A]/10 text-[#2F855A] border border-[#2F855A]/20' 
                          : 'bg-[#D69E2E]/10 text-[#D69E2E] border border-[#D69E2E]/20'
                      }`}>
                        {tx.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#4F7C82]">{tx.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-[#4F7C82]">
                    No transactions found matching your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}