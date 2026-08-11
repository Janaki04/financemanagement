import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!acceptTerms) {
      toast.error("You must accept the Terms and Conditions to proceed.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newUser = { fullName, email, password };
      sessionStorage.setItem('userSession', JSON.stringify(newUser));

      toast.success(`Success! Account created for ${fullName}`);
      setIsLoading(false);
      navigate('/dashboard');
      
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAcceptTerms(false);
    }, 1200);
  };

  return (
    <>
      <style>{`
        @keyframes textShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        .animate-gradient-text {
          background: linear-gradient(90deg, #B8E3E9, #ffffff, #4F7C82, #B8E3E9);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 6s infinite linear;
        }

        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulseGlow 4s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen w-full bg-gradient-to-br from-[#0B2E33] via-[#4F7C82] to-[#0B2E33] flex items-center justify-center p-4 md:p-8 font-sans text-white relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#B8E3E9]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#4F7C82]/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '1s' }} />

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-8 xl:gap-12 z-10">
          <div className="hidden lg:flex flex-col items-center justify-center text-center p-4">
            <div className="relative max-w-sm group cursor-pointer">
              <div className="absolute inset-0 bg-[#B8E3E9]/20 rounded-full blur-2xl transform -rotate-6 transition-all duration-500 group-hover:scale-110"></div>
              <div className="animate-float flex items-center justify-center p-12 bg-[#0B2E33]/60 border border-[#93B1B5]/30 rounded-3xl backdrop-blur-md shadow-2xl relative z-10">
                <div className="bg-gradient-to-tr from-[#4F7C82] to-[#B8E3E9] text-[#0B2E33] p-6 rounded-2xl shadow-lg">
                  <Wallet className="w-20 h-20 stroke-[2.5]" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <h1 className="text-5xl font-black tracking-tight animate-gradient-text">
                Join Finance Portal
              </h1>
            </div>

            <p className="mt-3 text-sm text-[#93B1B5] max-w-xs transition-colors duration-300 hover:text-[#B8E3E9] cursor-default font-medium">
              Create your financial account to manage portfolios, budgets, and live transaction statistics.
            </p>
          </div>
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#0B2E33]/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col justify-between min-h-[620px] border border-[#93B1B5]/30 transform transition-all duration-300 hover:shadow-[#B8E3E9]/10">
              
              <div className="space-y-4">
                
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4F7C82]/30 border border-[#93B1B5]/30 text-[#B8E3E9] rounded-full text-xs font-bold mb-1 shadow-xs">
                    <ShieldCheck size={14} className="text-[#B8E3E9]" />
                    Secure Registration
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
                    Create Account
                  </h2>
                  <p className="text-xs text-[#93B1B5] font-medium tracking-wide">
                    Fill in your details to register your account
                  </p>
                </div>

                <button 
                  type="button"
                  onClick={() => toast.info("Google Sign-up flow triggered.")}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0B2E33]/60 border border-[#93B1B5]/40 rounded-xl hover:bg-[#4F7C82]/30 active:scale-[0.98] transition-all duration-200 text-xs font-semibold text-[#B8E3E9] shadow-xs hover:border-[#B8E3E9]/60 group"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110 duration-200" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.93 5.93 0 0 1 8 12.583a5.93 5.93 0 0 1 5.99-5.935c1.45 0 2.76.51 3.8 1.35l3.17-3.17C18.99 2.85 16.25 1.5 13.99 1.5a10.5 10.5 0 0 0-10.5 10.5 10.5 10.5 0 0 0 10.5 10.5c5.73 0 10.14-4.04 10.14-10.21 0-.48-.04-.84-.13-1.21H12.24Z"/>
                  </svg>
                  <span>Sign Up with Google</span>
                </button>

                <div className="relative flex items-center justify-center my-2">
                  <div className="w-full border-t border-[#93B1B5]/20" />
                  <span className="absolute bg-[#0B2E33] px-3 text-[10px] font-bold text-[#93B1B5] tracking-wider uppercase">
                    Or Register With Email
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 text-left">
                  
                  <div className="space-y-1">
                    <label className={`text-xs font-semibold transition-colors duration-200 ${
                      activeField === 'fullName' ? 'text-[#B8E3E9]' : 'text-[#B8E3E9]/90'
                    }`}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all duration-200 ${
                        activeField === 'fullName' ? 'text-[#B8E3E9] scale-105' : 'text-[#93B1B5]'
                      }`} size={16} />
                      <input 
                        type="text"
                        placeholder="Alex Morgan"
                        value={fullName}
                        onFocus={() => setActiveField('fullName')}
                        onBlur={() => setActiveField(null)}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#0B2E33]/50 border border-[#93B1B5]/30 rounded-xl text-xs font-medium text-white placeholder-[#93B1B5]/60 focus:outline-none focus:border-[#B8E3E9] focus:ring-2 focus:ring-[#B8E3E9]/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={`text-xs font-semibold transition-colors duration-200 ${
                      activeField === 'email' ? 'text-[#B8E3E9]' : 'text-[#B8E3E9]/90'
                    }`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all duration-200 ${
                        activeField === 'email' ? 'text-[#B8E3E9] scale-105' : 'text-[#93B1B5]'
                      }`} size={16} />
                      <input 
                        type="email"
                        placeholder="alex@company.com"
                        value={email}
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#0B2E33]/50 border border-[#93B1B5]/30 rounded-xl text-xs font-medium text-white placeholder-[#93B1B5]/60 focus:outline-none focus:border-[#B8E3E9] focus:ring-2 focus:ring-[#B8E3E9]/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={`text-xs font-semibold transition-colors duration-200 ${
                      activeField === 'password' ? 'text-[#B8E3E9]' : 'text-[#B8E3E9]/90'
                    }`}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all duration-200 ${
                        activeField === 'password' ? 'text-[#B8E3E9] scale-105' : 'text-[#93B1B5]'
                      }`} size={16} />
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onFocus={() => setActiveField('password')}
                        onBlur={() => setActiveField(null)}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-11 py-2.5 bg-[#0B2E33]/50 border border-[#93B1B5]/30 rounded-xl text-xs font-medium text-white placeholder-[#93B1B5]/60 focus:outline-none focus:border-[#B8E3E9] focus:ring-2 focus:ring-[#B8E3E9]/20 transition-all duration-200"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#93B1B5] hover:text-[#B8E3E9] transition-colors p-1"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={`text-xs font-semibold transition-colors duration-200 ${
                      activeField === 'confirmPassword' ? 'text-[#B8E3E9]' : 'text-[#B8E3E9]/90'
                    }`}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all duration-200 ${
                        activeField === 'confirmPassword' ? 'text-[#B8E3E9] scale-105' : 'text-[#93B1B5]'
                      }`} size={16} />
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onFocus={() => setActiveField('confirmPassword')}
                        onBlur={() => setActiveField(null)}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-11 py-2.5 bg-[#0B2E33]/50 border border-[#93B1B5]/30 rounded-xl text-xs font-medium text-white placeholder-[#93B1B5]/60 focus:outline-none focus:border-[#B8E3E9] focus:ring-2 focus:ring-[#B8E3E9]/20 transition-all duration-200"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#93B1B5] hover:text-[#B8E3E9] transition-colors p-1"
                      >
                        {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[#93B1B5] hover:text-[#B8E3E9] transition-colors select-none">
                      <input 
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="w-4 h-4 rounded border-[#93B1B5]/40 bg-[#0B2E33] text-[#4F7C82] focus:ring-[#B8E3E9]/30 transition-all cursor-pointer accent-[#4F7C82]"
                      />
                      <span className="text-xs font-medium">
                        I accept{' '}
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); toast.info("Open Terms & Conditions popup"); }} 
                          className="text-[#B8E3E9] font-bold hover:underline transition-colors"
                        >
                          Terms and Conditions
                        </button>
                      </span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#4F7C82] to-[#B8E3E9] hover:from-[#B8E3E9] hover:to-[#4F7C82] text-[#0B2E33] font-bold text-xs py-3 rounded-xl transition-all duration-300 shadow-md shadow-[#4F7C82]/20 hover:shadow-lg hover:shadow-[#B8E3E9]/20 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-[#0B2E33]/30 border-t-[#0B2E33] rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="tracking-wide">Create Account</span>
                          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 duration-200 stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

              <div className="text-center pt-4 text-xs font-medium text-[#93B1B5]">
                Already have an account?{' '}
                <button 
                  onClick={() => navigate("/login")} 
                  className="text-[#B8E3E9] font-bold hover:text-white hover:underline transition-all inline-block ml-0.5"
                >
                  Login
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}