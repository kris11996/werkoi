import React from 'react';
import { ArrowLeft, Printer, ShieldCheck, Download, FileText, CheckCircle2 } from 'lucide-react';

interface TermsViewProps {
  onBack: () => void;
  onOpenRegister: () => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ onBack, onOpenRegister }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & actions bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót do strony głównej
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-white transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              Drukuj regulamin
            </button>
            <button
              onClick={onOpenRegister}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Rozpocznij współpracę
            </button>
          </div>
        </div>

        {/* Legal Paper Sheet */}
        <article className="bg-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-200 text-slate-800 space-y-8 leading-relaxed text-sm">
          
          {/* Header */}
          <div className="border-b border-slate-200 pb-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-0.5 rounded-full inline-block">
              Dokument prawny • Stan prawny: 2026 r.
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              REGULAMIN ŚWIADCZENIA USŁUG MONTAŻU CHAŁUPNICZEGO
            </h1>
            <p className="text-xs text-slate-500">
              DługopisyJOB Sp. z o.o. • NIP: 525-28-19-481 • KRS: 0000845912 • REGON: 386129481
            </p>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-emerald-900 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Gwarancja braku opłat wstępnych:</strong>
              Firma DługopisyJOB oświadcza, że w żadnym etapie współpracy nie pobiera od Wykonawcy kaucji, opłat wpisowych, opłat za kuriera ani kosztów materiałów montażowych. Wszelkie koszty logistyczne i surowcowe obciążają w 100% Zleceniodawcę.
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-display border-l-4 border-blue-600 pl-3">
              § 1. Postanowienia ogólne i Dane Zleceniodawcy
            </h2>
            <p>
              1. Niniejszy Regulamin określa zasady i warunki nawiązywania współpracy w zakresie pracy nakładczej (chałupniczej) polegającej na manualnym montażu długopisów automatycznych.
            </p>
            <p>
              2. Zleceniodawcą jest firma <strong>DługopisyJOB Sp. z o.o.</strong> z siedzibą przy Al. Jerozolimskich 142B, 02-305 Warszawa, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem KRS 0000845912, NIP 525-28-19-481, REGON 386129481, kapitał zakładowy 200 000 PLN w pełni opłacony (zwana dalej &bdquo;Zleceniodawcą&rdquo;).
            </p>
            <p>
              3. Wykonawcą może być każda pełnoletnia osoba fizyczna posiadająca pełną zdolność do czynności prawnych, zamieszkała na terytorium Rzeczypospolitej Polskiej.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-display border-l-4 border-blue-600 pl-3">
              § 2. Stawka wynagrodzenia (0,99 zł za sztukę)
            </h2>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-semibold text-slate-900">
                1. Stawka jednostkowa za każdy prawidłowo zmontowany długopis wynosi ściśle: <span className="text-blue-700 font-bold text-base">0,99 zł</span> (dziewięćdziesiąt dziewięć groszy).
              </p>
              <p className="mt-2 text-xs text-slate-600">
                2. Przykładowe łączne kwoty wynagrodzenia w zależności od wybranego pakietu:
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-slate-700">
                <li>Pakiet 500 sztuk = <strong>495,00 zł</strong></li>
                <li>Pakiet 1 000 sztuk = <strong>990,00 zł</strong></li>
                <li>Pakiet 2 500 sztuk = <strong>2 475,00 zł</strong></li>
                <li>Pakiet 5 000 sztuk = <strong>4 950,00 zł</strong></li>
              </ul>
            </div>
            <p>
              3. Wynagrodzenie wypłacane jest przelewem bankowym na rachunek wskazany przez Wykonawcę w formularzu rejestracyjnym w terminie maksymalnie <strong>24 do 48 godzin</strong> od momentu przyjęcia i przeliczenia partii w magazynie centralnym.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-display border-l-4 border-blue-600 pl-3">
              § 3. Dostawa materiałów i odbiór gotowych wyrobów
            </h2>
            <p>
              1. Zleceniodawca dostarcza kompletne materiały montażowe za pośrednictwem firmy kurierskiej DPD lub InPost bezpośrednio pod adres wskazany przez Wykonawcę na terytorium Polski.
            </p>
            <p>
              2. <strong>Koszt transportu (nadanie pakietu oraz odbiór gotowych długopisów) ponosi w 100% Zleceniodawca.</strong> Wykonawca nie uiszcza żadnych opłat kurierowi.
            </p>
            <p>
              3. Standardowy czas na złożenie partii wynosi od 21 do 60 dni (w zależności od wielkości pakietu), z możliwością bezpłatnego przedłużenia terminu po kontakcie z koordynatorem.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-display border-l-4 border-blue-600 pl-3">
              § 4. Standardy jakościowe i bufor bezpieczeństwa
            </h2>
            <p>
              1. Każdy pakiet montażowy zawiera fabryczny bufor bezpieczeństwa w wysokości <strong>+3% dodatkowych elementów gratis</strong> na wypadek uszkodzenia mechanicznego podczas składania.
            </p>
            <p>
              2. Prawidłowo zmontowany długopis charakteryzuje się: stabilnym osadzeniem wkładu, płynnym działaniem mechanizmu klikająco-obrotowego oraz brakiem widocznych pęknięć na korpusie.
            </p>
            <p>
              3. W przypadku stwierdzenia fabrycznie wadliwych elementów Wykonawca nie ponosi żadnej odpowiedzialności finansowej; wadliwe części podlegają natychmiastowej darmowej wymianie.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-display border-l-4 border-blue-600 pl-3">
              § 5. Forma zawarcia umowy i podatki
            </h2>
            <p>
              1. Współpraca realizowana jest w oparciu o umowę o dzieło z przeniesieniem praw lub umowę zlecenie (zgodnie z wyborem Wykonawcy).
            </p>
            <p>
              2. Zleceniodawca sporządza roczną deklarację podatkową PIT-11 i przesyła ją Wykonawcy drogą elektroniczną lub listowną do końca lutego roku następującego po roku rozliczeniowym.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-display border-l-4 border-blue-600 pl-3">
              § 6. Prawo do odstąpienia i rezygnacja
            </h2>
            <p>
              1. Wykonawca ma prawo do rezygnacji ze współpracy w dowolnym momencie bez podawania przyczyny w terminie 14 dni od otrzymania pakietu startowego.
            </p>
            <p>
              2. W przypadku rezygnacji Zleceniodawca wysyła bezpłatnego kuriera w celu odebrania niewykorzystanych materiałów. Z tego tytułu nie są naliczane żadne kary ani opłaty manipulacyjne.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 font-display border-l-4 border-blue-600 pl-3">
              § 7. Ochrona danych osobowych (RODO)
            </h2>
            <p>
              1. Administratorem danych osobowych jest DługopisyJOB Sp. z o.o. Dane przetwarzane są wyłącznie w celu realizacji umowy, doręczenia przesyłek kurierskich oraz dokonywania wypłat wynagrodzenia.
            </p>
            <p>
              2. Wykonawcy przysługuje prawo wglądu do swoich danych, ich poprawiania, żądania ograniczenia przetwarzania oraz usunięcia.
            </p>
          </section>

          {/* Footer of the agreement */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zatwierdzone przez Dział Prawny DługopisyJOB Sp. z o.o.</span>
            </div>
            <button
              onClick={onOpenRegister}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Akceptuję i przechodzę do rejestracji
            </button>
          </div>

        </article>

      </div>
    </div>
  );
};
