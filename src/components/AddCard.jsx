import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  ShieldCheck, 
  Plus, 
  ArrowRight, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  Lock,
  Zap,
  TrendingDown
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function AddCard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [cardData, setCardData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cardType: 'Visa',
    spendingLimit: '5000',
    colorTheme: 'from-cyan-500 to-blue-600'
  });

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardData({ ...cardData, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardData({ ...cardData, expiryDate: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardData.cardName || !cardData.cardNumber || !cardData.expiryDate) {
      toast.error('Please complete all card details.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const existingCards = JSON.parse(sessionStorage.getItem('userCards') || '[]');
      const newCard = {
        id: Date.now(),
        ...cardData,
        currentSpent: 1240.50, 
        lastFour: cardData.cardNumber.slice(-4) || '4242'
      };

      sessionStorage.setItem('userCards', JSON.stringify([newCard, ...existingCards]));
      toast.success('Financial Card successfully linked!');
      setIsLoading(false);
      navigate('/dashboard', { replace: true });
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 font-sans text-white flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 items-center gap-8 relative z-10">
        
        <div className="flex flex-col items-center justify-center space-y-6 text-center lg:text-left lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
              <Sparkles size={14} />
              <span>Card Expense Synchronization</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Link Your Financial Card
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-sm">
              Connect your debit or credit cards to monitor live outgoings, limit caps, and automated transaction logs directly on your dashboard.
            </p>
          </div>

          <div className="w-full max-w-sm">
            <div className={`relative aspect-[1.58/1] w-full rounded-2xl bg-gradient-to-tr ${cardData.colorTheme} p-6 text-white shadow-2xl shadow-cyan-500/10 border border-white/20 flex flex-col justify-between overflow-hidden transform hover:scale-105 transition-all duration-300`}>
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                  {cardData.cardType} Card
                </span>
                <CreditCard size={24} className="text-white/90" />
              </div>

              <div className="space-y-1 my-auto relative z-10">
                <p className="text-xs font-medium text-white/70">Card Number</p>
                <p className="text-lg font-mono font-bold tracking-widest text-white">
                  {cardData.cardNumber || '•••• •••• •••• ••••'}
                </p>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-[10px] text-white/70 font-semibold uppercase">Cardholder</p>
                  <p className="text-xs font-bold uppercase tracking-wide">
                    {cardData.cardName || 'YOUR NAME'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/70 font-semibold uppercase">Expires</p>
                  <p className="text-xs font-mono font-bold">
                    {cardData.expiryDate || 'MM/YY'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-cyan-400" /> PCI-DSS Compliant</span>
            <span className="flex items-center gap-1.5"><Lock size={16} className="text-emerald-400" /> Bank-Grade Security</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">Card Expense Details</h2>
            <p className="text-xs text-slate-400 mt-0.5">Define expense caps and spending rules for this card.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Cardholder Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={cardData.cardName}
                onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Card Number</label>
              <input
                type="text"
                required
                placeholder="4532 1122 3344 5566"
                value={cardData.cardNumber}
                onChange={handleCardNumberChange}
                className="w-full px-3.5 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Expiry Date</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={cardData.expiryDate}
                  onChange={handleExpiryChange}
                  className="w-full px-3.5 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Card Network</label>
                <select
                  value={cardData.cardType}
                  onChange={(e) => setCardData({ ...cardData, cardType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
                >
                  <option value="Visa">Visa Credit/Debit</option>
                  <option value="Mastercard">Mastercard Corporate</option>
                  <option value="Amex">American Express</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Monthly Spending Cap ($)</label>
              <div className="relative">
                <DollarSign size={15} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="number"
                  required
                  placeholder="5000"
                  value={cardData.spendingLimit}
                  onChange={(e) => setCardData({ ...cardData, spendingLimit: e.target.value })}
                  className="w-full pl-8 pr-3.5 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Card Theme Accent</label>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { name: 'Cyan', class: 'from-cyan-500 to-blue-600' },
                  { name: 'Purple', class: 'from-purple-600 to-indigo-600' },
                  { name: 'Emerald', class: 'from-emerald-500 to-teal-700' }
                ].map((theme) => (
                  <button
                    key={theme.name}
                    type="button"
                    onClick={() => setCardData({ ...cardData, colorTheme: theme.class })}
                    className={`h-8 rounded-xl bg-gradient-to-r ${theme.class} border-2 transition-transform active:scale-95 ${
                      cardData.colorTheme === theme.class ? 'border-white scale-105 shadow-md' : 'border-transparent opacity-70'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Link Card & Open Dashboard</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}