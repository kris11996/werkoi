import React, { useState } from 'react';
import { RATE_PER_PEN } from '../data/mockData';
import { Calculator, Sparkles, TrendingUp, Clock, Calendar, Check, ArrowRight } from 'lucide-react';

interface EarningsCalculatorProps {
  onSelectCount: (count: number) => void;
}

export const EarningsCalculator: React.FC<EarningsCalculatorProps> = ({ onSelectCount }) => {
  const [pensCount, setPensCount] = useState<number>(1000);
  const [assemblySpeedSeconds, setAssemblySpeedSeconds] = useState<number>(25); // average 25s per pen

  const totalEarned = pensCount * RATE_PER_PEN;
  const totalSeconds = pensCount * assemblySpeedSeconds;
  const totalHours = Math.round((totalSeconds / 3600) * 10) / 10;
  
  // Daily estimation if done over 14 days or 30 days
  const dailyPensAt30Days = Math.ceil(pensCount / 30);
  const dailyMinutes = Math.round((dailyPensAt30Days * assemblySpeedSeconds) / 60);

  const presets = [
    { label: '500 sztuk', count: 500, highlight: '495 zł' },
    { label: '1 000 sztuk', count: 1000, highlight: '990 zł', popular: true },
    { label: '2 500 sztuk', count: 2500, highlight: '2 475 zł' },
    { label: '5 000 sztuk', count: 5000, highlight: '4 950 zł' },
  ];

  const getWhatItCovers = (amount: number) => {
    if (amount <= 600) return 'Dodatkowe zakupy spożywcze na 2 tygodnie lub opłata rachunków za prąd i internet';
    if (amount <= 1200) return 'Pełne zatankowanie 2 baków paliwa + weekendowy wyjazd wypoczynkowy';
    if (amount <= 2500) return 'Rata kredytu hipotecznego / gotówkowego lub spory zastrzyk do domowych oszczędności';
    return 'Kompletne miesięczne utrzymanie, wakacje marzeń lub pełna wypłata bez wychodzenia z domu';
  };

  return (
    <section id="kalkulator" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Interaktywny kalkulator zysków
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Sprawdź, ile zarobisz przy stawce <span className="text-blue-600">0,99 zł</span> za długopis
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Przesuń suwak i dopasuj liczbę długopisów do swojego wolnego czasu. Ty decydujesz, ile składasz!
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-700">
          
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Sliders and Presets */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Presets */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
                  Szybki wybór popularnych pakietów:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.count}
                      onClick={() => setPensCount(preset.count)}
                      className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all border cursor-pointer ${
                        pensCount === preset.count
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30 ring-2 ring-blue-400/30'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700'
                      }`}
                    >
                      <div>{preset.label}</div>
                      <div className="text-[11px] opacity-80 mt-0.5 font-normal text-amber-300">{preset.highlight}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Range Slider for pens */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-200">
                    Liczba długopisów do złożenia:
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-amber-400 font-display">
                      {pensCount.toLocaleString('pl-PL')}
                    </span>
                    <span className="text-xs text-slate-400">sztuk</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={pensCount}
                  onChange={(e) => setPensCount(Number(e.target.value))}
                  className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />

                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>100 szt. (99 zł)</span>
                  <span>1 000 szt. (990 zł)</span>
                  <span>2 500 szt. (2 475 zł)</span>
                  <span>5 000 szt. (4 950 zł)</span>
                </div>
              </div>

              {/* Tempo toggle */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-blue-400" />
                    Twoje tempo składania 1 sztuki:
                  </span>
                  <span className="font-bold text-white bg-slate-700 px-2 py-0.5 rounded">
                    {assemblySpeedSeconds} sekund
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setAssemblySpeedSeconds(35)}
                    className={`py-1.5 px-2 text-xs rounded-lg font-medium transition cursor-pointer ${
                      assemblySpeedSeconds === 35 ? 'bg-blue-600 text-white' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Początkujący (35s)
                  </button>
                  <button
                    onClick={() => setAssemblySpeedSeconds(25)}
                    className={`py-1.5 px-2 text-xs rounded-lg font-medium transition cursor-pointer ${
                      assemblySpeedSeconds === 25 ? 'bg-blue-600 text-white' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Średnie (25s)
                  </button>
                  <button
                    onClick={() => setAssemblySpeedSeconds(18)}
                    className={`py-1.5 px-2 text-xs rounded-lg font-medium transition cursor-pointer ${
                      assemblySpeedSeconds === 18 ? 'bg-blue-600 text-white' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Wprawiony (18s)
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Earnings Summary Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-2xl p-6 border border-slate-700/90 flex flex-col justify-between space-y-6">
              
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Twój gwarantowany zarobek:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-amber-400 font-display">
                    {totalEarned.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-2xl font-bold text-amber-300">zł</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Stawka stała: Dokładnie 0,99 zł / szt.
                </p>
              </div>

              {/* Breakdown stats */}
              <div className="space-y-3 py-3 border-y border-slate-700/80 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-400" />
                    Łączny szacowany czas pracy:
                  </span>
                  <span className="font-bold text-white text-sm">~{totalHours} godz.</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    Przy rozłożeniu na 30 dni:
                  </span>
                  <span className="font-bold text-white text-sm">~{dailyMinutes} min dziennie ({dailyPensAt30Days} szt.)</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    Zarobek na czysto (0 zł kosztów):
                  </span>
                  <span className="font-bold text-emerald-400 text-sm">100% kwoty dla Ciebie</span>
                </div>
              </div>

              {/* What this covers */}
              <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-900/60 text-xs text-blue-200">
                <span className="font-semibold text-amber-300 block mb-0.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Przykładowe przeznaczenie:
                </span>
                {getWhatItCovers(totalEarned)}
              </div>

              {/* CTA button */}
              <button
                onClick={() => onSelectCount(pensCount)}
                className="w-full py-3.5 rounded-xl text-center font-bold text-sm text-slate-900 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Aplikuj na tę liczbę sztuk ({totalEarned.toFixed(0)} zł)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
