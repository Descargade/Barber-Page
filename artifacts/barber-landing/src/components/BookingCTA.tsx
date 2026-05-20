import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";

export default function BookingCTA() {
  const { openBooking } = useBooking();

  return (
    <section className="py-40 relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background z-0" />
      
      {/* Ambient glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-primary/5 rounded-full blur-[100px] z-0 animate-pulse" style={{ animationDuration: '4s' }} />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl mx-auto flex flex-col items-center p-12 md:p-16 border border-white/5 bg-card/30 backdrop-blur-md relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <h2 className="text-4xl md:text-6xl font-light text-foreground mb-6">
            Comenzá el <span className="italic font-serif text-primary/90">Ritual.</span>
          </h2>
          
          <p className="text-foreground/60 font-light text-lg mb-12 max-w-md">
            Los turnos son limitados para garantizar una calidad sin concesiones y una experiencia sin apuros.
          </p>

          <Button 
            onClick={() => openBooking()}
            size="lg"
            className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-8 text-base tracking-[0.2em] uppercase relative overflow-hidden group shadow-[0_0_30px_rgba(204,153,85,0.2)] hover:shadow-[0_0_40px_rgba(204,153,85,0.4)] transition-all duration-500 w-full md:w-auto"
            data-testid="button-cta-book"
          >
            <span className="relative z-10">Asegurar mi turno</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Button>

          <p className="mt-8 text-xs text-foreground/40 uppercase tracking-widest">
            No se aceptan turnos sin reserva.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
