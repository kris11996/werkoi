import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Shield } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1500);
  };

  return (
    <section id="kontakt" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              Kontakt & Obsługa Chałupników
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Skontaktuj się z biurem długopisyJOB
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Masz pytania dotyczące pakietów, umowy lub potrzebujesz pomocy w procesie rejestracji? 
              Nasi konsultanci są do Twojej dyspozycji telefonicznie, mailowo oraz poprzez formularz kontaktowy.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-semibold">Centrala firmy:</strong>
                  <span className="text-xs text-slate-600">
                    długopisyJOB Sp. z o.o.<br />
                    Al. Jerozolimskie 142B, 02-305 Warszawa
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-semibold">Magazyn centralny & zwroty DPD:</strong>
                  <span className="text-xs text-slate-600">
                    Centrum Logistyczne długopisyJOB<br />
                    ul. Przemysłowa 8, 05-800 Pruszków
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-semibold">Infolinia dla chałupników:</strong>
                  <span className="text-xs text-slate-600 block">+48 22 890 12 34 (opłata standardowa)</span>
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    Pn - Pt: 8:00 - 18:00 | Sb: 9:00 - 14:00
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-semibold">Adresy e-mail:</strong>
                  <span className="text-xs text-slate-600 block">rekrutacja@dlugopisyjob.pl</span>
                  <span className="text-xs text-slate-600 block">rozliczenia@dlugopisyjob.pl</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                <span>NIP: 525-28-19-481 • KRS: 0000845912 • REGON: 386129481</span>
              </div>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 font-display mb-1">
              Wyślij wiadomość do koordynatora
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Odpowiadamy zazwyczaj w ciągu 2 godzin w dni robocze.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-in fade-in">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950">
                  Dziękujemy za kontakt!
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Twoja wiadomość została pomyślnie przekazana do Działu Obsługi Współpracowników długopisyJOB. Odpowiemy niezwłocznie.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                >
                  Napisz kolejną wiadomość
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Twoje imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="np. Piotr Kowalski"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Adres e-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="twoj@email.pl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Numer telefonu (opcjonalnie)
                  </label>
                  <input
                    type="tel"
                    placeholder="np. 600 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Treść zapytania *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Wpisz treść pytania (np. odnośnie wyboru pakietu, dostawy lub warunków rozliczeń)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    * Pola obowiązkowe • Chronimy Twoje dane (RODO)
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Wyślij zapytanie</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
