import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Download, 
  Filter, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  X, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const PALETTE = {
  lightCyan: '#B8E3E9',
  mutedCyan: '#93B1B5',
  deepTeal: '#4F7C82',
  darkTeal: '#0B2E33',
  pageBg: '#EBF6F8'
};

const initialTransactions = [
  { id: 'TX-1001', description: 'Grocery Store', category: 'Food & Dining', type: 'Expense', amount: -85.50, paymentMethod: 'Credit Card', status: 'Completed', date: '2026-08-02 14:32' },
  { id: 'TX-1002', description: 'Client Monthly Retainer', category: 'Income', type: 'Income', amount: 3200.00, paymentMethod: 'Bank Transfer', status: 'Completed', date: '2026-08-03 09:15' },
  { id: 'TX-1003', description: 'Gas Station Refill', category: 'Transportation', type: 'Expense', amount: -45.20, paymentMethod: 'Debit Card', status: 'Completed', date: '2026-08-05 18:20' },
  { id: 'TX-1004', description: 'Software SaaS Billing', category: 'Software', type: 'Expense', amount: -129.99, paymentMethod: 'Credit Card', status: 'Pending', date: '2026-08-07 11:00' },
  { id: 'TX-1005', description: 'Consulting Service', category: 'Income', type: 'Income', amount: 850.00, paymentMethod: 'Bank Transfer', status: 'Completed', date: '2026-08-08 16:45' },
  { id: 'TX-1006', description: 'Office Chair Purchase', category: 'Supplies', type: 'Expense', amount: -210.00, paymentMethod: 'Corporate Card', status: 'Completed', date: '2026-08-09 10:12' },
  { id: 'TX-1007', description: 'Utility Fiber Internet', category: 'Utilities', type: 'Expense', amount: -89.99, paymentMethod: 'Bank Transfer', status: 'Pending', date: '2026-08-10 08:30' },
];

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedTx, setSelectedTx] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTx = transactions.filter((tx) => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || tx.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || tx.status === statusStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTx.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTx = filteredTx.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    if (selectedTx && selectedTx.id === id) setSelectedTx(null);
  };

  const exportCSV = () => {
    const headers = ['ID,Description,Category,Type,Amount,Payment Method,Status,Date\n'];
    const rows = filteredTx.map(t => 
      `${t.id},"${t.description}",${t.category},${t.type},${t.amount},${t.paymentMethod},${t.status},${t.date}`
    );
    const blob = new Blob([...headers, rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Transaction_History_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen w-full bg-[#EBF6F8] font-sans text-[#0B2E33] space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-start text-2xl font-black text-[#0B2E33] tracking-tight">Transaction History</h1>
          <p className="text-xs font-semibold text-[#4F7C82]">Comprehensive audit log of all financial receipts and outgoings</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B2E33] hover:bg-[#4F7C82] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4F7C82]" />
            <input 
              type="text"
              placeholder="Search by ID, merchant, category..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-xs text-[#0B2E33] placeholder-[#4F7C82]/70 focus:outline-none focus:border-[#4F7C82]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl px-3 py-2 text-xs text-[#0B2E33] font-semibold focus:outline-none focus:border-[#4F7C82] cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl px-3 py-2 text-xs text-[#0B2E33] font-semibold focus:outline-none focus:border-[#4F7C82] cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-[#4F7C82]">
            <thead>
              <tr className="border-b border-[#B8E3E9] text-[#0B2E33] uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8E3E9]/50">
              {paginatedTx.length > 0 ? (
                paginatedTx.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#EBF6F8] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#4F7C82]">{tx.id}</td>
                    <td className="py-3.5 px-4 font-bold text-[#0B2E33]">{tx.description}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#4F7C82]">{tx.category}</td>
                    <td className="py-3.5 px-4 font-medium text-[#4F7C82]">{tx.paymentMethod}</td>
                    <td className={`py-3.5 px-4 font-black ${tx.amount > 0 ? 'text-[#0B2E33]' : 'text-[#4F7C82]'}`}>
                      {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        tx.status === 'Completed' 
                          ? 'bg-[#B8E3E9] text-[#0B2E33] border border-[#93B1B5]/40' 
                          : 'bg-[#93B1B5]/20 text-[#4F7C82] border border-[#93B1B5]/40'
                      }`}>
                        {tx.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#4F7C82]">{tx.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setSelectedTx(tx)}
                          className="p-1.5 text-[#0B2E33] hover:bg-[#B8E3E9]/50 rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(tx.id)}
                          className="p-1.5 text-[#4F7C82] hover:text-[#0B2E33] hover:bg-[#B8E3E9]/50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-[#4F7C82]">
                    No historical records match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#B8E3E9] text-xs font-semibold text-[#4F7C82]">
          <span>Showing {paginatedTx.length} of {filteredTx.length} results</span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 bg-[#EBF6F8] rounded-lg border border-[#B8E3E9] disabled:opacity-40 hover:bg-[#B8E3E9]/40 transition cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-2">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 bg-[#EBF6F8] rounded-lg border border-[#B8E3E9] disabled:opacity-40 hover:bg-[#B8E3E9]/40 transition cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {selectedTx && (
        <div className="fixed inset-0 bg-[#0B2E33]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#B8E3E9] shadow-2xl w-full max-w-md p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#B8E3E9] pb-3">
              <h3 className="text-base font-bold text-[#0B2E33]">Transaction Details</h3>
              <button 
                onClick={() => setSelectedTx(null)}
                className="p-1 rounded-full text-[#4F7C82] hover:bg-[#EBF6F8]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-[#EBF6F8] rounded-2xl border border-[#B8E3E9] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#4F7C82] uppercase tracking-wider block">Total Amount</span>
                  <span className={`text-2xl font-black ${selectedTx.amount > 0 ? 'text-[#0B2E33]' : 'text-[#4F7C82]'}`}>
                    {selectedTx.amount > 0 ? `+$${selectedTx.amount.toFixed(2)}` : `-$${Math.abs(selectedTx.amount).toFixed(2)}`}
                  </span>
                </div>
                <span className="px-3 py-1 bg-white border border-[#B8E3E9] rounded-full text-xs font-bold text-[#0B2E33]">
                  {selectedTx.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-[#4F7C82] font-semibold block">Transaction Reference</span>
                  <span className="font-mono font-bold text-[#0B2E33]">{selectedTx.id}</span>
                </div>
                <div>
                  <span className="text-[#4F7C82] font-semibold block">Merchant / Source</span>
                  <span className="font-bold text-[#0B2E33]">{selectedTx.description}</span>
                </div>
                <div>
                  <span className="text-[#4F7C82] font-semibold block">Category</span>
                  <span className="font-bold text-[#0B2E33]">{selectedTx.category}</span>
                </div>
                <div>
                  <span className="text-[#4F7C82] font-semibold block">Payment Method</span>
                  <span className="font-bold text-[#0B2E33]">{selectedTx.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-[#4F7C82] font-semibold block">Status</span>
                  <span className="font-bold text-[#0B2E33]">{selectedTx.status}</span>
                </div>
                <div>
                  <span className="text-[#4F7C82] font-semibold block">Timestamp</span>
                  <span className="font-bold text-[#0B2E33]">{selectedTx.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-[#B8E3E9]">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-5 py-2 bg-[#0B2E33] hover:bg-[#4F7C82] text-white font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}