import { PackageOption, ReviewItem, FAQItem, UserAccount } from '../types';

export const RATE_PER_PEN = 0.99;

export const PACKAGES: PackageOption[] = [
  {
    id: 'starter-500',
    name: 'Pakiet Próbny',
    pensCount: 500,
    ratePerPen: RATE_PER_PEN,
    totalPayout: 500 * RATE_PER_PEN, // 495.00 zł
    estimatedHours: '4 - 6 godzin łącznie',
    maxDays: 21,
    badge: 'Idealny na start',
    description: 'Najlepszy zestaw do sprawdzenia czy montaż długopisów w domu Ci odpowiada.',
    features: [
      'Gwarantowane 495,00 zł zarobku',
      '500 kompletów części najwyższej jakości',
      'Darmowa przesyłka kurierska DPD pod drzwi',
      'Ilustrowana instrukcja montażu krok po kroku',
      'Bezpłatna wymiana ewentualnych uszkodzonych części',
      'Aż 21 dni na spokojne złożenie'
    ]
  },
  {
    id: 'standard-1000',
    name: 'Pakiet Standardowy',
    pensCount: 1000,
    ratePerPen: RATE_PER_PEN,
    totalPayout: 1000 * RATE_PER_PEN, // 990.00 zł
    estimatedHours: '8 - 12 godzin łącznie',
    maxDays: 30,
    badge: 'Najchętniej wybierany',
    isPopular: true,
    description: 'Optymalny balans czasu i zysku. Wystarczy poświęcić około 30-40 minut dziennie.',
    features: [
      'Gwarantowane 990,00 zł zarobku',
      '1 000 kompletów długopisów automatycznych',
      'Darmowy kurier w obie strony (dostawa + odbiór)',
      'Wypłata na konto w 24h po odbiorze przez firmę',
      'Wsparcie dedykowanego koordynatora online',
      'Praktyczny organizer na biurko w zestawie gratis'
    ]
  },
  {
    id: 'pro-2500',
    name: 'Pakiet Aktywny',
    pensCount: 2500,
    ratePerPen: RATE_PER_PEN,
    totalPayout: 2500 * RATE_PER_PEN, // 2475.00 zł
    estimatedHours: '20 - 28 godzin łącznie',
    maxDays: 45,
    badge: 'Wyższy zarobek',
    description: 'Dedykowany osobom, które chcą regularnie podreperować domowy budżet lub dorobić do pensji.',
    features: [
      'Gwarantowane 2 475,00 zł zarobku',
      '2 500 kompletów podzielonych na 5 wygodnych tacek',
      'Priorytetowa kontrola jakości (wypłata w 12h)',
      'Możliwość wypłat częściowych co 500 sztuk',
      'Darmowe dostawy i odbiory DPD / InPost',
      'Umowa zlecenie lub o dzieło do wyboru'
    ]
  },
  {
    id: 'maxi-5000',
    name: 'Pakiet Pełny Etat',
    pensCount: 5000,
    ratePerPen: RATE_PER_PEN,
    totalPayout: 5000 * RATE_PER_PEN, // 4950.00 zł
    estimatedHours: '40 - 55 godzin łącznie',
    maxDays: 60,
    badge: 'Maksymalny zysk',
    description: 'Dla osób dysponujących dużą ilością czasu lub pracujących wspólnie z rodziną.',
    features: [
      'Gwarantowane 4 950,00 zł zarobku',
      '5 000 kompletów z zapasem technicznym +3%',
      'Najszybsza ścieżka rozliczeniowa VIP',
      'Dedykowany opiekun telefoniczny 8:00 - 20:00',
      'Możliwość regularnych dostaw co miesiąc',
      'Bezpłatny odbiór kurierski z Twojego domu'
    ]
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Katarzyna Wiśniewska',
    city: 'Radom',
    age: 34,
    avatarUrl: '/images/happy_worker.jpg',
    pensTotal: 3000,
    totalEarned: 2970.00,
    rating: 5,
    comment: 'Początkowo bałam się, że to jak większość ogłoszeń chałupniczych jakaś naciągana oferta. Tu jednak zaskoczenie: zero opłat wstępnych, kurier przywiózł karton prosto pod drzwi z czytelną instrukcją. Składam wieczorami oglądając seriale. Pierwsza wypłata 990 zł wpłynęła na konto następnego dnia po odbiorze paczki!',
    occupation: 'Mama dwójki dzieci na urlopie',
    date: '14 dni temu'
  },
  {
    id: 'rev-2',
    author: 'Marek Brzeziński',
    city: 'Toruń',
    age: 23,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    pensTotal: 5000,
    totalEarned: 4950.00,
    rating: 5,
    comment: 'Jako student dzienny potrzebowałem czegoś w 100% elastycznego. Złożenie jednego długopisu zajmuje mi wprawnie około 25 sekund. Stawka 99 groszy za sztukę jest super, przy 500 sztukach w weekend robię 495 zł kieszonkowego. Polecam!',
    occupation: 'Student Politechniki',
    date: '3 tygodnie temu'
  },
  {
    id: 'rev-3',
    author: 'Barbara i Stanisław Kozłowscy',
    city: 'Opole',
    age: 62,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    pensTotal: 8500,
    totalEarned: 8415.00,
    rating: 5,
    comment: 'Jesteśmy na emeryturze i szukaliśmy zajęcia, które nie wymaga wychodzenia z domu w zimie. Praca jest spokojna, wręcz relaksująca. Dobre oświetlenie, herbatka i praca idzie błyskawicznie. Bardzo profesjonalny kontakt z biurem DługopisyJOB.',
    occupation: 'Emeryci',
    date: 'Miesiąc temu'
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    category: 'zarobki',
    question: 'Czy pobieracie jakiekolwiek opłaty wstępne lub kaucje za materiały?',
    answer: 'ABSOLUTNIE NIE. DługopisyJOB NIE pobiera żadnych opłat wstępnych, kaucji, opłat rejestracyjnych ani kosztów za wysyłkę materiałów. Zgodnie z polskim prawem to zleceniodawca dostarcza bezpłatnie wszystkie komponenty do montażu. U nas nie ryzykujesz ani grosza.'
  },
  {
    category: 'zarobki',
    question: 'Ile dokładnie wynosi stawka za jeden złożony długopis?',
    answer: 'Gwarantowana stawka w DługopisyJOB wynosi dokładnie 0,99 zł za każdy poprawnie złożony długopis. Przykładowo: za pakiet 1 000 sztuk otrzymujesz dokładnie 990,00 zł przelane na Twoje konto bankowe.'
  },
  {
    category: 'dostawa',
    question: 'Kto ponosi koszty dostawy i odbioru gotowych długopisów?',
    answer: '100% kosztów transportu kurierskiego pokrywa firma DługopisyJOB. Kurier DPD lub InPost odbiera i dostarcza paczkę bezpośrednio pod Twój adres w dogodnym terminie.'
  },
  {
    category: 'umowa',
    question: 'Na jakiej podstawie prawnej odbywa się współpraca?',
    answer: 'Współpracujemy na podstawie legalnej umowy o dzieło lub umowy zlecenie. Zapewniamy pełną transparentność podatkową (na koniec roku kalendarzowego generujemy i przesyłamy deklarację PIT-11).'
  },
  {
    category: 'jakosc',
    question: 'Co się stanie, jeśli któryś element ulegnie uszkodzeniu podczas składania?',
    answer: 'Każdy pakiet zawiera dodatkowy bufor bezpieczeństwa (+3% elementów gratis). Jeśli cokolwiek pęknie lub mechanizm się zatnie, po prostu odkładasz wadliwy element do osobnego woreczka i zgłaszasz nam to w panelu – nie ponosisz za to żadnych kar finansowych.'
  },
  {
    category: 'jakosc',
    question: 'Ile czasu zajmuje złożenie jednego długopisu?',
    answer: 'Średni czas montażu dla nowej osoby to około 40-50 sekund. Po złożeniu pierwszych 20-30 sztuk nabiera się wprawy i złożenie długopisu zajmuje średnio zaledwie 20 do 25 sekund.'
  }
];

export const INITIAL_DEMO_USER: UserAccount = {
  id: 'user-pl-7821',
  fullName: 'Janina Kowalska',
  email: 'janina.kowalska@przyklad.pl',
  phone: '+48 601 234 567',
  address: 'ul. Słoneczna 14 m. 8',
  city: 'Warszawa',
  postalCode: '02-777',
  bankAccount: 'PL 49 1020 2892 2276 3005 0000 0000',
  selectedPackageId: 'standard-1000',
  contractType: 'dzielo',
  assembledPensTotal: 640,
  totalPaidOut: 990.00,
  joinedDate: '12.01.2026',
  currentOrder: {
    id: 'ZAM-2026-9041',
    packageId: 'standard-1000',
    packageName: 'Pakiet Standardowy (1000 szt.)',
    totalPens: 1000,
    assembledPens: 640,
    ratePerPen: RATE_PER_PEN,
    status: 'w_trakcie_montazu',
    orderedDate: '18.10.2026',
    deadlineDate: '17.11.2026',
    trackingNumber: 'DPD-PL-982348123',
    courier: 'DPD Polska'
  },
  payoutHistory: [
    {
      id: 'WYP-2026-104',
      date: '10.10.2026',
      pensCount: 1000,
      ratePerPen: RATE_PER_PEN,
      amount: 990.00,
      status: 'zrealizowano',
      transferTitle: 'Wynagrodzenie za montaż długopisów DługopisyJOB - ZAM-2026-8812',
      invoiceNumber: 'RACH/2026/10/8812'
    }
  ]
};
