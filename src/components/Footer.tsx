import React from 'react';
import { PenTool, ShieldCheck, Truck, Banknote, Heart, Lock } from 'lucide-react';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerms,
  onOpenRegister,
  onOpenLogin,
  onScrollTo
}) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 3 Trust Columns */}
        <div className="grid md:grid-cols-3 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-white block">Gwarancja 0 zł opłat wstępnych</strong>
              <p className="text-xs text-slate-400 mt-0.5">
                Nigdy nie wymagamy przedpłat, kaucji ani zakupu materiałów. 100% legalna praca chałupnicza.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-white block">Stawka 0,99 zł za długopis</strong>
              <p className="text-xs text-slate-400 mt-0.5">
                Przejrzyste zasady i terminowe przelewy w ciągu 24-48 godzin bezpośrednio na Twój rachunek bankowy.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-white block">Darmowy kurier DPD w obie strony</strong>
              <p className="text-xs text-slate-400 mt-0.5">
                Bezpieczne doręczenie pod Twoje drzwi i bezpłatny odbiór gotowych partii na terenie całej Polski.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <PenTool className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight font-display">
                długopisy<span className="text-blue-500">JOB</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Lider na polskim rynku konfekcjonowania i montażu chałupniczego artykułów biurowych. Zapewniamy stabilne, bezpieczne i uczciwie opłacane zajęcie w domowych warunkach.
            </p>

            <div className="text-[11px] text-slate-500 space-y-1 font-mono">
              <p>długopisyJOB Sp. z o.o. • KRS 0000845912</p>
              <p>NIP: 525-28-19-481 • REGON: 386129481</p>
              <p>Al. Jerozolimskie 142B, 02-305 Warszawa</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Nawigacja
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onScrollTo('jak-to-dziala')} className="hover:text-white transition cursor-pointer">
                  Jak to działa
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('kalkulator')} className="hover:text-white transition cursor-pointer">
                  Kalkulator zarobków (0,99 zł)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('symulator')} className="hover:text-white transition cursor-pointer">
                  Symulator montażu
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('pakiety')} className="hover:text-white transition cursor-pointer">
                  Pakiety montażowe
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('opinie')} className="hover:text-white transition cursor-pointer">
                  Opinie współpracowników
                </button>
              </li>
            </ul>
          </div>

          {/* Strefa Pracownika */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Strefa Współpracy
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenRegister} className="hover:text-white text-blue-400 font-semibold transition cursor-pointer">
                  Aplikuj o zestaw startowy
                </button>
              </li>
              <li>
                <button onClick={onOpenLogin} className="hover:text-white transition cursor-pointer">
                  Logowanie chałupnika
                </button>
              </li>
              <li>
                <button onClick={onOpenTerms} className="hover:text-white transition cursor-pointer">
                  Regulamin współpracy
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('faq')} className="hover:text-white transition cursor-pointer">
                  Częste pytania (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('kontakt')} className="hover:text-white transition cursor-pointer">
                  Kontakt i infolinia
                </button>
              </li>
            </ul>
          </div>

          {/* Certifications and Security */}
          <div className="col-span-2 md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Gwarancja praworządności
            </h4>
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Bezpieczne połączenie SSL</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Przetwarzanie danych osobowych zgodne z RODO. Wszystkie umowy podlegają polskiemu Kodeksowi Cywilnemu.
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              Infolinia pomocnicza czynna Pn-Pt: 8:00 - 18:00
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} długopisyJOB Sp. z o.o. Wszelkie prawa zastrzeżone.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition cursor-pointer">
              Regulamin serwisu
            </button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition cursor-pointer">
              Polityka Prywatności i Cookies
            </button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition cursor-pointer">
              RODO
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
