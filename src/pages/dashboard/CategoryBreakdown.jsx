import React, { useState } from 'react';
import { 
  PieChart as PieIcon, 
  Search, 
  Plus, 
  TrendingUp, 
  Filter, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle,
  X
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';

const PALETTE = {
  lightCyan: '#B8E3E9',
  mutedCyan: '#93B1B5',
  deepTeal: '#4F7C82',
  darkTeal: '#0B2E33',
  pageBg: '#EBF6F8'
};

const initialCategories = [
  { id: 1, name: 'Food & Dining', spent: 1250.00, budget: 1500.00, color: '#0B2E33', itemsCount: 42 },
  { id: 2, name: 'Software & Tools', spent: 850.00, budget: 900.00, color: '#4F7C82', itemsCount: 15 },
  { id: 3, name: 'Transportation', spent: 420.00, budget: 600.00, color: '#93B1B5', itemsCount: 28 },
  { id: 4, name: 'Utilities & Office', spent: 610.00, budget: 500.00, color: '#B8E3E9', itemsCount: 8 },
  { id: 5, name: 'Travel & Events', spent: 340.00, budget: 1000.00, color: '#689CA4', itemsCount: 5 },
];

export default function CategoryBreakdown() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newCat, setNewCat] = useState({
    name: '',
    budget: '',
    spent: '0',
    color: '#0B2E33'
  });

  const totalSpent = categories.reduce((acc, curr) => acc + curr.spent, 0);
  const totalBudget = categories.reduce((acc, curr) => acc + curr.budget, 0);
  const overBudgetCategories = categories.filter(c => c.spent > c.budget).length;

  const chartData = categories.map(c => ({
    name: c.name,
    value: c.spent,
    color: c.color
  }));

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCat.name || !newCat.budget) return;

    const categoryToAdd = {
      id: Date.now(),
      name: newCat.name,
      spent: parseFloat(newCat.spent) || 0,
      budget: parseFloat(newCat.budget),
      color: newCat.color,
      itemsCount: 0
    };

    setCategories([...categories, categoryToAdd]);
    setNewCat({ name: '', budget: '', spent: '0', color: '#0B2E33' });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#EBF6F8] font-sans text-[#0B2E33] space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-start text-2xl font-black text-[#0B2E33] tracking-tight">Category Breakdown</h1>
          <p className="text-xs font-semibold text-[#4F7C82]">Analyze spending limits and budget allocations per category</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B2E33] hover:bg-[#4F7C82] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#4F7C82]">Total Spent Across Categories</p>
          <h3 className="text-2xl font-black text-[#0B2E33] mt-1">${totalSpent.toFixed(2)}</h3>
          <p className="text-[10px] font-bold text-[#93B1B5] mt-1">Out of ${totalBudget.toFixed(2)} total budget</p>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#4F7C82]">Total Allocated Budget</p>
          <h3 className="text-2xl font-black text-[#0B2E33] mt-1">${totalBudget.toFixed(2)}</h3>
          <p className="text-[10px] font-bold text-[#4F7C82] mt-1">{categories.length} Active Categories</p>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#4F7C82]">Budget Health</p>
          <h3 className="text-2xl font-black text-[#0B2E33] mt-1">
            {overBudgetCategories === 0 ? 'Optimal' : `${overBudgetCategories} Over Limit`}
          </h3>
          <p className="text-[10px] font-bold text-[#4F7C82] mt-1">
            {overBudgetCategories === 0 ? 'All categories within limits' : 'Requires budget reallocation'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <h2 className="text-base font-bold text-[#0B2E33] tracking-tight flex items-center gap-2 mb-4">
            <PieIcon size={18} className="text-[#4F7C82]" />
            Distribution Share
          </h2>

          <div className="h-64 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: PALETTE.lightCyan, borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#B8E3E9]">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between text-xs font-semibold text-[#0B2E33]">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span>${cat.spent.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-xs space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-base font-bold text-[#0B2E33] tracking-tight">Category Utilization</h2>
            
            <div className="relative w-full sm:w-60">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4F7C82]" />
              <input 
                type="text"
                placeholder="Search category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl text-xs text-[#0B2E33] placeholder-[#4F7C82]/70 focus:outline-none focus:border-[#4F7C82]"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredCategories.map((category) => {
              const percentage = Math.min(Math.round((category.spent / category.budget) * 100), 100);
              const isOver = category.spent > category.budget;

              return (
                <div key={category.id} className="p-4 rounded-xl border border-[#B8E3E9]/60 bg-[#EBF6F8]/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0B2E33]">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      {category.name}
                      <span className="text-[10px] font-semibold text-[#4F7C82]">({category.itemsCount} items)</span>
                    </span>
                    <span>
                      ${category.spent.toFixed(2)} / <span className="text-[#4F7C82]">${category.budget.toFixed(2)}</span>
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-[#B8E3E9]">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isOver ? 'bg-[#0B2E33]' : 'bg-[#4F7C82]'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#4F7C82]">
                    <span>{percentage}% of budget used</span>
                    {isOver ? (
                      <span className="text-[#0B2E33] font-bold flex items-center gap-1">
                        <AlertTriangle size={12} /> Over budget by ${(category.spent - category.budget).toFixed(2)}
                      </span>
                    ) : (
                      <span>${(category.budget - category.spent).toFixed(2)} remaining</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0B2E33]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#B8E3E9] shadow-2xl w-full max-w-md p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#B8E3E9] pb-3">
              <h3 className="text-base font-bold text-[#0B2E33]">Create Expense Category</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-[#4F7C82] hover:bg-[#EBF6F8]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
              <div>
                <label className="flex font-bold text-[#0B2E33] mb-1">Category Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Marketing & Ads"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex font-bold text-[#0B2E33] mb-1">Monthly Budget ($)</label>
                  <input 
                    type="number" 
                    placeholder="1000.00"
                    value={newCat.budget}
                    onChange={(e) => setNewCat({ ...newCat, budget: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                    required
                  />
                </div>

                <div>
                  <label className="flex font-bold text-[#0B2E33] mb-1">Badge Color</label>
                  <select
                    value={newCat.color}
                    onChange={(e) => setNewCat({ ...newCat, color: e.target.value })}
                    className="w-full px-3 py-2 bg-[#EBF6F8] border border-[#B8E3E9] rounded-xl font-semibold text-[#0B2E33] focus:outline-none focus:border-[#4F7C82]"
                  >
                    <option value="#0B2E33">Dark Teal</option>
                    <option value="#4F7C82">Deep Teal</option>
                    <option value="#93B1B5">Muted Cyan</option>
                    <option value="#B8E3E9">Light Cyan</option>
                  </select>
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
                  Save Category
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}