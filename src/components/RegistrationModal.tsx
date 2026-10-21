import React, { useState } from 'react';
import { X, CheckCircle, Package, Truck, ShieldCheck, ArrowRight, ArrowLeft, Lock, FileText } from 'lucide-react';
import { PACKAGES, RATE_PER_PEN } from '../data/mockData';
import { UserAccount, WorkerOrder } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserAccount) => void;
  initialPackageId?: string;
  onOpenTerms: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialPackageId,
  onOpenTerms
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedPkgId, setSelectedPkgId] = useState<string>(initialPackageId || 'standard-1000');
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [contractType, setContractType] = useState<'dzielo' | 'zlecenie'>('dzielo');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedAge, setAgreedAge] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isScamRevealed, setIsScamRevealed] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[1];

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().length < 3) errs.fullName = 'Podaj imię i nazwisko';
    if (!email.trim() || !email.includes('@')) errs.email = 'Podaj poprawny adres e-mail';
    if (!phone.trim() || phone.trim().length < 6) errs.phone = 'Podaj numer telefonu';
    if (!address.trim()) errs.address = 'Podaj adres';
    if (!city.trim()) errs.city = 'Podaj miasto';
    if (!postalCode.trim()) errs.postalCode = 'Podaj kod pocztowy';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: { [key: string]: string } = {};
    if (!bankAccount.trim()) {
      errs.bankAccount = 'Podaj numer konta bankowego do wypłat';
    }
    if (!agreedTerms) {
      errs.agreedTerms = 'Musisz zaznaczyć akceptację';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    // Trigger the scam reveal screen on the final step of ordering/registering
    setIsScamRevealed(true);
  };

  const handleContinueToDemoPanel = () => {
    // Create current order
    const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
    const order: WorkerOrder = {
      id: `ZAM-2026-${randomOrderNum}`,
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      totalPens: selectedPkg.pensCount,
      assembledPens: 0,
      ratePerPen: RATE_PER_PEN,
      status: 'wyslana_baza',
      orderedDate: new Date().toLocaleDateString('pl-PL'),
      deadlineDate: new Date(Date.now() + selectedPkg.maxDays * 86400000).toLocaleDateString('pl-PL'),
      trackingNumber: `DPD-PL-${Math.floor(100000000 + Math.random() * 900000000)}`,
      courier: 'DPD Polska Kurier'
    };

    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      fullName: fullName || 'Użytkownik Przezorny',
      email: email || 'kontakt@przyklad.pl',
      phone: phone || '+48 600 000 000',
      address: address || 'ul. Bezpieczna 1',
      city: city || 'Warszawa',
      postalCode: postalCode || '00-001',
      bankAccount: bankAccount || 'PL 00 0000 0000 0000 0000 0000 0000',
      selectedPackageId: selectedPkg.id,
      contractType,
      assembledPensTotal: 0,
      totalPaidOut: 0,
      currentOrder: order,
      payoutHistory: [],
      joinedDate: new Date().toLocaleDateString('pl-PL')
    };

    setIsScamRevealed(false);
    onSuccess(newUser);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className={`p-6 relative transition-colors ${
          isScamRevealed 
            ? 'bg-gradient-to-r from-red-900 via-rose-900 to-amber-950 text-white' 
            : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white'
        }`}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          {isScamRevealed ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase font-extrabold tracking-wider bg-red-500 text-white px-3 py-1 rounded-full animate-pulse flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  Eksperyment / Ostrzeżenie
                </span>
                <span className="text-xs text-rose-200">Bezpieczna symulacja</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-white text-rose-100">
                🚨 UWAGA! WŁAŚNIE PADŁEŚ OFIARĄ OSZUSTWA NA PRACĘ CHAŁUPNICZĄ!
              </h3>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase font-extrabold tracking-wider bg-emerald-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                  Zamówienie 100% za darmo (0 zł)
                </span>
                <span className="text-xs text-amber-300 font-bold">Zarobek: 0,99 zł / długopis</span>
              </div>

              <h3 className="text-2xl font-bold font-display text-white">
                Zamów darmowy pakiet startowy do montażu
              </h3>
              <p className="text-xs text-blue-200 mt-1">
                Krok {step} z 3: {step === 1 ? 'Wybór darmowego pakietu części' : step === 2 ? 'Adres doręczenia przesyłki DPD (0 zł)' : 'Potwierdzenie i darmowe zamówienie'}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-white/20 h-1.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          {/* SPECIAL REVEAL SCREEN: FINAL STEP SCAM AWARENESS */}
          {isScamRevealed ? (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Giant Dedicated Message Plaque */}
              <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 p-6 rounded-3xl shadow-xl border-4 border-amber-300 text-center space-y-3 relative overflow-hidden">
                <div className="text-xs uppercase tracking-widest font-black text-amber-950 bg-white/40 py-1 px-4 rounded-full inline-block">
                  Wiadomość Specjalna
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-950">
                  &bdquo;Pozdrawiają Wera i Krzysiek a Marek jest bochaterem&rdquo;
                </h2>

                <div className="inline-flex items-center gap-2 bg-slate-950 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                  🦸‍♂️ Marek – Oficjalny Bochater!
                </div>
              </div>

              {/* Educational Breakdown */}
              <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 text-rose-950 space-y-3 text-sm">
                <div className="flex items-center gap-2 font-bold text-base text-rose-800">
                  <span>💡</span>
                  <span>Jak naprawdę działa oszustwo na &bdquo;składanie długopisów&rdquo;?</span>
                </div>

                <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
                  Praca chałupnicza polegająca na manualnym składaniu długopisów za <strong>0,99 zł za sztukę</strong> to jeden z 
                  <strong> najpopularniejszych i najstarszych mitów / przekrętów</strong> w polskim internecie i prasie od ponad 25 lat!
                </p>

                <ul className="space-y-2 text-xs text-rose-900">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">1.</span>
                    <span><strong>Przemysłowa automatyzacja:</strong> Współczesne długopisy są w 100% składane przez maszyny fabryczne w tempie 3 000 – 6 000 sztuk na minutę, a koszt montażu jednej sztuki to ułamek grosza. Nikt nie płaci 99 groszy za ręczne składanie!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">2.</span>
                    <span><strong>Na czym polega oszustwo w realnym świecie:</strong> Oszuści zazwyczaj proszą o wpłatę &bdquo;kaucji zwrotnej&rdquo; za przesyłkę, opłatę za katalog, albo wyłudzają numery PESEL, dowody osobiste i dane bankowe.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">3.</span>
                    <span><strong>Bez paniki!</strong> Ta strona to bezpieczna symulacja edukacyjna. Żadne Twoje dane nie zostały nikomu wysłane ani zapisane na zewnętrznym serwerze.</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Zamknij i wróć na stronę
                </button>

                <button
                  type="button"
                  onClick={handleContinueToDemoPanel}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Mimo wszystko chcę zobaczyć demo panelu chałupnika</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : step === 1 ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Wybierz darmowy pakiet startowy (0 zł):
                </label>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Darmowe zamówienie
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {PACKAGES.map((pkg) => {
                  const isSelected = selectedPkgId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 shadow-md ring-1 ring-blue-500/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          Koszt: 0 zł (Za darmo)
                        </span>
                        {pkg.isPopular && (
                          <span className="text-[10px] font-bold uppercase bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">
                            Hit
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <Package className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <h4 className="font-bold text-slate-900 text-sm font-display">{pkg.name}</h4>
                      </div>

                      <div className="flex items-baseline gap-1 my-1">
                        <span className="text-2xl font-black text-slate-900 font-display">
                          {pkg.totalPayout.toFixed(0)} zł
                        </span>
                        <span className="text-xs text-slate-500">
                          ({pkg.pensCount} szt. × 0,99 zł)
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                        {pkg.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Czas: do {pkg.maxDays} dni</span>
                        <span className="text-emerald-700 font-semibold">Wysyłka: 0 zł</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Zero fee reminder */}
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>100% za darmo:</strong> Wszystkie pakiety zamawiasz bez jakichkolwiek opłat ani kaucji.
                </span>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Dalej: Dane do darmowej wysyłki paczki</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Adres doręczenia zestawu montażowego DPD (Darmowa przesyłka 0 zł):
                </label>
                <span className="text-xs text-blue-600 font-semibold">
                  Wybrany: {selectedPkg.name} ({selectedPkg.pensCount} szt.)
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    placeholder="np. Anna Nowak"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Adres e-mail *
                  </label>
                  <input
                    type="email"
                    placeholder="twoj@email.pl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Numer telefonu dla kuriera *
                  </label>
                  <input
                    type="tel"
                    placeholder="np. 500 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Ulica, numer domu i mieszkania *
                  </label>
                  <input
                    type="text"
                    placeholder="np. ul. Kwiatowa 12 m. 4"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Kod pocztowy (00-000) *
                  </label>
                  <input
                    type="text"
                    placeholder="np. 01-234"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.postalCode && <p className="text-[11px] text-red-500 mt-1">{errors.postalCode}</p>}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Miejscowość *
                  </label>
                  <input
                    type="text"
                    placeholder="np. Warszawa"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Wróć
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (validateStep2()) setStep(3);
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Dalej: Płatności i zgody</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Numer rachunku bankowego do wypłat (0,99 zł / szt.) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="np. PL 00 0000 0000 0000 0000 0000 0000"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                  <div className="absolute right-3 top-2.5 text-xs text-slate-400">
                    PLN
                  </div>
                </div>
                {errors.bankAccount && <p className="text-[11px] text-red-500 mt-1">{errors.bankAccount}</p>}
                <p className="text-[11px] text-slate-500 mt-1">
                  Na ten numer przesyłamy wynagrodzenie w ciągu 24h po odbiorze każdej partii.
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Preferowana forma umowy:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center gap-2 ${
                    contractType === 'dzielo' ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold' : 'border-slate-200 text-slate-700'
                  }`}>
                    <input
                      type="radio"
                      name="contractType"
                      checked={contractType === 'dzielo'}
                      onChange={() => setContractType('dzielo')}
                      className="accent-blue-600"
                    />
                    <span>Umowa o dzieło (standard)</span>
                  </label>

                  <label className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center gap-2 ${
                    contractType === 'zlecenie' ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold' : 'border-slate-200 text-slate-700'
                  }`}>
                    <input
                      type="radio"
                      name="contractType"
                      checked={contractType === 'zlecenie'}
                      onChange={() => setContractType('zlecenie')}
                      className="accent-blue-600"
                    />
                    <span>Umowa zlecenie</span>
                  </label>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Wybrany pakiet montażowy:</span>
                  <strong className="text-slate-900 font-bold">{selectedPkg.name} ({selectedPkg.pensCount} szt.)</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Koszt zamówienia pakietu:</span>
                  <strong className="text-emerald-700 font-black text-sm uppercase">0,00 zł (CAŁKOWICIE ZA DARMO)</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Dostawa i odbiór kurierem:</span>
                  <strong className="text-emerald-700 font-bold">0,00 zł (Darmowy kurier DPD)</strong>
                </div>
                <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-1.5">
                  <span>Gwarantowany zarobek po montażu:</span>
                  <strong className="text-blue-700 font-black text-base">{selectedPkg.totalPayout.toFixed(2)} zł</strong>
                </div>
              </div>

              {/* Checkboxes for consents */}
              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded accent-blue-600"
                  />
                  <span>
                    Akceptuję{' '}
                    <button
                      type="button"
                      onClick={onOpenTerms}
                      className="text-blue-600 font-semibold underline underline-offset-2 hover:text-blue-700"
                    >
                      Regulamin współpracy z DługopisyJOB
                    </button>{' '}
                    oraz warunki stawki 0,99 zł za złożony długopis.
                  </span>
                </label>
                {errors.agreedTerms && <p className="text-[11px] text-red-500 pl-6">{errors.agreedTerms}</p>}

                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedAge}
                    onChange={(e) => setAgreedAge(e.target.checked)}
                    className="mt-0.5 rounded accent-blue-600"
                  />
                  <span>
                    Oświadczam, że mam ukończone 18 lat i posiadam pełną zdolność do czynności prawnych.
                  </span>
                </label>
                {errors.agreedAge && <p className="text-[11px] text-red-500 pl-6">{errors.agreedAge}</p>}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Wróć
                </button>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Potwierdź i zamów pakiet za darmo (0 zł)</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
