import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { X, Lock, Mail, User, Phone, Check } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    register
  } = useAuth();

  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (authModalMode === 'login') {
        await login(email, password);
        showToast('Welcome back to VYRA!', 'success');
      } else if (authModalMode === 'register') {
        await register({ name, email, password, phone });
        showToast('Account created successfully!', 'success');
      } else {
        setForgotSent(true);
        showToast('Reset email instructions sent.', 'info');
      }
    } catch (err: any) {
      showToast(err.message || 'Authentication failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoCustomer = () => {
    setEmail('tanya@example.com');
    setPassword('password123');
  };

  const handleQuickDemoAdmin = () => {
    setEmail('admin@vyra.store');
    setPassword('admin123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-md w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E2D8C9] my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#EADFD0] flex items-center justify-between bg-[#FDFBF7]">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#C05A3E]">
              {authModalMode === 'login' && 'Member Access'}
              {authModalMode === 'register' && 'Join the Community'}
              {authModalMode === 'forgot' && 'Account Recovery'}
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#242120]">
              {authModalMode === 'login' && 'Sign in to VYRA'}
              {authModalMode === 'register' && 'Create your Account'}
              {authModalMode === 'forgot' && 'Reset your Password'}
            </h2>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-full hover:bg-[#EFE8DD] text-[#4A3B32] cursor-pointer"
            aria-label="Close authentication"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Quick Demo Credentials Bar */}
          <div className="bg-[#F8F4EC] p-3 rounded-xl border border-[#E2D8C9] mb-5 text-[11px] text-[#5A4B43]">
            <span className="font-bold text-[#242120]">Quick Demo Login:</span>
            <div className="flex gap-2 mt-1.5">
              <button
                type="button"
                onClick={handleQuickDemoCustomer}
                className="bg-[#FAF7F2] border border-[#DDD2C3] hover:border-[#8C7A6B] px-2.5 py-1 rounded text-[#242120] font-medium cursor-pointer"
              >
                Fill Customer (Tanya)
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="bg-[#FAF7F2] border border-[#7D9381] hover:bg-[#EFF4F0] px-2.5 py-1 rounded text-[#3E5242] font-semibold cursor-pointer"
              >
                Fill Admin (Curator)
              </button>
            </div>
          </div>

          {forgotSent ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-[#EFF4F0] text-[#627A67] flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#242120] mb-2">Check your email</h4>
              <p className="text-xs text-[#7D6B5D] mb-6">
                We have dispatched password reset instructions to <span className="font-bold">{email}</span>.
              </p>
              <button
                onClick={() => {
                  setForgotSent(false);
                  setAuthModalMode('login');
                }}
                className="bg-[#2E241F] text-white px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {authModalMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-[#242120] uppercase mb-1">Your Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Tanya Roy"
                        className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-md pl-9 pr-3 py-2.5 text-xs text-[#242120] focus:outline-none focus:border-[#C05A3E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#242120] uppercase mb-1">Phone Number (Optional)</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98123 45678"
                        className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-md pl-9 pr-3 py-2.5 text-xs text-[#242120] focus:outline-none focus:border-[#C05A3E]"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-[#242120] uppercase mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-md pl-9 pr-3 py-2.5 text-xs text-[#242120] focus:outline-none focus:border-[#C05A3E]"
                  />
                </div>
              </div>

              {authModalMode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#242120] uppercase">Password</label>
                    {authModalMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setAuthModalMode('forgot')}
                        className="text-[11px] text-[#C05A3E] hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-md pl-9 pr-3 py-2.5 text-xs text-[#242120] focus:outline-none focus:border-[#C05A3E]"
                    />
                  </div>
                </div>
              )}

              {authModalMode === 'login' && (
                <div className="flex items-center">
                  <label className="flex items-center gap-2 text-xs text-[#5A4B43] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded accent-[#C05A3E]"
                    />
                    <span>Remember me on this browser</span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2E241F] hover:bg-[#C05A3E] text-white py-3 rounded-md text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : authModalMode === 'login' ? (
                  'Sign In'
                ) : authModalMode === 'register' ? (
                  'Create Account'
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          )}

          {/* Mode Switcher */}
          <div className="pt-6 mt-6 border-t border-[#EADFD0] text-center text-xs text-[#7D6B5D]">
            {authModalMode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('register')}
                  className="font-bold text-[#C05A3E] hover:underline"
                >
                  Join VYRA
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="font-bold text-[#C05A3E] hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
