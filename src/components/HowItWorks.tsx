import React from 'react';
import { Package, Truck, Wrench, Banknote, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import deliveryBoxImg from '../assets/images/delivery_box_1792582997645.jpg';

interface HowItWorksProps {
  onOpenRegister: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenRegister }) => {
  const steps = [
    {
      num: '01',
      icon: <Package className="w-6 h-6 text-blue-600" />,
      title: 'Zgłoszenie i wybór pakietu',
      description: 'Wypełniasz krótki formularz online (imię, adres do dostawy i numer konta do wypłat). Wybierasz dogodną wielkość pakietu: 500, 1000 lub więcej sztuk. Bez żadnych opłat wstępnych ani kaucji.',
      highlight: '0 zł opłaty rejestracyjnej'
    },
    {
      num: '02',
      icon: <Truck className="w-6 h-6 text-indigo-600" />,
      title: 'Bezpłatna dostawa kurierem DPD',
      description: 'W ciągu 24-48 godzin kurier dostarcza pod Twoje drzwi bezpiecznie zapakowany Starter Pack z elementami (korpusy, sprężynki, wkłady żelowe) oraz czytelną instrukcją techniczną.',
      highlight: 'Dostawa na koszt firmy'
    },
    {
      num: '03',
      icon: <Wrench className="w-6 h-6 text-amber-600" />,
      title: 'Składanie w wolnym czasie',
      description: 'Pracujesz kiedy chcesz i jak chcesz – rano przy kawie, wieczorem po pracy lub w weekendy. Masz od 21 do 30 dni na realizację. Każdy pakiet posiada +3% zapasowych części na wypadek pomyłki.',
      highlight: 'Czas montażu: ~25 sek / sztuka'
    },
    {
      num: '04',
      icon: <Banknote className="w-6 h-6 text-emerald-600" />,
      title: 'Odbiór i przelew 0,99 zł / szt.',
      description: 'Gdy skończysz partię, klikasz jeden przycisk w panelu lub dzwonisz – kurier bezpłatnie odbiera gotowe długopisy. Po szybkiej kontroli zgodności przelewamy środki w 24 godziny bezpośrednio na Twoje konto.',
      highlight: 'Wypłata gwarantowana w 24h'
    }
  ];

  return (
    <section id="jak-to-dziala" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3.5 py-1 rounded-full inline-block mb-3">
            Prosty i przejrzysty proces
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Jak wygląda współpraca z DługopisyJOB krok po kroku?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Od rejestracji po pierwszy przelew na konto. Bez skomplikowanych formalności, bez wychodzenia z domu.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, idx) => (
            <div 
              key={step.num}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-100">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200 font-display">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{step.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Product & Packaging Showcase Bento */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Showcase Image - Box */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                <img
                  src={deliveryBoxImg || "/images/delivery_box.jpg"}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/delivery_box.jpg';
                  }}
                  alt="Zestaw startowy DługopisyJOB Starter Pack"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md text-white p-3 rounded-xl text-xs flex items-center justify-between border border-white/10">
                <span className="font-semibold flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-amber-400" />
                  DługopisyJOB Starter Pack
                </span>
                <span className="text-slate-300">Gotowy do montażu</span>
              </div>
            </div>

            {/* Right Showcase Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                Co dokładnie znajduje się w paczce?
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Otrzymujesz kompletny, uporządkowany zestaw montażowy
              </h3>

              <div className="space-y-3.5 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-900 font-semibold block">Wyprofilowane elementy obudowy i klipsy:</strong>
                    Wysokiej jakości tworzywo ABS oraz elementy metalowe, posegregowane w wytłoczkach transportowych.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-900 font-semibold block">Wkłady olejowo-żelowe i sprężynki:</strong>
                    Zabezpieczone wkładki piszące z woskową końcówką ochronną zapobiegającą wysychaniu podczas pracy.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-900 font-semibold block">Kolorowa instrukcja techniczna:</strong>
                    Wydrukowana na kredowym papierze instrukcja z makrofotografiami każdego kroku montażu.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <strong className="text-slate-900 font-semibold block">Przedpłacona etykieta zwrotna DPD:</strong>
                    Wystarczy nakleić ją na ten sam karton i przekazać kurierowi przy odbiorze.
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={onOpenRegister}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Zamów zestaw startowy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-500">
                  Czas realizacji wysyłki z magazynu centralnego: <strong>do 24 godzin</strong>
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
