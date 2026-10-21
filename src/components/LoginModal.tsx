import React, { useState } from 'react';
import { X, Lock, Mail, LogIn, Sparkles, UserCheck } from 'lucide-react';
import { INITIAL_DEMO_USER } from '../data/mockData';
import { UserAccount } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserAccount) => void;
  onOpenRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onOpenRegister
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Wprowadź adres e-mail i hasło');
      return;
    }

    // Check if matching demo or create active session
    const existingUser = localStorage.getItem('weradlugopisy_user');
    if (existingUser) {
      try {
        const parsed = JSON.parse(existingUser);
        onSuccess(parsed);
        return;
      } catch {
        // fallback
      }
    }

    // Fallback login with demo credentials
    onSuccess({
      ...INITIAL_DEMO_USER,
      email: email.trim()
    });
  };

  const handleDemoLogin = () => {
    onSuccess(INITIAL_DEMO_USER);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>

          <h3 className="text-xl font-bold font-display text-white">
            Logowanie do Strefy Pracownika
          </h3>
          <p className="text-xs text-blue-200 mt-1">
            długopisyJOB • Panel zarządzania zleceniami i wypłatami
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-5">
          
          {/* Quick Demo Test Access Button */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-amber-900 uppercase">
                Szybki dostęp testowy:
              </span>
            </div>
            <p className="text-xs text-amber-800 mb-2.5">
              Chcesz zobaczyć panel chałupnika z przykładowymi zleceniami i historią wypłat?
            </p>
            <button
              onClick={handleDemoLogin}
              className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Zaloguj jako współpracownik testowy (Janina Kowalska)</span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs text-slate-400 uppercase font-medium">lub podaj dane</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            {error && (
              <div className="p-2.5 bg-red-50 text-red-600 text-xs rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Adres e-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  placeholder="twoj@email.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Hasło
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Zaloguj się do panelu</span>
            </button>
          </form>

          {/* Bottom link */}
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Nie masz jeszcze zarejestrowanego pakietu?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenRegister();
                }}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Rozpocznij współpracę
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
