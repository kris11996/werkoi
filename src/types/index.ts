export interface PackageOption {
  id: string;
  name: string;
  pensCount: number;
  ratePerPen: number; // 0.99 zł
  totalPayout: number;
  estimatedHours: string;
  maxDays: number;
  badge?: string;
  isPopular?: boolean;
  description: string;
  features: string[];
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  bankAccount: string;
  selectedPackageId: string;
  contractType: 'dzielo' | 'zlecenie';
  assembledPensTotal: number;
  totalPaidOut: number;
  currentOrder: WorkerOrder;
  payoutHistory: PayoutRecord[];
  joinedDate: string;
}

export interface WorkerOrder {
  id: string;
  packageId: string;
  packageName: string;
  totalPens: number;
  assembledPens: number;
  ratePerPen: number;
  status: 'wyslana_baza' | 'w_trakcie_montazu' | 'kurier_zamowiony' | 'w_weryfikacji' | 'rozliczono';
  orderedDate: string;
  deadlineDate: string;
  trackingNumber: string;
  courier: string;
}

export interface PayoutRecord {
  id: string;
  date: string;
  pensCount: number;
  ratePerPen: number;
  amount: number;
  status: 'zrealizowano' | 'w_trakcie_przelewu';
  transferTitle: string;
  invoiceNumber: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  age: number;
  avatarUrl: string;
  pensTotal: number;
  totalEarned: number;
  rating: number;
  comment: string;
  occupation: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'zarobki' | 'dostawa' | 'umowa' | 'jakosc';
}
