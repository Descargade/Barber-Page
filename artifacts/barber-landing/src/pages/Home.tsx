import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { BookingProvider } from "@/context/BookingContext";

export default function Home() {
  return (
    <BookingProvider>
      <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30 selection:text-primary">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Gallery />
          <Testimonials />
          <BookingCTA />
        </main>
        <Footer />
        <BookingModal />
      </div>
    </BookingProvider>
  );
}
