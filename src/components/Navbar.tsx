import React, { useState } from 'react';
import { PenTool, ShieldCheck, User, LogIn, LogOut, Menu, X, ArrowRight, LayoutDashboard, FileText } from 'lucide-react';
import { UserAccount } from '../types';

interface NavbarProps {
  user: UserAccount | null;
  onOpenLogin: () => void;
  onOpenRegister: (packageId?: string) => void;
  onOpenTerms: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
  activeView: 'home' | 'dashboard' | 'terms';
  setActiveView: (view: 'home' | 'dashboard' | 'terms') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenLogin,
  onOpenRegister,
  onOpenTerms,
  onOpenDashboard,
  onLogout,
  activeView,
  setActiveView
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveView('home');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top reassurance alert bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full text-[11px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Aktywny nabór
            </span>
            <span className="text-slate-200">
              Stawka gwarantowana: <strong className="text-amber-300 font-bold">0,99 zł / sztuka</strong>
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline">0 zł opłat wstępnych i kaucji</span>
            <span className="text-slate-400 hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline">Darmowy odbiór kurierem DPD na terenie całej Polski</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% legalna polska umowa
            </span>
            <button 
              onClick={onOpenTerms}
              className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Regulamin współpracy
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => setActiveView('home')} 
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <PenTool className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
                  długopisy<span className="text-blue-600">JOB</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                  PL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Praca Chałupnicza • Montaż Długopisów
              </p>
            </div>
          </button>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            <button 
              onClick={() => scrollTo('jak-to-dziala')}
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Jak to działa
            </button>
            <button 
              onClick={() => scrollTo('kalkulator')}
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              Kalkulator
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                0,99 zł
              </span>
            </button>
            <button 
              onClick={() => scrollTo('symulator')}
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Symulator montażu
            </button>
            <button 
              onClick={() => scrollTo('pakiety')}
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Pakiety
            </button>
            <button 
              onClick={() => scrollTo('opinie')}
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Opinie
            </button>
            <button 
              onClick={onOpenTerms}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeView === 'terms' ? 'text-blue-600 font-semibold bg-blue-50' : 'hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Regulamin
            </button>
            <button 
              onClick={() => scrollTo('kontakt')}
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Kontakt
            </button>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenDashboard}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs cursor-pointer ${
                    activeView === 'dashboard'
                      ? 'bg-blue-600 text-white shadow-blue-500/25 ring-2 ring-blue-600/20'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Strefa Pracownika
                </button>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    {user.fullName.charAt(0)}
                  </div>
                  <div className="text-left hidden xl:block">
                    <p className="font-semibold text-slate-800 leading-tight">{user.fullName}</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Aktywny chałupnik</p>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  title="Wyloguj się"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-slate-500" />
                  Logowanie
                </button>
                <button
                  onClick={() => onOpenRegister()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 cursor-pointer"
                >
                  <span>Rozpocznij współpracę</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <button
                onClick={onOpenDashboard}
                className="p-2 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                Panel
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drop-down */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button 
              onClick={() => scrollTo('jak-to-dziala')}
              className="px-3 py-2 text-left rounded-lg text-sm text-slate-700 hover:bg-slate-50"
            >
              Jak to działa
            </button>
            <button 
              onClick={() => scrollTo('kalkulator')}
              className="px-3 py-2 text-left rounded-lg text-sm text-slate-700 hover:bg-slate-50"
            >
              Kalkulator (0,99 zł)
            </button>
            <button 
              onClick={() => scrollTo('symulator')}
              className="px-3 py-2 text-left rounded-lg text-sm text-slate-700 hover:bg-slate-50"
            >
              Symulator montażu
            </button>
            <button 
              onClick={() => scrollTo('pakiety')}
              className="px-3 py-2 text-left rounded-lg text-sm text-slate-700 hover:bg-slate-50"
            >
              Pakiety
            </button>
            <button 
              onClick={onOpenTerms}
              className="px-3 py-2 text-left rounded-lg text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              Regulamin
            </button>
            <button 
              onClick={() => scrollTo('kontakt')}
              className="px-3 py-2 text-left rounded-lg text-sm text-slate-700 hover:bg-slate-50"
            >
              Kontakt
            </button>
          </div>

          <div className="pt-2 space-y-2">
            {user ? (
              <>
                <button
                  onClick={() => {
                    onOpenDashboard();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Przejdź do Panelu Pracownika ({user.fullName})
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-sm text-red-600 font-semibold"
                >
                  Wyloguj się
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 border border-slate-200 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Zaloguj się do konta
                </button>
                <button
                  onClick={() => {
                    onOpenRegister();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-md flex items-center justify-center gap-2"
                >
                  Rozpocznij współpracę (0,99 zł/szt.)
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
