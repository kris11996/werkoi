import React from 'react';
import { REVIEWS } from '../data/mockData';
import { Star, CheckCircle, Quote, MapPin } from 'lucide-react';
import happyWorkerImg from '../assets/images/happy_worker_1792582997352.jpg';

export const WorkerStories: React.FC = () => {
  return (
    <section id="opinie" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full inline-block mb-3">
            Prawdziwe doświadczenia
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Co mówią osoby współpracujące z długopisyJOB?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            W całej Polsce z naszych pakietów korzystają studenci, emeryci, młode mamy oraz osoby poszukujące pewnego dodatkowego dochodu bez opuszczania domu.
          </p>
        </div>

        {/* Featured Story with Image */}
        <div className="mb-14 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-square">
                <img
                  src={happyWorkerImg || "/images/happy_worker.jpg"}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/happy_worker.jpg';
                  }}
                  alt="Katarzyna z Radomia - zadowolona współpracownica długopisyJOB"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow-lg border border-slate-200 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Zweryfikowany chałupnik</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
                <span className="text-xs font-semibold text-slate-300 ml-2">Ocena 5.0 / 5.0</span>
              </div>

              <blockquote className="text-lg sm:text-xl text-slate-100 italic leading-relaxed font-serif">
                &ldquo;Początkowo bałam się, że to jak większość ogłoszeń chałupniczych jakaś naciągana oferta. Tu jednak zaskoczenie: zero opłat wstępnych, kurier przywiózł karton prosto pod drzwi z czytelną instrukcją. Składam wieczorami oglądając seriale. Pierwsza wypłata 990 zł wpłynęła na konto następnego dnia po odbiorze paczki!&rdquo;
              </blockquote>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-base">Katarzyna Wiśniewska (34 lata)</h4>
                  <p className="text-xs text-blue-200">Mama dwójki dzieci na urlopie • Radom</p>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-xl text-right">
                  <span className="text-[10px] uppercase text-slate-300 block">Zarobek łącznie:</span>
                  <span className="text-lg font-black text-amber-300 font-display">2 070,00 zł</span>
                  <span className="text-[10px] text-slate-300 block">(3 000 długopisów)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2 More Worker Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {REVIEWS.slice(1).map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">{rev.author} ({rev.age} l.)</h5>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {rev.city} • {rev.occupation}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-500 block">Wypłacono:</span>
                  <span className="font-extrabold text-blue-700 text-sm font-display">
                    {rev.totalEarned.toFixed(2)} zł
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
