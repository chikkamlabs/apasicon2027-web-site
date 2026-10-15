import Header from '@/components/header';
import HeroSection from '@/components/heroSection';
import CountdownSection from '@/components/countdownSection';
import WelcomeSection from '@/components/welcomeSection';
import JoinSection from '@/components/joinSection';
import CommitteeSection from '@/components/committeeSection';
import RegistrationSection from '@/components/registrationSection';
import VenueSection from '@/components/venueSection';
import ExploreCity from '@/components/explorecity';
import Footer from '@/components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-amber-100 selection:text-amber-900">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CountdownSection />
        <WelcomeSection />
        <JoinSection />
        <CommitteeSection />
        <RegistrationSection />
        <VenueSection />
        <ExploreCity />
      </main>
      <Footer />
    </div>
  );
}
