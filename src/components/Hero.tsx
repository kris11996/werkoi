import React from 'react';
import { ShieldCheck, Truck, Clock, CheckCircle2, ArrowRight, Calculator, Award } from 'lucide-react';
import heroCraftsmanImg from '../assets/images/hero_craftsman_1792582995311.jpg';

interface HeroProps {
  onOpenRegister: () => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onScrollToCalculator }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-r from-blue-200/40 via-indigo-100/30 to-amber-100/30 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-200/80 shadow-xs">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              <span className="text-xs font-bold text-blue-900 tracking-wide">
                OFICJALNY PROGRAM PRACY CHAŁUPNICZEJ 2026
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display">
                Składaj długopisy w domu i zarabiaj{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 underline decoration-amber-400 decoration-wavy decoration-2">
                  0,99 zł
                </span>{' '}
                za sztukę
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Współpracuj z firmą <strong className="text-slate-900 font-semibold">DługopisyJOB</strong>. 
                Dostarczamy kompletne elementy bezpośrednio pod Twoje drzwi. 
                Ty składasz długopisy w wolnym czasie – my płacimy za każdą złożoną sztukę bez opóźnień.
              </p>
            </div>

            {/* Core Value Props List */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 text-sm font-medium text-slate-700 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">0 zł opłat wstępnych</strong>
                  <span className="text-xs text-slate-500">Nigdy nie pobieramy kaucji ani zaliczek</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm font-medium text-slate-700 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                <div className="p-1 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Darmowy kurier w obie strony</strong>
                  <span className="text-xs text-slate-500">DPD dostarcza i odbiera gotowe paczki</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm font-medium text-slate-700 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                <div className="p-1 rounded-lg bg-amber-100 text-amber-700 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Wypłata w 24 godziny</strong>
                  <span className="text-xs text-slate-500">Przelew na konto po kontroli jakości</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm font-medium text-slate-700 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                <div className="p-1 rounded-lg bg-indigo-100 text-indigo-700 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Legalna polska umowa</strong>
                  <span className="text-xs text-slate-500">Umowa o dzieło lub zlecenie z PIT-11</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Aplikuj o darmowy pakiet startowy</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs hover:border-slate-400 transition-all cursor-pointer"
              >
                <Calculator className="w-5 h-5 text-blue-600" />
                <span>Oblicz ile zarobisz (0,99 zł)</span>
              </button>
            </div>

            {/* Security guarantee note */}
            <p className="text-xs text-slate-500 flex items-center gap-2 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Gwarancja bezpiecznej współpracy • Ponad 2 400 zadowolonych chałupników w całej Polsce</span>
            </p>
          </div>

          {/* Right Column - Hero Visual card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img
                  src={heroCraftsmanImg || "/images/hero_craftsman.jpg"}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/hero_craftsman.jpg';
                  }}
                  alt="Montaż długopisów w domu - stanowisko pracy DługopisyJOB"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] object-cover group-hover:scale-102 transition-transform duration-500"
                />

                {/* Overlaid Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Card Overlay Details */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="flex items-center justify-between gap-3 bg-white/20 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                    <div>
                      <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
                        Cena za montaż
                      </span>
                      <p className="text-2xl font-black font-display">
                        0,99 zł <span className="text-xs font-normal text-slate-200">/ 1 długopis</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
                        Średni czas
                      </span>
                      <p className="text-base font-bold text-white">
                        ~25 sekund <span className="text-xs font-normal text-slate-200">/ szt.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 - Top Right */}
              <div className="absolute -top-4 -right-4 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-subtle">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg">
                  💰
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">1 000 sztuk</p>
                  <p className="text-sm font-extrabold text-slate-900">= 990,00 zł</p>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Left */}
              <div className="absolute -bottom-5 -left-4 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Dostawa & Odbiór</p>
                  <p className="text-sm font-extrabold text-emerald-600">Bezpłatnie (0 zł)</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Four Trust Metrics Counters */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 shadow-2xs">
            <p className="text-3xl font-black text-blue-600 font-display">0,99 zł</p>
            <p className="text-xs text-slate-600 font-medium mt-1">Stawka za złożony długopis</p>
          </div>
          <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 shadow-2xs">
            <p className="text-3xl font-black text-slate-900 font-display">0 zł</p>
            <p className="text-xs text-slate-600 font-medium mt-1">Kosztów ukrytych czy kaucji</p>
          </div>
          <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 shadow-2xs">
            <p className="text-3xl font-black text-emerald-600 font-display">24h</p>
            <p className="text-xs text-slate-600 font-medium mt-1">Gwarantowany termin wypłaty</p>
          </div>
          <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60 shadow-2xs">
            <p className="text-3xl font-black text-indigo-600 font-display">2 400+</p>
            <p className="text-xs text-slate-600 font-medium mt-1">Aktywnych współpracowników w PL</p>
          </div>
        </div>

      </div>
    </section>
  );
};
