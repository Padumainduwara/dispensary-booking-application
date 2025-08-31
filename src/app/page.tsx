// src/app/page.tsx
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AboutDoctor from '@/components/AboutDoctor';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import BookingSection from '@/components/BookingSection'; 

export default function Home() {
  return (
    // Add 'scroll-smooth' for nice anchor link scrolling
    <div className="scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <AboutDoctor />
        <BookingSection /> 
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}