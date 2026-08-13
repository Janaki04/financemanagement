import React, { useState, useMemo } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  X, 
  CheckCircle2, 
  Clock, 
  TrendingDown,
  Sparkles,
  Download,
  ArrowUpDown,
  Utensils,
  Zap,
  Car,
  Laptop,
  MoreHorizontal,
  BarChart2,
  PieChart as PieIcon
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
  'Food & Dining': { color: '#0EA5E9', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', icon: Utensils },
  'Utilities': { color: '#8B5CF6', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: Zap },
  'Transportation': { color: '#3B82F6', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Car },
  'Software': { color: '#6366F1', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', icon: Laptop },
  'Other': { color: '#94A3B8', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', icon: MoreHorizontal }
};

const initialExpenses = [
  { id: 1, title: 'Grocery Shopping', category: 'Food & Dining', amount: 85.50, paymentMethod: 'Credit Card', status: 'Paid', date: '2026-08-02' },
  { id: 2, title: 'Electric Bill', category: 'Utilities', amount: 142.30, paymentMethod: 'Bank Transfer', status: 'Pending', date: '2026-08-04' },
  { id: 3, title: 'Gas Station', category: 'Transportation', amount: 45.20, paymentMethod: 'Debit Card', status: 'Paid', date: '2026-08-06' },
  { id: 4, title: 'Software Subscription', category: 'Software', amount: 29.99, paymentMethod: 'Credit Card', status: 'Paid', date: '2026-08-08' },
  { id: 5, title: 'Team Lunch', category: 'Food & Dining', amount: 112.00, paymentMethod: 'Corporate Card', status: 'Pending', date: '2026-08-10' },
];

const RAW_TREND_DATA = [
  { month: 'Mar', amount: 220 },
  { month: 'Apr', amount: 310 },
  { month: 'May', amount: 180 },
  { month: 'Jun', amount: 290 },
  { month: 'Jul', amount: 340 },
  { month: 'Aug', amount: 414.99 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1">
        <p className="font-bold text-slate-300 mb-1">{label} Summary</p>
        <p className="text-cyan-400 font-bold">${payload[0].value.toFixed(2)} Total Outflow</p>
      </div>
    );
  }
  return null;
};

export default function ExpenseTracking() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [timeRange, setTimeRange] = useState('6M');
  const [sortAsc, setSortAsc] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Food & Dining',
    amount: '',
    paymentMethod: 'Credit Card',
    status: 'Paid',
    date: new Date().toISOString().split('T')[0]
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const totalExpenseAmount = useMemo(() => expenses.reduce((acc, curr) => acc + curr.amount, 0), [expenses]);
  const paidExpensesAmount = useMemo(() => expenses.filter(e => e.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0), [expenses]);
  const pendingExpensesAmount = useMemo(() => expenses.filter(e => e.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0), [expenses]);

  const categoryBreakdownData = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });

    return Object.keys(map).map((cat) => ({
      name: cat,
      value: Math.round(map[cat]),
      color: CATEGORY_COLORS[cat]?.color || CATEGORY_COLORS['Other'].color
    }));
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
        const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortAsc ? dateA - dateB : dateB - dateA;
      });
  }, [expenses, searchTerm, categoryFilter, statusFilter, sortAsc]);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Food & Dining',
      amount: '',
      paymentMethod: 'Credit Card',
      status: 'Paid',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (expense) => {
    setEditingId(expense.id);
    setFormData({ ...expense, amount: expense.amount.toString() });
    setIsModalOpen(true);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
    triggerToast('Expense deleted');
  };

  const handleToggleStatus = (id) => {
    setExpenses(prev => prev.map(item => 
      item.id === id ? { ...item, status: item.status === 'Paid' ? 'Pending' : 'Paid' } : item
    ));
    triggerToast('Expense status updated');
  };

  const handleExportCSV = () => {
    const headers = ['ID,Title,Category,PaymentMethod,Amount,Status,Date\n'];
    const rows = filteredExpenses.map(e => `${e.id},"${e.title}","${e.category}","${e.paymentMethod}",${e.amount},${e.status},${e.date}`);
    const blob = new Blob([...headers, rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-export.csv`;
    a.click();
    triggerToast('CSV report exported');
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    if (editingId) {
      setExpenses(prev => prev.map(item => item.id === editingId ? {
        ...formData,
        id: editingId,
        amount: parseFloat(formData.amount)
      } : item));
      triggerToast('Expense updated');
    } else {
      const newEntry = {
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount)
      };
      setExpenses([newEntry, ...expenses]);
      triggerToast('New expense recorded!');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-transparent font-sans text-slate-800 space-y-6 relative">
      
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <Sparkles size={14} className="text-cyan-400" />
          {toastMessage}
        </div>
      )}

      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
              <Receipt size={14} />
              <span>Outflow Ledger</span>
            </div>
            <h1 className="text-start text-2xl sm:text-3xl font-black tracking-tight text-white">Expense Tracking</h1>
            <p className="text-start text-slate-400 text-xs sm:text-sm mt-0.5">Monitor, filter, and audit your daily outgoings with analytics.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-all active:scale-95"
            >
              <Download size={15} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-sm"
            >
              <Plus size={16} />
              <span>Record Expense</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Outflow</p>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
              <TrendingDown size={18} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900">${totalExpenseAmount.toFixed(2)}</h3>
            <p className="text-[11px] font-semibold text-slate-400 mt-1">{expenses.length} Records logged</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Settled Expenses</p>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900">${paidExpensesAmount.toFixed(2)}</h3>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1">{expenses.filter(e => e.status === 'Paid').length} Paid items</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Settlement</p>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900">${pendingExpensesAmount.toFixed(2)}</h3>
            <p className="text-[11px] font-semibold text-amber-600 mt-1">{expenses.filter(e => e.status === 'Pending').length} Pending review</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <PieIcon size={18} className="text-cyan-600" />
              Category Share
            </h2>
            {categoryFilter !== 'All' && (
              <button 
                onClick={() => setCategoryFilter('All')} 
                className="text-[10px] text-cyan-600 font-bold hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryBreakdownData} innerRadius={65} outerRadius={88} paddingAngle={5} dataKey="value">
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
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Total</span>
              <span className="text-xl font-black text-slate-900">${totalExpenseAmount.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BarChart2 size={18} className="text-cyan-600" />
              Outflow Timeline Trend
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
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RAW_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="amount" stroke="#0EA5E9" strokeWidth={2.5} fill="#0EA5E9" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Expense Ledger</h2>
            <p className="text-[11px] text-slate-400">Filter, edit, or delete existing transaction logs</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Utilities">Utilities</option>
              <option value="Transportation">Transportation</option>
              <option value="Software">Software</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="p-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600"
              title="Toggle Date Sort Order"
            >
              <ArrowUpDown size={15} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-600">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => {
                  const CategoryStyle = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS['Other'];
                  const Icon = CategoryStyle.icon;

                  return (
                    <tr key={expense.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{expense.title}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${CategoryStyle.bg} ${CategoryStyle.text} ${CategoryStyle.border}`}>
                          <Icon size={12} />
                          {expense.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-500">{expense.paymentMethod}</td>
                      <td className="py-3.5 px-4 font-black text-slate-900">${expense.amount.toFixed(2)}</td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleStatus(expense.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-transform active:scale-95 ${
                            expense.status === 'Paid' 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                              : 'bg-amber-50 text-amber-600 border border-amber-200'
                          }`}
                        >
                          {expense.status === 'Paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          {expense.status}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-400">{expense.date}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => handleOpenEditModal(expense)}
                            className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No expense records matching your selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Expense Record' : 'Record New Expense'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Expense Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Office Supplies"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Software">Software</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Corporate Card">Corporate Card</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl transition shadow-xs active:scale-95"
                >
                  {editingId ? 'Update Record' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}