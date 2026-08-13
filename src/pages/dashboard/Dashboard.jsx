import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  Receipt,
  PlusCircle,
  PieChart as PieIcon,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Users,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  Plus,
  Download,
  Sparkles,
  Trash2,
  ArrowUpDown,
  SlidersHorizontal,
  RefreshCw,
  X,
  CreditCard
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

const CATEGORY_COLORS = {
  'Food & Dining': '#0EA5E9',
  'Transportation': '#3B82F6',
  'Shopping': '#6366F1',
  'Utilities': '#8B5CF6',
  'Income': '#10B981',
  'Others': '#CBD5E1'
};

const INITIAL_TRANSACTIONS = [
  { id: 1, description: 'Whole Foods Market', category: 'Food & Dining', amount: -124.50, status: 'Completed', date: '2026-05-28' },
  { id: 2, description: 'Tech Corp Salary', category: 'Income', amount: 4850.00, status: 'Completed', date: '2026-06-01' },
  { id: 3, description: 'Shell Gas Station', category: 'Transportation', amount: -52.20, status: 'Completed', date: '2026-06-15' },
  { id: 4, description: 'Amazon Electronics', category: 'Shopping', amount: -219.99, status: 'Completed', date: '2026-06-30' },
  { id: 5, description: 'Bistro Fine Dining', category: 'Food & Dining', amount: -88.50, status: 'Pending', date: '2026-07-10' },
  { id: 6, description: 'Equinox Gym Pass', category: 'Utilities', amount: -95.00, status: 'Pending', date: '2026-07-25' },
];

const RAW_TREND_DATA = [
  { month: 'May', food: 160, shopping: 140 },
  { month: 'Jun', food: 190, shopping: 175 },
  { month: 'Jul', food: 210, shopping: 160 },
  { month: 'Aug', food: 180, shopping: 183 },
  { month: 'Sep', food: 220, shopping: 190 },
  { month: 'Oct', food: 240, shopping: 210 },
  { month: 'Nov', food: 260, shopping: 230 },
  { month: 'Dec', food: 310, shopping: 290 },
  { month: 'Jan', food: 275, shopping: 220 },
  { month: 'Feb', food: 290, shopping: 240 },
  { month: 'Mar', food: 320, shopping: 255 },
  { month: 'Apr', food: 350, shopping: 280 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1">
        <p className="font-bold text-slate-300 mb-1">{label} Summary</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-400 capitalize">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-semibold text-slate-100">${entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AdjustCapsModal = ({ isOpen, onClose, currentCap, onSave }) => {
  const [cap, setCap] = useState(currentCap);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Adjust Spending Cap</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3 text-xs">
          <label className="block font-bold text-slate-700">Food & Dining Limit ($)</label>
          <input
            type="number"
            value={cap}
            onChange={(e) => setCap(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs">
            Cancel
          </button>
          <button 
            onClick={() => { onSave(cap); onClose(); }} 
            className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-xl text-xs hover:bg-cyan-700"
          >
            Update Limit
          </button>
        </div>
      </div>
    </div>
  );
};

const AddTransactionModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    description: '',
    category: 'Food & Dining',
    amount: '',
    type: 'Expense',
    status: 'Completed',
    date: new Date().toISOString().split('T')[0]
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    const rawAmount = parseFloat(formData.amount);
    const finalAmount = formData.type === 'Expense' ? -Math.abs(rawAmount) : Math.abs(rawAmount);

    onAdd({
      id: Date.now(),
      description: formData.description,
      category: formData.type === 'Income' ? 'Income' : formData.category,
      amount: finalAmount,
      status: formData.status,
      date: formData.date
    });

    onClose();
    setFormData({
      description: '',
      category: 'Food & Dining',
      amount: '',
      type: 'Expense',
      status: 'Completed',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Add New Entry</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'Expense' })}
                className={`py-2 rounded-xl font-bold transition-all ${
                  formData.type === 'Expense' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'Income' })}
                className={`py-2 rounded-xl font-bold transition-all ${
                  formData.type === 'Income' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Income
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description</label>
            <input
              type="text"
              required
              placeholder="e.g. Grocery Store"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Amount ($)</label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
              />
            </div>
            {formData.type === 'Expense' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                >
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 shadow-sm"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCapModalOpen, setIsCapModalOpen] = useState(false);
  const [diningCap, setDiningCap] = useState(250);
  const [timeRange, setTimeRange] = useState('6M');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortAsc, setSortAsc] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const savedCards = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('userCards') || '[]');
    } catch {
      return [];
    }
  }, []);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }, [transactions]);

  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const netBalance = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  const categoryBreakdownData = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.amount < 0)
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + Math.abs(t.amount);
      });

    return Object.keys(map).map((cat) => ({
      name: cat,
      value: Math.round(map[cat]),
      color: CATEGORY_COLORS[cat] || CATEGORY_COLORS.Others
    }));
  }, [transactions]);

  const filteredTrendData = useMemo(() => {
    if (timeRange === '6M') return RAW_TREND_DATA.slice(-6);
    if (timeRange === 'YTD') return RAW_TREND_DATA.slice(-8);
    return RAW_TREND_DATA;
  }, [timeRange]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesSearch =
          tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
        const matchesCategory = categoryFilter === 'All' || tx.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortAsc ? dateA - dateB : dateB - dateA;
      });
  }, [transactions, searchTerm, statusFilter, categoryFilter, sortAsc]);

  const handleAddTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
    triggerToast('Transaction added successfully!');
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    triggerToast('Transaction deleted');
  };

  const handleToggleStatus = (id) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id
          ? { ...tx, status: tx.status === 'Completed' ? 'Pending' : 'Completed' }
          : tx
      )
    );
    triggerToast('Status updated');
  };

  const handleExportCSV = () => {
    const headers = ['ID,Description,Category,Amount,Status,Date\n'];
    const rows = filteredTransactions.map(
      (t) => `${t.id},"${t.description}","${t.category}",${t.amount},${t.status},${t.date}`
    );
    const blob = new Blob([...headers, rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-export.csv`;
    a.click();
    triggerToast('Exported CSV report');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setCategoryFilter('All');
    setSortAsc(false);
    triggerToast('Filters reset');
  };

  return (
    <div className="min-h-screen w-full bg-transparent font-sans text-slate-800 space-y-6 relative">
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <Sparkles size={14} className="text-cyan-400" />
          {toastMessage}
        </div>
      )}

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />
      
      <AdjustCapsModal
        isOpen={isCapModalOpen}
        onClose={() => setIsCapModalOpen(false)}
        currentCap={diningCap}
        onSave={(newCap) => { setDiningCap(newCap); triggerToast('Budget cap updated'); }}
      />

      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
              <Sparkles size={14} />
              <span>Smart Financial Analytics</span>
            </div>
            <h1 className="text-start text-2xl sm:text-3xl font-black tracking-tight text-white">Financial Dashboard</h1>
            <p className="text-start text-slate-400 text-xs sm:text-sm mt-0.5">Real-time breakdown of expenses, income, users, and remaining allocation.</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-all active:scale-95"
            >
              <Download size={15} />
              <span>Export Report</span>
            </button>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-sm"
            >
              <Plus size={15} />
              <span>Quick Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Expenses</p>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
              <TrendingDown size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900">${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              <ArrowDownRight size={12} /> Live
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Income</p>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900">${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <ArrowUpRight size={12} /> Live
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Balance</p>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600">
              <Wallet size={18} />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-slate-900">${netBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
              <span className="text-[11px] font-bold text-cyan-700">Calculated</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
              <div 
                className="bg-cyan-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(Math.max((netBalance / (totalIncome || 1)) * 100, 5), 100)}%` }} 
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Members</p>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900">1,248</h3>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <ArrowUpRight size={12} /> 5.4%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CreditCard size={18} className="text-cyan-600" />
              Linked Card Expenses
            </h2>
            <p className="text-[11px] text-slate-400">Track outgoings, limits, and progress on active cards</p>
          </div>
          <button 
            onClick={() => navigate('/add-card')}
            className="flex items-center gap-1 text-xs font-bold text-cyan-600 hover:text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-xl border border-cyan-200 transition-all active:scale-95"
          >
            <Plus size={14} />
            <span>Add New Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedCards.length > 0 ? (
            savedCards.map((card) => {
              const spent = card.currentSpent || 1240.50;
              const limit = parseFloat(card.spendingLimit) || 5000;
              const percentage = Math.min(Math.round((spent / limit) * 100), 100);

              return (
                <div key={card.id} className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-200">{card.cardName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">•••• •••• •••• {card.lastFour || '4242'}</p>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-md border border-cyan-500/30">
                      {card.cardType}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1 text-xs">
                      <span className="text-slate-400">Outflow / Limit</span>
                      <span className="font-bold text-white">${spent.toFixed(2)} / ${limit.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          percentage > 85 ? 'bg-rose-500' : 'bg-cyan-400'
                        }`} 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-1 md:col-span-2 py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2">
              <CreditCard size={24} className="text-slate-300" />
              <p>No active cards linked yet.</p>
              <button
                onClick={() => navigate('/add-card')}
                className="text-cyan-600 font-bold hover:underline text-xs"
              >
                Link a payment card now
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-transparent border border-cyan-500/20 rounded-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500 text-white rounded-xl shadow-md shadow-cyan-500/20 shrink-0">
            <Sparkles size={18} />
          </div>
          <p className="text-xs font-medium text-slate-700">
            <strong className="text-slate-900 font-bold">Smart Insight:</strong> Food & Dining capped limit is set to <span className="text-cyan-700 font-bold">${diningCap}</span>. You can adjust limits dynamically.
          </p>
        </div>
        <button 
          onClick={() => setIsCapModalOpen(true)}
          className="hidden sm:flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-800 transition-colors shrink-0"
        >
          <span>Adjust Caps</span>
          <SlidersHorizontal size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <PieIcon size={18} className="text-cyan-600" />
              Category Breakdown
            </h2>
            {categoryFilter !== 'All' && (
              <button 
                onClick={() => setCategoryFilter('All')} 
                className="text-[10px] text-cyan-600 font-bold hover:underline"
              >
                Clear Slice
              </button>
            )}
          </div>
          <div className="h-60 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryBreakdownData} innerRadius={68} outerRadius={90} paddingAngle={5} dataKey="value">
                  {categoryBreakdownData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="#FFFFFF" 
                      strokeWidth={2}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        setCategoryFilter(entry.name);
                        triggerToast(`Filtered by ${entry.name}`);
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-semibold text-slate-400">Total Expenses</span>
              <span className="text-xl font-black text-slate-900">${totalExpenses.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BarChart2 size={18} className="text-cyan-600" />
              Expense Trends
            </h2>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {['6M', 'YTD', 'All'].map((range) => (
                <button
                  key={range}
                  onClick={() => { setTimeRange(range); triggerToast(`Timeline: ${range}`); }}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    timeRange === range ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="food" name="Food" stroke="#0EA5E9" strokeWidth={2.5} fill="#0EA5E9" fillOpacity={0.15} />
                <Area type="monotone" dataKey="shopping" name="Shopping" stroke="#6366F1" strokeWidth={2.5} fill="#6366F1" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Recent Transactions</h2>
            <p className="text-[11px] text-slate-400">Search, filter, toggle status, or remove records</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Categories</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Transportation">Transportation</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
              <option value="Income">Income</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>

            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="p-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600"
              title="Sort Order Toggle"
            >
              <ArrowUpDown size={15} />
            </button>

            <button
              onClick={handleResetFilters}
              className="p-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600"
              title="Reset Filters"
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-600">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{tx.description}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-semibold">
                        {tx.category}
                      </span>
                    </td>
                    <td className={`py-3.5 px-4 font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStatus(tx.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-transform active:scale-95 ${
                          tx.status === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}
                      >
                        {tx.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {tx.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-400">{tx.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteTransaction(tx.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No transactions found.
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