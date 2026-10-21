import React, { useState } from 'react';
import { PenTool, CheckCircle, RotateCcw, Sparkles, ArrowRight, Info, Check } from 'lucide-react';
import { RATE_PER_PEN } from '../data/mockData';

interface SimulatorProps {
  onOpenRegister: () => void;
}

interface AssemblyPart {
  step: number;
  id: string;
  name: string;
  description: string;
  iconText: string;
}

export const InteractiveAssemblySimulator: React.FC<SimulatorProps> = ({ onOpenRegister }) => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 to 5
  const [assembledCount, setAssembledCount] = useState<number>(1);
  const [isClickingSound, setIsClickingSound] = useState<boolean>(false);

  const parts: AssemblyPart[] = [
    {
      step: 1,
      id: 'barrel',
      name: '1. Korpus dolny (uchwyt)',
      description: 'Ergonomiczna dolna część długopisu z gwintem wewnętrznym i otworem na końcówkę.',
      iconText: '🖊️'
    },
    {
      step: 2,
      id: 'refill',
      name: '2. Wkład z tuszem żelowym',
      description: 'Precyzyjny wkład z kulką wolframową, zabezpieczony woskową mikroskopijną zatyczką.',
      iconText: '✒️'
    },
    {
      step: 3,
      id: 'spring',
      name: '3. Sprężynka amortyzująca',
      description: 'Niewielka spiralna sprężyna nakładana na końcówkę wkładu przed wsunięciem.',
      iconText: '🌀'
    },
    {
      step: 4,
      id: 'mechanism',
      name: '4. Mechanizm klikowy (serce)',
      description: 'Wieloząbkowy mechanizm obrotowy odpowiadający za wysuwanie i chowanie wkładu.',
      iconText: '⚙️'
    },
    {
      step: 5,
      id: 'cap',
      name: '5. Górna obudowa z klipsem',
      description: 'Górna część dokręcana do korpusu dolnego. Kliknięcie testowe kończy montaż.',
      iconText: '✨'
    }
  ];

  // Play a brief synthesized audio click when assembled
  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch {
      // Audio context might be restricted before interaction; safe to ignore
    }
  };

  const handleNextPart = () => {
    if (currentStep < 5) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (nextStep === 5) {
        setIsClickingSound(true);
        playClickSound();
        setAssembledCount((prev) => prev + 1);
        setTimeout(() => setIsClickingSound(false), 800);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const virtualEarnings = assembledCount * RATE_PER_PEN;

  return (
    <section id="symulator" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Interaktywna próba montażu
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Wypróbuj montaż długopisu online przed rozpoczęciem
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Zobacz, jak intuicyjne i proste jest składanie naszych długopisów. Klikaj kolejne elementy, by złożyć cały model!
          </p>
        </div>

        {/* Simulator Container */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden">
          
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Assembly Stage */}
            <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[420px] relative">
              
              {/* Virtual Earnings Pill */}
              <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-700 text-xs flex items-center gap-2">
                <span className="text-slate-400">Symulacja zysku:</span>
                <span className="font-extrabold text-amber-400 text-sm">
                  {virtualEarnings.toFixed(2)} zł
                </span>
                <span className="text-[10px] text-slate-400">({assembledCount} szt.)</span>
              </div>

              {/* Step indicator */}
              <div className="absolute top-4 right-4 bg-blue-900/60 text-blue-200 px-3 py-1 rounded-lg text-xs font-semibold border border-blue-800">
                Krok {currentStep} / 5
              </div>

              {/* Graphic Representation of Pen being assembled */}
              <div className="w-full flex flex-col items-center justify-center py-10 relative">
                
                {/* Visual SVG schematic */}
                <div className="w-64 h-72 relative flex flex-col items-center justify-center">
                  
                  {/* Step 5: Cap & Button */}
                  <div className={`transition-all duration-500 transform ${currentStep >= 5 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-20 -translate-y-8 scale-90'}`}>
                    <div className="w-14 h-16 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-800 rounded-t-xl border border-blue-400 flex items-center justify-center shadow-lg relative">
                      <div className="absolute -top-3 w-6 h-3 bg-amber-400 rounded-t-sm shadow-xs animate-pulse"></div>
                      <div className="absolute top-2 right-[-8px] w-2 h-10 bg-slate-300 rounded-r-xs border border-slate-400"></div>
                      <span className="text-[9px] font-bold text-blue-100">KLIPS</span>
                    </div>
                  </div>

                  {/* Step 4: Mechanism Core */}
                  <div className={`transition-all duration-500 transform ${currentStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-20 -translate-y-4'}`}>
                    <div className="w-8 h-8 bg-gradient-to-r from-slate-400 to-slate-200 rounded-sm border border-slate-500 flex items-center justify-center text-[8px] font-bold text-slate-900 my-0.5 shadow-xs">
                      ⚙️
                    </div>
                  </div>

                  {/* Step 3: Spring */}
                  <div className={`transition-all duration-500 transform ${currentStep >= 3 ? 'opacity-100 scale-100' : 'opacity-20 scale-75'}`}>
                    <div className="w-5 h-6 flex flex-col justify-between items-center py-0.5">
                      <div className="w-4 h-0.5 bg-amber-300"></div>
                      <div className="w-4 h-0.5 bg-amber-300"></div>
                      <div className="w-4 h-0.5 bg-amber-300"></div>
                      <div className="w-4 h-0.5 bg-amber-300"></div>
                    </div>
                  </div>

                  {/* Step 2: Ink refill */}
                  <div className={`transition-all duration-500 transform ${currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-20 -translate-y-2'}`}>
                    <div className="w-4 h-24 bg-gradient-to-b from-blue-900 to-blue-400 rounded-full border border-blue-300 relative flex items-end justify-center shadow-inner">
                      <div className="w-1.5 h-3 bg-slate-200 rounded-b-full"></div>
                    </div>
                  </div>

                  {/* Step 1: Bottom barrel */}
                  <div className={`transition-all duration-500 transform ${currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4'}`}>
                    <div className="w-14 h-24 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-900 rounded-b-2xl border border-blue-400 flex items-center justify-center shadow-lg relative -mt-4">
                      <span className="text-[10px] font-bold text-blue-200">KORPUS</span>
                      <div className="absolute -bottom-2 w-3 h-2 bg-slate-300 rounded-b-xs"></div>
                    </div>
                  </div>

                </div>

                {/* Status message */}
                <div className="mt-4 text-center">
                  {currentStep === 5 ? (
                    <div className="animate-bounce">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-sm font-bold">
                        <CheckCircle className="w-4 h-4" />
                        Długopis złożony poprawnie! (+0,99 zł)
                      </span>
                    </div>
                  ) : currentStep === 0 ? (
                    <span className="text-xs text-slate-400">
                      Kliknij poniżej &quot;Dodaj 1. część&quot;, aby rozpocząć montaż
                    </span>
                  ) : (
                    <span className="text-xs text-blue-300">
                      Element dodany! Kliknij kolejną część, aby kontynuować montaż.
                    </span>
                  )}
                </div>

              </div>

              {/* Quick Actions inside stage */}
              <div className="w-full flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Rozpocznij od nowa
                </button>

                {currentStep < 5 ? (
                  <button
                    onClick={handleNextPart}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/30 cursor-pointer"
                  >
                    <span>Dodaj element #{currentStep + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-emerald-600/30 cursor-pointer"
                  >
                    <span>Złóż kolejny długopis (+0,99 zł)</span>
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

            {/* Right: Steps list & Parts explanations */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white font-display">
                  Komponenty standardowego długopisu
                </h3>
                <span className="text-xs text-amber-400 font-semibold">
                  0,99 zł za każdy montaż
                </span>
              </div>

              <div className="space-y-2.5">
                {parts.map((p) => {
                  const isDone = currentStep >= p.step;
                  const isCurrent = currentStep + 1 === p.step;

                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        if (currentStep < p.step) {
                          setCurrentStep(p.step);
                        }
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isDone
                          ? 'bg-blue-950/40 border-blue-500/40 text-white'
                          : isCurrent
                          ? 'bg-slate-800 border-amber-400/80 text-white ring-1 ring-amber-400/40'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800/70'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-sm shrink-0">
                        {isDone ? <Check className="w-4 h-4 text-emerald-400" /> : p.iconText}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-semibold ${isDone ? 'text-blue-300' : isCurrent ? 'text-amber-300' : 'text-slate-300'}`}>
                            {p.name}
                          </span>
                          {isDone && (
                            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              Zamontowano
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Callout */}
              <div className="pt-2">
                <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 p-4 rounded-xl border border-blue-800/80 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-blue-200">
                      W paczce otrzymujesz 500 lub 1000 takich kompletów + instrukcję wideo.
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      Podoba Ci się taka praca w domu?
                    </p>
                  </div>
                  <button
                    onClick={onOpenRegister}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl font-bold text-xs shrink-0 shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Zamów zestaw</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
