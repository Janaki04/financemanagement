import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Filter,
  DollarSign,
  Tag,
  Calendar,
  CreditCard
} from 'lucide-react';

const PALETTE = {
  lightCyan: '#B8E3E9',
  mutedCyan: '#93B1B5',
  deepTeal: '#4F7C82',
  darkTeal: '#0B2E33',
  pageBg: '#EBF6F8'
};

const initialManageableExpenses = [
  { id: 1, title: 'Office Stationery & Printing', category: 'Supplies', amount: 145.00, vendor: 'PaperCo Ltd.', status: 'Approved', date: '2026-08-01' },
  { id: 2, title: 'AWS Cloud Server Hosting', category: 'Software', amount: 520.00, vendor: 'Amazon Web Services', status: 'Pending', date: '2026-08-03' },
  { id: 3, title: 'Client Dinner Meeting', category: 'Food & Dining', amount: 210.50, vendor: 'Bistro Central', status: 'Approved', date: '2026-08-05' },
  { id: 4, title: 'Flight Ticket - Tech Summit', category: 'Travel', amount: 680.00, vendor: 'Skyline Airways', status: 'Rejected', date: '2026-08-07' },
  { id: 5, title: 'Monthly Fiber Internet', category: 'Utilities', amount: 89.99, vendor: 'Telecom Inc', status: 'Approved', date: '2026-08-09' },
];

export default function ManageExpense() {
  const [expenses, setExpenses] = useState(initialManageableExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Supplies',
    amount: '',
    vendor: '',
    status: 'Pending',
    date: new Date().toISOString().split('T')[0]
  });

  const handleOpenAdd = () => {
    setEditingExpense(null);
    setFormData({
      title: '',
      category: 'Supplies',
      amount: '',
      vendor: '',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (expense) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title,
      category: expense.category,
      amount: expense.amount.toString(),
      vendor: expense.vendor,
      status: expense.status,
      date: expense.date
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    if (editingExpense) {
      setExpenses(prev => prev.map(item => item.id === editingExpense.id ? {
        ...formData,
        id: editingExpense.id,
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

  const filteredExpenses = expenses.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen w-full bg-[#EBF6F8] font-sans text-[#0B2E33] space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-start text-2xl font-black text-[#0B2E33] tracking-tight">Manage Expenses</h1>
          <p className="text-xs font-semibold text-[#4F7C82]">Add, edit, approve, or remove company expense requests</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B2E33] hover:bg-[#4F7C82] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Expense</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#4F7C82]">Total Managed</p>
          <h3 className="text-2xl font-black text-[#0B2E33] mt-1">
            ${expenses.reduce((a, b) => a + b.amount, 0).toFixed(2)}
          </h3>
          <p className="text-[10px] font-bold text-[#93B1B5] mt-1">{expenses.length} Expense Records</p>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#4F7C82]">Approved Amount</p>
          <h3 className="text-2xl font-black text-[#0B2E33] mt-1">
            ${expenses.filter(e => e.status === 'Approved').reduce((a, b) => a + b.amount, 0).toFixed(2)}
          </h3>
          <p className="text-[10px] font-bold text-[#4F7C82] mt-1">{expenses.filter(e => e.status === 'Approved').length} Approved</p>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#4F7C82]">Awaiting Approval</p>
          <h3 className="text-2xl font-black text-[#0B2E33] mt-1">
            ${expenses.filter(e => e.status === 'Pending').reduce((a, b) => a + b.amount, 0).toFixed(2)}
          </h3>
          <p className="text-[10px] font-bold text-[#4F7C82] mt-1">{expenses.filter(e => e.status === 'Pending').length} Pending</p>
        </div>
      </div>

      <div className="bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-[#0B2E33] tracking-tight">Expense Inventory</h2>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4F7C82]" />
              <input 
                type="text"
                placeholder="Search expense or vendor..."
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
              <option value="Supplies">Supplies</option>
              <option value="Software">Software</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Travel">Travel</option>
              <option value="Utilities">Utilities</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl px-3 py-2 text-xs text-[#0B2E33] font-semibold focus:outline-none focus:border-[#4F7C82] cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-[#4F7C82]">
            <thead>
              <tr className="border-b border-[#B8E3E9] text-[#0B2E33] uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Expense Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Vendor</th>
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
                    <td className="py-3.5 px-4 font-medium text-[#4F7C82]">{expense.vendor}</td>
                    <td className="py-3.5 px-4 font-black text-[#0B2E33]">${expense.amount.toFixed(2)}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        expense.status === 'Approved' 
                          ? 'bg-[#B8E3E9] text-[#0B2E33] border border-[#93B1B5]/40' 
                          : expense.status === 'Pending'
                          ? 'bg-[#93B1B5]/20 text-[#4F7C82] border border-[#93B1B5]/40'
                          : 'bg-[#4F7C82]/20 text-[#0B2E33] border border-[#93B1B5]/40'
                      }`}>
                        {expense.status === 'Approved' && <CheckCircle2 size={12} />}
                        {expense.status === 'Pending' && <Clock size={12} />}
                        {expense.status === 'Rejected' && <AlertCircle size={12} />}
                        {expense.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#4F7C82]">{expense.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(expense)}
                          className="p-1.5 text-[#0B2E33] hover:bg-[#B8E3E9]/50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(expense.id)}
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
                    No expense records matching your filter parameters.
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
                {editingExpense ? 'Edit Expense Record' : 'Add New Expense Record'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-[#4F7C82] hover:bg-[#EBF6F8]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0B2E33] mb-1">Title / Purpose</label>
                <input 
                  type="text" 
                  placeholder="e.g. Server hosting renewal"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex font-bold text-[#0B2E33] mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  >
                    <option value="Supplies">Supplies</option>
                    <option value="Software">Software</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Travel">Travel</option>
                    <option value="Utilities">Utilities</option>
                  </select>
                </div>

                <div>
                  <label className="flex font-bold text-[#0B2E33] mb-1">Amount ($)</label>
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
                  <label className="block font-bold text-[#0B2E33] mb-1">Vendor / Merchant</label>
                  <input 
                    type="text" 
                    placeholder="e.g. AWS"
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  />
                </div>

                <div>
                  <label className="flex font-bold text-[#0B2E33] mb-1">Approval Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex font-bold text-[#0B2E33] mb-1">Expense Date</label>
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
                  {editingExpense ? 'Update Expense' : 'Save Expense'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}