import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  X, 
  CheckCircle2, 
  Clock, 
  Filter,
  DollarSign,
  TrendingDown,
  Calendar,
  Tag
} from 'lucide-react';

const PALETTE = {
  lightCyan: '#B8E3E9',
  mutedCyan: '#93B1B5',
  deepTeal: '#4F7C82',
  darkTeal: '#0B2E33',
  pageBg: '#EBF6F8'
};

const initialExpenses = [
  { id: 1, title: 'Grocery Shopping', category: 'Food & Dining', amount: 85.50, paymentMethod: 'Credit Card', status: 'Paid', date: '2026-08-02' },
  { id: 2, title: 'Electric Bill', category: 'Utilities', amount: 142.30, paymentMethod: 'Bank Transfer', status: 'Pending', date: '2026-08-04' },
  { id: 3, title: 'Gas Station', category: 'Transportation', amount: 45.20, paymentMethod: 'Debit Card', status: 'Paid', date: '2026-08-06' },
  { id: 4, title: 'Software Subscription', category: 'Software', amount: 29.99, paymentMethod: 'Credit Card', status: 'Paid', date: '2026-08-08' },
  { id: 5, title: 'Team Lunch', category: 'Food & Dining', amount: 112.00, paymentMethod: 'Corporate Card', status: 'Pending', date: '2026-08-10' },
];

export default function ExpenseTracking() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
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

  const totalExpenseAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const paidExpensesAmount = expenses.filter(e => e.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingExpensesAmount = expenses.filter(e => e.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);

  const filteredExpenses = expenses.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
    } else {
      const newEntry = {
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount)
      };
      setExpenses([newEntry, ...expenses]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#EBF6F8] font-sans text-[#0B2E33] space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-start text-2xl font-black text-[#0B2E33] tracking-tight">Expense Tracking</h1>
          <p className="text-xs font-semibold text-[#4F7C82]">Monitor, filter, and audit your daily outgoings</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B2E33] hover:bg-[#4F7C82] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Record Expense</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4F7C82]">Total Outflow</p>
            <div className="p-2 rounded-xl bg-[#0B2E33]/10 text-[#0B2E33]">
              <TrendingDown size={18} />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-black text-[#0B2E33]">${totalExpenseAmount.toFixed(2)}</h3>
            <p className="text-[10px] font-bold text-[#93B1B5] mt-1">{expenses.length} Records tracked</p>
          </div>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4F7C82]">Settled Expenses</p>
            <div className="p-2 rounded-xl bg-[#B8E3E9]/50 text-[#0B2E33]">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-black text-[#0B2E33]">${paidExpensesAmount.toFixed(2)}</h3>
            <p className="text-[10px] font-bold text-[#4F7C82] mt-1">{expenses.filter(e => e.status === 'Paid').length} Paid items</p>
          </div>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4F7C82]">Pending Settlement</p>
            <div className="p-2 rounded-xl bg-[#93B1B5]/20 text-[#4F7C82]">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-black text-[#0B2E33]">${pendingExpensesAmount.toFixed(2)}</h3>
            <p className="text-[10px] font-bold text-[#4F7C82] mt-1">{expenses.filter(e => e.status === 'Pending').length} Action items required</p>
          </div>
        </div>

      </div>

      <div className="bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-[#0B2E33] tracking-tight">Expense Ledger</h2>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4F7C82]" />
              <input 
                type="text"
                placeholder="Search expense..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-xs text-[#0B2E33] placeholder-[#4F7C82]/70 focus:outline-none focus:border-[#4F7C82]"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl px-3 py-2 text-xs text-[#0B2E33] font-semibold focus:outline-none focus:border-[#4F7C82] cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Utilities">Utilities</option>
              <option value="Transportation">Transportation</option>
              <option value="Software">Software</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl px-3 py-2 text-xs text-[#0B2E33] font-semibold focus:outline-none focus:border-[#4F7C82] cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-[#4F7C82]">
            <thead>
              <tr className="border-b border-[#B8E3E9] text-[#0B2E33] uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8E3E9]/50">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-[#EBF6F8] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0B2E33]">{expense.title}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#4F7C82]">{expense.category}</td>
                    <td className="py-3.5 px-4 font-medium text-[#4F7C82]">{expense.paymentMethod}</td>
                    <td className="py-3.5 px-4 font-black text-[#0B2E33]">${expense.amount.toFixed(2)}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        expense.status === 'Paid' 
                          ? 'bg-[#B8E3E9] text-[#0B2E33] border border-[#93B1B5]/40' 
                          : 'bg-[#93B1B5]/20 text-[#4F7C82] border border-[#93B1B5]/40'
                      }`}>
                        {expense.status === 'Paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {expense.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#4F7C82]">{expense.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEditModal(expense)}
                          className="p-1.5 text-[#0B2E33] hover:bg-[#B8E3E9]/50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-1.5 text-[#4F7C82] hover:text-[#0B2E33] hover:bg-[#B8E3E9]/50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-[#4F7C82]">
                    No expense records matching your selection.
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
              <h3 className="text-base font-bold text-[#0B2E33]">
                {editingId ? 'Edit Expense Record' : 'Record New Expense'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-[#4F7C82] hover:bg-[#EBF6F8]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0B2E33] mb-1">Expense Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Office Supplies"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0B2E33] mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  >
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Software">Software</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#0B2E33] mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0B2E33] mb-1">Payment Method</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Corporate Card">Corporate Card</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#0B2E33] mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0B2E33] mb-1">Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                />
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