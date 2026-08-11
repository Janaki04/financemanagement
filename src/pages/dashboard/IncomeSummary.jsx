import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PiggyBank, 
  Search, 
  Plus, 
  X, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { toast } from 'react-toastify';

const PALETTE = {
  lightCyan: '#B8E3E9',
  mutedCyan: '#93B1B5',
  deepTeal: '#4F7C82',
  darkTeal: '#0B2E33',
  pageBg: '#EBF6F8'
};

const initialChartData = [
  { month: 'Jan', Income: 4200, Expenses: 2400 },
  { month: 'Feb', Income: 3800, Expenses: 2100 },
  { month: 'Mar', Income: 5100, Expenses: 3200 },
  { month: 'Apr', Income: 4600, Expenses: 2800 },
  { month: 'May', Income: 5500, Expenses: 3100 },
  { month: 'Jun', Income: 6000, Expenses: 3500 },
];

const initialIncomes = [
  { id: 1, source: 'Primary Salary', category: 'Salary', amount: 4500.00, status: 'Received', date: '2026-08-01' },
  { id: 2, description: 'Freelance Project', source: 'Client Work', category: 'Freelance', amount: 850.00, status: 'Received', date: '2026-08-05' },
  { id: 3, source: 'Stock Dividend', category: 'Investment', amount: 240.50, status: 'Pending', date: '2026-08-10' },
  { id: 4, source: 'Consulting Retainer', category: 'Business', amount: 1200.00, status: 'Received', date: '2026-08-11' },
];

export default function IncomeSummary() {
  const [incomes, setIncomes] = useState(initialIncomes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newIncome, setNewIncome] = useState({
    source: '',
    category: 'Salary',
    amount: '',
    status: 'Received',
    date: new Date().toISOString().split('T')[0]
  });

  const totalIncome = incomes.reduce((acc, curr) => acc + (curr.amount > 0 ? curr.amount : 0), 0);
  const pendingIncome = incomes
    .filter(item => item.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const netSavings = totalIncome - 3500; // Mocked expense deduction for summary demo

  const filteredIncomes = incomes.filter((item) => {
    const matchesSearch = item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddIncome = (e) => {
    e.preventDefault();
    if (!newIncome.source || !newIncome.amount) return;

    const itemToAdd = {
      id: Date.now(),
      source: newIncome.source,
      category: newIncome.category,
      amount: parseFloat(newIncome.amount),
      status: newIncome.status,
      date: newIncome.date
    };

    setIncomes([itemToAdd, ...incomes]);
    toast.success('Income source added successfully!');      
    setNewIncome({
      source: '',
      category: 'Salary',
      amount: '',
      status: 'Received',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#EBF6F8] font-sans text-[#0B2E33] space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-start text-2xl font-black text-[#0B2E33] tracking-tight">Income & Summary</h1>
          <p className="text-xs font-semibold text-[#4F7C82]">Track your revenue streams and cashflow performance</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B2E33] hover:bg-[#4F7C82] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Income Stream</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4F7C82]">Total Revenue</p>
            <div className="p-2 rounded-xl bg-[#0B2E33]/10 text-[#0B2E33]">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-[#0B2E33]">${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            <span className="inline-flex items-center text-[11px] font-bold text-[#0B2E33] bg-[#B8E3E9]/50 px-2 py-0.5 rounded-full border border-[#93B1B5]/30">
              <ArrowUpRight size={12} className="mr-0.5" /> +14.2%
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4F7C82]">Pending Payments</p>
            <div className="p-2 rounded-xl bg-[#4F7C82]/10 text-[#4F7C82]">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-[#0B2E33]">${pendingIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            <span className="inline-flex items-center text-[11px] font-bold text-[#4F7C82] bg-[#B8E3E9]/50 px-2 py-0.5 rounded-full border border-[#93B1B5]/30">
              {incomes.filter(i => i.status === 'Pending').length} Pending
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4F7C82]">Net Savings</p>
            <div className="p-2 rounded-xl bg-[#4F7C82]/10 text-[#4F7C82]">
              <PiggyBank size={18} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-[#0B2E33]">${netSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            <span className="inline-flex items-center text-[11px] font-bold text-[#0B2E33] bg-[#B8E3E9]/50 px-2 py-0.5 rounded-full border border-[#93B1B5]/30">
              <ArrowUpRight size={12} className="mr-0.5" /> +8.5%
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4F7C82]">Liquidity Reserve</p>
            <div className="p-2 rounded-xl bg-[#93B1B5]/20 text-[#0B2E33]">
              <Wallet size={18} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-[#0B2E33]">82.4%</h3>
            <span className="inline-flex items-center text-[11px] font-bold text-[#0B2E33] bg-[#B8E3E9]/50 px-2 py-0.5 rounded-full border border-[#93B1B5]/30">
              Healthy
            </span>
          </div>
        </div>

      </div>

      <div className="bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0B2E33] tracking-tight">Income vs Expense Comparison</h2>
          <span className="text-xs font-bold text-[#4F7C82] bg-[#EBF6F8] px-3 py-1 rounded-xl border border-[#B8E3E9]">2026 Analytics</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={initialChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" stroke={PALETTE.deepTeal} fontSize={11} tickLine={false} />
              <YAxis stroke={PALETTE.deepTeal} fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: PALETTE.lightCyan, borderRadius: '12px', fontSize: '12px', color: PALETTE.darkTeal }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Income" fill={PALETTE.darkTeal} radius={[6, 6, 0, 0]} />
              <Bar dataKey="Expenses" fill={PALETTE.deepTeal} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-[#0B2E33] tracking-tight">Income Sources</h2>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4F7C82]" />
              <input 
                type="text"
                placeholder="Search income source..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-xs text-[#0B2E33] placeholder-[#4F7C82]/70 focus:outline-none focus:border-[#4F7C82]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl px-3 py-2 text-xs text-[#0B2E33] font-semibold focus:outline-none focus:border-[#4F7C82] cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Received">Received</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-[#4F7C82]">
            <thead>
              <tr className="border-b border-[#B8E3E9] text-[#0B2E33] uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8E3E9]/50">
              {filteredIncomes.length > 0 ? (
                filteredIncomes.map((item) => (
                  <tr key={item.id} className="hover:bg-[#EBF6F8] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0B2E33]">{item.source}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#4F7C82]">{item.category}</td>
                    <td className="py-3.5 px-4 font-black text-[#0B2E33]">
                      +${item.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'Received' 
                          ? 'bg-[#B8E3E9] text-[#0B2E33] border border-[#93B1B5]/40' 
                          : 'bg-[#93B1B5]/20 text-[#4F7C82] border border-[#93B1B5]/40'
                      }`}>
                        {item.status === 'Received' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#4F7C82]">{item.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-[#4F7C82]">
                    No income sources found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0B2E33]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#B8E3E9] shadow-2xl w-full max-w-md p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#B8E3E9] pb-3">
              <h3 className="text-base font-bold text-[#0B2E33]">Add Income Source</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-[#4F7C82] hover:bg-[#EBF6F8]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddIncome} className="space-y-3 text-xs">
              <div>
                <label className="flex font-bold text-[#0B2E33] mb-1">Source Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Client Payment / Bonus"
                  value={newIncome.source}
                  onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })}
                  className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex font-bold text-[#0B2E33] mb-1">Category</label>
                  <select
                    value={newIncome.category}
                    onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  >
                    <option value="Salary">Salary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Investment">Investment</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="flex font-bold text-[#0B2E33] mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    value={newIncome.amount}
                    onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex font-bold text-[#0B2E33] mb-1">Status</label>
                  <select
                    value={newIncome.status}
                    onChange={(e) => setNewIncome({ ...newIncome, status: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  >
                    <option value="Received">Received</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className="flex font-bold text-[#0B2E33] mb-1">Date</label>
                  <input 
                    type="date" 
                    value={newIncome.date}
                    onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#B8E3E9]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#EBF6F8] hover:bg-[#B8E3E9]/50 text-[#0B2E33] font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2E33] hover:bg-[#4F7C82] text-white font-bold rounded-xl transition shadow-xs active:scale-95"
                >
                  Save Entry
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}