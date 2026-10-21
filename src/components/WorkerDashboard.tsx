import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  Banknote, 
  CheckCircle, 
  Clock, 
  Plus, 
  FileText, 
  Download, 
  HelpCircle, 
  Send, 
  ArrowLeft, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { UserAccount, WorkerOrder, PayoutRecord } from '../types';
import { RATE_PER_PEN, PACKAGES } from '../data/mockData';

interface DashboardProps {
  user: UserAccount;
  onUpdateUser: (updatedUser: UserAccount) => void;
  onBackToHome: () => void;
  onOpenTerms: () => void;
}

export const WorkerDashboard: React.FC<DashboardProps> = ({
  user,
  onUpdateUser,
  onBackToHome,
  onOpenTerms
}) => {
  const [activeTab, setActiveTab] = useState<'zlecenie' | 'wyplaty' | 'dokumenty' | 'kontakt'>('zlecenie');
  const [customAddAmount, setCustomAddAmount] = useState<string>('20');
  const [courierOrderedNotification, setCourierOrderedNotification] = useState<boolean>(false);
  
  // Coordinator Chat State
  const [messages, setMessages] = useState<Array<{ sender: 'coordinator' | 'user'; text: string; time: string }>>([
    {
      sender: 'coordinator',
      text: `Witaj ${user.fullName}! Jestem Twoim dedykowanym opiekunem w długopisyJOB. Jeśli masz pytania odnośnie montażu, dostawy lub wypłaty, pisz śmiało!`,
      time: 'Dziś, 09:15'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const currentOrder = user.currentOrder;
  const currentEarned = currentOrder ? currentOrder.assembledPens * RATE_PER_PEN : 0;
  const progressPercent = currentOrder ? Math.min(100, Math.round((currentOrder.assembledPens / currentOrder.totalPens) * 100)) : 0;

  // Add pens logic
  const handleAddPens = (amount: number) => {
    if (!currentOrder) return;
    const newCount = Math.min(currentOrder.totalPens, currentOrder.assembledPens + amount);
    
    const updatedOrder: WorkerOrder = {
      ...currentOrder,
      assembledPens: newCount,
      status: newCount === currentOrder.totalPens ? 'kurier_zamowiony' : currentOrder.status
    };

    const updatedUser: UserAccount = {
      ...user,
      assembledPensTotal: user.assembledPensTotal + (newCount - currentOrder.assembledPens),
      currentOrder: updatedOrder
    };

    onUpdateUser(updatedUser);
  };

  // Order courier to pick up completed pens
  const handleRequestCourierPickup = () => {
    if (!currentOrder) return;
    
    // Simulate payout generation
    const payoutAmount = currentOrder.assembledPens * RATE_PER_PEN;
    const newPayout: PayoutRecord = {
      id: `WYP-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('pl-PL'),
      pensCount: currentOrder.assembledPens,
      ratePerPen: RATE_PER_PEN,
      amount: payoutAmount,
      status: 'w_trakcie_przelewu',
      transferTitle: `Wynagrodzenie za montaż długopisów - ${currentOrder.id}`,
      invoiceNumber: `RACH/2026/${Math.floor(1000 + Math.random() * 9000)}`
    };

    const updatedOrder: WorkerOrder = {
      ...currentOrder,
      status: 'kurier_zamowiony'
    };

    const updatedUser: UserAccount = {
      ...user,
      totalPaidOut: user.totalPaidOut + payoutAmount,
      currentOrder: updatedOrder,
      payoutHistory: [newPayout, ...user.payoutHistory]
    };

    onUpdateUser(updatedUser);
    setCourierOrderedNotification(true);
  };

  // Send message in support chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: chatInput.trim(),
      time: 'Przed chwilą'
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setChatInput('');

    // Auto-reply simulation from coordinator
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'coordinator',
          text: `Dziękuję za wiadomość! Przyjąłem zgłoszenie. Wszystko przebiega zgodnie z planem, a Twoja stawka 0,99 zł / szt. jest w pełni zabezpieczona.`,
          time: 'Przed chwilą'
        }
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & User Welcome Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition mb-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Wróć na stronę główną długopisyJOB
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                Dzień dobry, {user.fullName}!
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <CheckCircle className="w-3.5 h-3.5" />
                Zweryfikowany współpracownik
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Nr porozumienia: <span className="font-mono text-slate-700 font-semibold">{user.id}</span> • Umowa {user.contractType === 'dzielo' ? 'o dzieło' : 'zlecenie'} • Stawka gwarantowana: <strong className="text-blue-700">0,99 zł / szt.</strong>
            </p>
          </div>

          {/* Quick Wallet Summary */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Zarobiono łącznie
              </span>
              <span className="text-2xl font-black text-emerald-600 font-display">
                {(user.totalPaidOut + currentEarned).toFixed(2)} zł
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Złożone długopisy
              </span>
              <span className="text-2xl font-black text-slate-900 font-display">
                {user.assembledPensTotal.toLocaleString('pl-PL')} szt.
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('zlecenie')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'zlecenie'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Aktywne zlecenie montażu</span>
          </button>

          <button
            onClick={() => setActiveTab('wyplaty')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'wyplaty'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Banknote className="w-4 h-4" />
            <span>Historia wypłat ({user.payoutHistory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('dokumenty')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'dokumenty'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Dokumenty i instrukcje</span>
          </button>

          <button
            onClick={() => setActiveTab('kontakt')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'kontakt'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Wsparcie koordynatora</span>
          </button>
        </div>

        {/* Courier Notification Modal/Alert */}
        {courierOrderedNotification && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900 animate-in fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong>Kurier DPD został bezpłatnie zamówiony!</strong>
                <p className="text-emerald-700">
                  Przyjedzie odebrać paczkę pod Twój adres w kolejnym dniu roboczym. Przelew {currentEarned.toFixed(2)} zł zostanie zlecony natychmiast po weryfikacji.
                </p>
              </div>
            </div>
            <button
              onClick={() => setCourierOrderedNotification(false)}
              className="text-emerald-700 hover:text-emerald-950 font-bold ml-4 cursor-pointer"
            >
              Zamknij
            </button>
          </div>
        )}

        {/* TAB 1: ACTIVE ORDER */}
        {activeTab === 'zlecenie' && (
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Main Assembly Tracker */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                
                {/* Header of Active Package */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      Zlecenie w trakcie realizacji
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 font-display">
                      {currentOrder.packageName}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Numer zamówienia: <span className="font-mono text-slate-800 font-semibold">{currentOrder.id}</span> • Kurier dostarczył: {currentOrder.orderedDate}
                    </p>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-xs text-slate-500 block">Zarobek z tej partii:</span>
                    <span className="text-3xl font-black text-amber-500 font-display">
                      {currentEarned.toFixed(2)} zł
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      z {(currentOrder.totalPens * RATE_PER_PEN).toFixed(2)} zł
                    </span>
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">
                      Postęp montażu długopisów:
                    </span>
                    <span className="text-blue-700 font-bold text-sm">
                      {currentOrder.assembledPens} / {currentOrder.totalPens} sztuk ({progressPercent}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>Pozostało do złożenia: {currentOrder.totalPens - currentOrder.assembledPens} sztuk</span>
                    <span>Termin zwrotu: do {currentOrder.deadlineDate}</span>
                  </div>
                </div>

                {/* Interactive Counter Action Box */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Zarejestruj złożone długopisy
                      </h4>
                      <p className="text-xs text-slate-500">
                        Złożyłeś kolejną partię? Zaktualizuj stan w panelu, by przygotować odbiór kurierski.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">
                      +0,99 zł / szt.
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => handleAddPens(1)}
                      className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl shadow-2xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-blue-600" />
                      <span>+1 sztuka</span>
                    </button>

                    <button
                      onClick={() => handleAddPens(10)}
                      className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl shadow-2xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-blue-600" />
                      <span>+10 sztuk (+6,90 zł)</span>
                    </button>

                    <button
                      onClick={() => handleAddPens(50)}
                      className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl shadow-2xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-blue-600" />
                      <span>+50 sztuk (+34,50 zł)</span>
                    </button>

                    <div className="flex items-center gap-1.5 ml-auto">
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={customAddAmount}
                        onChange={(e) => setCustomAddAmount(e.target.value)}
                        className="w-20 px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-bold text-center focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() => {
                          const val = parseInt(customAddAmount);
                          if (!isNaN(val) && val > 0) handleAddPens(val);
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        Dodaj
                      </button>
                    </div>
                  </div>
                </div>

                {/* Final step action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Darmowy kurier DPD odbiera spakowaną partię bezpośrednio z Twojego domu.</span>
                  </div>

                  <button
                    onClick={handleRequestCourierPickup}
                    disabled={currentOrder.assembledPens === 0}
                    className={`px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                      currentOrder.assembledPens > 0
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Zamów bezpłatnego kuriera po odbiór ({currentEarned.toFixed(2)} zł)</span>
                  </button>
                </div>

              </div>

              {/* Delivery and logistics timeline */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Status logistyczny przesyłek DPD
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-slate-800">Elementy dostarczone przez kuriera DPD</p>
                      <p className="text-slate-500">Paczka nr: {currentOrder.trackingNumber} odebrana i sprawdzona pod adresem domowym.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-slate-800">Montaż długopisów w toku</p>
                      <p className="text-slate-500">Masz czas do {currentOrder.deadlineDate}. Możesz pracować w swoim własnym tempie.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-slate-600">Odbiór gotowych długopisów i wypłata</p>
                      <p className="text-slate-400">Po ukończeniu kliknij &quot;Zamów bezpłatnego kuriera&quot;. Pieniądze wpłyną na konto w 24h.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Sidebar: Worker Info & Support */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Account Details Box */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-900 text-sm font-display flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Twoje dane rozliczeniowe
                </h4>

                <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Współpracownik:</span>
                    <strong className="text-slate-800 font-semibold">{user.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Adres doręczeń i odbiorów:</span>
                    <strong className="text-slate-800 font-semibold">{user.address}, {user.postalCode} {user.city}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Telefon kontaktowy:</span>
                    <strong className="text-slate-800 font-semibold">{user.phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Rachunek bankowy do wypłat:</span>
                    <strong className="text-slate-800 font-mono text-[11px] block">{user.bankAccount}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <button
                    onClick={onOpenTerms}
                    className="text-xs text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Zobacz regulamin współpracy</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Quick Quality Tips */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h4 className="font-bold text-sm font-display text-white">
                    Wskazówki montażysty
                  </h4>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Wkładaj sprężynkę węższym końcem w stronę końcówki piszącej.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Nie dokręcaj na siłę – wystarczy lekkie wyczuwalne zablokowanie gwintu.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Jeśli element jest ułamany, odłóż go do woreczka reklamacyjnego (darmowa wymiana).</span>
                  </li>
                </ul>

                <button
                  onClick={() => setActiveTab('dokumenty')}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition border border-white/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>Pobierz ilustrowany PDF montażu</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PAYOUT HISTORY */}
        {activeTab === 'wyplaty' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Historia przelewów i rozliczeń
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Gwarantowana stawka: 0,99 zł / sztuka. Wszystkie środki trafiają na podany rachunek IBAN.
                </p>
              </div>

              <div className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-200">
                Wypłacono pomyślnie: {user.totalPaidOut.toFixed(2)} zł
              </div>
            </div>

            {user.payoutHistory.length === 0 ? (
              <div className="text-center py-12 text-slate-500 space-y-3">
                <Banknote className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-sm">Brak zrealizowanych wypłat. Złóż długopisy z aktywnego pakietu i zamów kuriera!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Numer rachunku / ID</th>
                      <th className="py-3 px-4">Data</th>
                      <th className="py-3 px-4">Liczba sztuk</th>
                      <th className="py-3 px-4">Stawka</th>
                      <th className="py-3 px-4">Kwota</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Potwierdzenie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {user.payoutHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                          {item.invoiceNumber}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{item.date}</td>
                        <td className="py-3.5 px-4 font-bold">{item.pensCount.toLocaleString('pl-PL')} szt.</td>
                        <td className="py-3.5 px-4">{item.ratePerPen.toFixed(2)} zł</td>
                        <td className="py-3.5 px-4 font-black text-emerald-600 text-sm">
                          {item.amount.toFixed(2)} zł
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            item.status === 'zrealizowano'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            <CheckCircle className="w-3 h-3" />
                            {item.status === 'zrealizowano' ? 'Zrealizowano (przelew wysłany)' : 'W trakcie realizacji (24h)'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => alert(`Pobieranie potwierdzenia przelewu dla rachunku ${item.invoiceNumber} na kwotę ${item.amount.toFixed(2)} zł.`)}
                            className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3 h-3" />
                            <span>PDF</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DOCUMENTS & INSTRUCTIONS */}
        {activeTab === 'dokumenty' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Dokumentacja prawna i instrukcje montażu
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pobierz oficjalne pliki regulaminowe i instrukcje w formacie PDF.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-400 transition flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Umowa o współpracę chałupniczą
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Oficjalne porozumienie długopisyJOB Sp. z o.o. ze stawką 0,99 zł / szt.
                  </p>
                </div>
                <button
                  onClick={onOpenTerms}
                  className="mt-4 pt-3 border-t border-slate-200/60 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between cursor-pointer"
                >
                  <span>Wyświetl treść umowy</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-400 transition flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                    <Download className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Instrukcja techniczna montażu PDF
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Ilustrowany przewodnik krok po kroku z przekrojami podzespołów.
                  </p>
                </div>
                <button
                  onClick={() => alert('Pobrano plik: Instrukcja_Montazu_dlugopisyJOB_2026.pdf')}
                  className="mt-4 pt-3 border-t border-slate-200/60 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between cursor-pointer"
                >
                  <span>Pobierz instrukcję (2.4 MB)</span>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-400 transition flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Karta kontroli jakości i zwrotu
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Druk dołączany do paczki przy odbiorze gotowej partii przez kuriera DPD.
                  </p>
                </div>
                <button
                  onClick={() => alert('Pobrano formularz zwrotny do paczki DPD.')}
                  className="mt-4 pt-3 border-t border-slate-200/60 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between cursor-pointer"
                >
                  <span>Pobierz formularz (PDF)</span>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUPPORT CHAT WITH COORDINATOR */}
        {activeTab === 'kontakt' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                DJ
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm font-display">
                  Koordynator montażu długopisyJOB
                </h3>
                <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Dostępny online (Pn - Pt 8:00 - 18:00)
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-2xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {m.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Wpisz pytanie do koordynatora (np. o termin kuriera lub wymianę części)..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Wyślij</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
