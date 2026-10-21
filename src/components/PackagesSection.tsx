import React from 'react';
import { PACKAGES } from '../data/mockData';
import { Check, Truck, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface PackagesSectionProps {
  onSelectPackage: (packageId: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  return (
    <section id="pakiety" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Wybierz wielkość partii montażowej
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Pakiety montażowe DługopisyJOB ze stawką <span className="text-blue-600">0,99 zł</span>
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Wszystkie pakiety dostarczane są bezpłatnie kurierem DPD. Nigdy nie pobieramy opłat ani kaucji za materiały!
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.isPopular
                  ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-600/10 scale-102 lg:-translate-y-2'
                  : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs whitespace-nowrap ${
                    pkg.isPopular
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-100'
                  }`}>
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="text-center pb-4 border-b border-slate-100 pt-2">
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{pkg.description}</p>

                  <div className="mt-4">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full mb-1">
                      Koszt: 0 zł (Za darmo)
                    </div>
                    <div>
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
                        {pkg.totalPayout.toFixed(0)} <span className="text-xl">zł</span>
                      </span>
                    </div>
                    <span className="text-xs text-emerald-700 block font-semibold mt-0.5">
                      Twój zysk: 0,99 zł x {pkg.pensCount.toLocaleString('pl-PL')} szt.
                    </span>
                  </div>
                </div>

                {/* Package Quick specs */}
                <div className="py-4 space-y-2 text-xs border-b border-slate-100 text-slate-600">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Cena zestawu:</span>
                    <strong className="text-emerald-700 font-bold">0,00 zł (Darmowy)</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Liczba długopisów:</span>
                    <strong className="text-slate-800 font-bold">{pkg.pensCount.toLocaleString('pl-PL')} sztuk</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Czas na wykonanie:</span>
                    <strong className="text-slate-800 font-bold">do {pkg.maxDays} dni</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Szacowany czas pracy:</span>
                    <strong className="text-slate-800 font-bold">{pkg.estimatedHours}</strong>
                  </div>
                </div>

                {/* Features list */}
                <div className="py-4 space-y-2.5">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    pkg.isPopular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Zamów za darmo (0 zł)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500">
                  <Truck className="w-3 h-3 text-emerald-600" />
                  <span>Darmowa przesyłka kurierska DPD</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Trust Guarantee Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 font-display">
                Gwarancja Bezpieczeństwa DługopisyJOB
              </h4>
              <p className="text-xs text-slate-600">
                Nie jesteśmy pośrednikiem. Jesteśmy legalnie działającym producentem artykułów piśmienniczych. 
                Nigdy nie wymagamy od współpracowników płatności za materiały.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-center md:text-right">
            <span className="text-xs text-slate-500 block">Stawka gwarantowana umową:</span>
            <span className="text-lg font-black text-blue-700 font-display">0,99 zł / każdy złożony długopis</span>
          </div>
        </div>

      </div>
    </section>
  );
};
