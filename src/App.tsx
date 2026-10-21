import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { EarningsCalculator } from './components/EarningsCalculator';
import { InteractiveAssemblySimulator } from './components/InteractiveAssemblySimulator';
import { PackagesSection } from './components/PackagesSection';
import { WorkerStories } from './components/WorkerStories';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TermsView } from './components/TermsView';
import { RegistrationModal } from './components/RegistrationModal';
import { LoginModal } from './components/LoginModal';
import { WorkerDashboard } from './components/WorkerDashboard';
import { UserAccount } from './types';
import { INITIAL_DEMO_USER } from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'dashboard' | 'terms'>('home');
  const [user, setUser] = useState<UserAccount | null>(null);
  
  // Modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerPackageId, setRegisterPackageId] = useState<string | undefined>(undefined);

  // Load user from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem('weradlugopisy_active_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleUpdateUser = (updatedUser: UserAccount) => {
    setUser(updatedUser);
    localStorage.setItem('weradlugopisy_active_user', JSON.stringify(updatedUser));
  };

  const handleLoginSuccess = (loggedInUser: UserAccount) => {
    handleUpdateUser(loggedInUser);
    setIsLoginOpen(false);
    setActiveView('dashboard');
  };

  const handleRegisterSuccess = (newUser: UserAccount) => {
    handleUpdateUser(newUser);
    setIsRegisterOpen(false);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('weradlugopisy_active_user');
    setActiveView('home');
  };

  const openRegisterWithPackage = (pkgId?: string) => {
    setRegisterPackageId(pkgId);
    setIsRegisterOpen(true);
  };

  const handleSelectCountFromCalculator = (count: number) => {
    let pkgId = 'standard-1000';
    if (count <= 500) pkgId = 'starter-500';
    else if (count <= 1000) pkgId = 'standard-1000';
    else if (count <= 2500) pkgId = 'pro-2500';
    else pkgId = 'maxi-5000';

    openRegisterWithPackage(pkgId);
  };

  const scrollTo = (id: string) => {
    setActiveView('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Sticky Top Navigation */}
      <Navbar
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={openRegisterWithPackage}
        onOpenTerms={() => setActiveView('terms')}
        onOpenDashboard={() => setActiveView('dashboard')}
        onLogout={handleLogout}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'terms' ? (
          <TermsView
            onBack={() => setActiveView('home')}
            onOpenRegister={() => {
              setActiveView('home');
              openRegisterWithPackage();
            }}
          />
        ) : activeView === 'dashboard' && user ? (
          <WorkerDashboard
            user={user}
            onUpdateUser={handleUpdateUser}
            onBackToHome={() => setActiveView('home')}
            onOpenTerms={() => setActiveView('terms')}
          />
        ) : (
          <div>
            {/* Hero Section */}
            <Hero
              onOpenRegister={() => openRegisterWithPackage()}
              onScrollToCalculator={() => scrollTo('kalkulator')}
            />

            {/* How It Works (4 steps + Starter pack showcase) */}
            <HowItWorks
              onOpenRegister={() => openRegisterWithPackage()}
            />

            {/* Live Interactive Earnings Calculator (0,99 zł / pen) */}
            <EarningsCalculator
              onSelectCount={handleSelectCountFromCalculator}
            />

            {/* Interactive Assembly Simulator */}
            <InteractiveAssemblySimulator
              onOpenRegister={() => openRegisterWithPackage()}
            />

            {/* Packages Section */}
            <PackagesSection
              onSelectPackage={(pkgId) => openRegisterWithPackage(pkgId)}
            />

            {/* Worker Stories & Testimonials */}
            <WorkerStories />

            {/* FAQ */}
            <FAQSection />

            {/* Contact & Hotline */}
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenTerms={() => setActiveView('terms')}
        onOpenRegister={() => openRegisterWithPackage()}
        onOpenLogin={() => setIsLoginOpen(true)}
        onScrollTo={scrollTo}
      />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={handleRegisterSuccess}
        initialPackageId={registerPackageId}
        onOpenTerms={() => {
          setIsRegisterOpen(false);
          setActiveView('terms');
        }}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        onOpenRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
    </div>
  );
}
