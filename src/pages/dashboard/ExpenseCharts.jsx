import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  Calendar, 
  PieChart as PieIcon, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  Layers,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  XAxis, 
  YAxis, 
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

const monthlyData = [
  { period: 'Jan', Food: 1200, Software: 400, Travel: 300, Utilities: 500 },
  { period: 'Feb', Food: 1100, Software: 450, Travel: 200, Utilities: 480 },
  { period: 'Mar', Food: 1400, Software: 500, Travel: 600, Utilities: 520 },
  { period: 'Apr', Food: 1250, Software: 480, Travel: 350, Utilities: 510 },
  { period: 'May', Food: 1300, Software: 520, Travel: 400, Utilities: 490 },
  { period: 'Jun', Food: 1500, Software: 600, Travel: 750, Utilities: 530 },
];

const weeklyData = [
  { period: 'Mon', Food: 220, Software: 100, Travel: 40, Utilities: 80 },
  { period: 'Tue', Food: 180, Software: 50, Travel: 120, Utilities: 0 },
  { period: 'Wed', Food: 250, Software: 120, Travel: 60, Utilities: 150 },
  { period: 'Thu', Food: 300, Software: 80, Travel: 90, Utilities: 0 },
  { period: 'Fri', Food: 380, Software: 200, Travel: 180, Utilities: 200 },
  { period: 'Sat', Food: 450, Software: 50, Travel: 220, Utilities: 0 },
  { period: 'Sun', Food: 210, Software: 0, Travel: 110, Utilities: 0 },
];

const radarData = [
  { category: 'Food', amount: 1500 },
  { category: 'Software', amount: 600 },
  { category: 'Travel', amount: 750 },
  { category: 'Utilities', amount: 530 },
  { category: 'Office', amount: 400 },
  { category: 'Marketing', amount: 900 },
];

export default function ExpenseCharts() {
  const [timeframe, setTimeframe] = useState('Monthly');
  const activeData = timeframe === 'Monthly' ? monthlyData : weeklyData;

  return (
    <div className="min-h-screen w-full bg-[#EBF6F8] font-sans text-[#0B2E33] space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-start text-2xl font-black text-[#0B2E33] tracking-tight">Expense Charts</h1>
          <p className="text-xs font-semibold text-[#4F7C82]">Visual trend reports and time-series expense analytics</p>
        </div>

        <div className="flex items-center gap-1 bg-white border border-[#B8E3E9] p-1 rounded-xl shadow-xs self-start sm:self-auto">
          {['Weekly', 'Monthly'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                timeframe === tf
                  ? 'bg-[#0B2E33] text-white shadow-xs'
                  : 'text-[#4F7C82] hover:bg-[#B8E3E9]/40'
              }`}
            >
              {tf} View
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#4F7C82]">Average Outflow</p>
          <h3 className="text-2xl font-black text-[#0B2E33] mt-1">
            {timeframe === 'Monthly' ? '$2,850.00 / mo' : '$640.00 / day'}
          </h3>
          <span className="inline-flex items-center text-[10px] font-bold text-[#0B2E33] bg-[#B8E3E9]/50 px-2 py-0.5 rounded-full border border-[#93B1B5]/30 mt-2">
            <ArrowDownRight size={12} className="mr-0.5" /> -3.4% vs previous
          </span>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#4F7C82]">Peak Spend Period</p>
          <h3 className="text-2xl font-black text-[#0B2E33] mt-1">
            {timeframe === 'Monthly' ? 'June ($3,360)' : 'Friday ($960)'}
          </h3>
          <span className="inline-flex items-center text-[10px] font-bold text-[#4F7C82] bg-[#B8E3E9]/50 px-2 py-0.5 rounded-full border border-[#93B1B5]/30 mt-2">
            Highest concentration
          </span>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#4F7C82]">Leading Category</p>
          <h3 className="text-2xl font-black text-[#0B2E33] mt-1">Food & Dining</h3>
          <span className="inline-flex items-center text-[10px] font-bold text-[#0B2E33] bg-[#B8E3E9]/50 px-2 py-0.5 rounded-full border border-[#93B1B5]/30 mt-2">
            ~42% total share
          </span>
        </div>
      </div>

      <div className="bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0B2E33] tracking-tight flex items-center gap-2">
            <Activity size={18} className="text-[#4F7C82]" />
            Category Cumulative Trend ({timeframe})
          </h2>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="foodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PALETTE.darkTeal} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={PALETTE.darkTeal} stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="softGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PALETTE.deepTeal} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={PALETTE.deepTeal} stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="period" stroke={PALETTE.deepTeal} fontSize={11} tickLine={false} />
              <YAxis stroke={PALETTE.deepTeal} fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: PALETTE.lightCyan, borderRadius: '12px', fontSize: '12px', color: PALETTE.darkTeal }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="Food" stackId="1" stroke={PALETTE.darkTeal} fill="url(#foodGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="Software" stackId="1" stroke={PALETTE.deepTeal} fill="url(#softGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="Travel" stackId="1" stroke={PALETTE.mutedCyan} fill={PALETTE.mutedCyan} fillOpacity={0.3} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#0B2E33] tracking-tight flex items-center gap-2">
            <BarChart3 size={18} className="text-[#4F7C82]" />
            Volume Distribution
          </h2>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="period" stroke={PALETTE.deepTeal} fontSize={11} tickLine={false} />
                <YAxis stroke={PALETTE.deepTeal} fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: PALETTE.lightCyan, borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Food" fill={PALETTE.darkTeal} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Software" fill={PALETTE.deepTeal} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Utilities" fill={PALETTE.mutedCyan} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-[#B8E3E9] rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#0B2E33] tracking-tight flex items-center gap-2">
            <Layers size={18} className="text-[#4F7C82]" />
            Category Variance Radar
          </h2>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke={PALETTE.lightCyan} />
                <PolarAngleAxis dataKey="category" stroke={PALETTE.darkTeal} fontSize={11} />
                <PolarRadiusAxis stroke={PALETTE.deepTeal} fontSize={10} />
                <Radar name="Spent" dataKey="amount" stroke={PALETTE.darkTeal} fill={PALETTE.deepTeal} fillOpacity={0.5} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: PALETTE.lightCyan, borderRadius: '12px', fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}