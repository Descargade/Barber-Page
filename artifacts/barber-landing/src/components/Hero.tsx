import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 z-10" />
        <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px"}} />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/images/hero.png"
          alt="Noir Studio Interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-primary font-medium tracking-[0.2em] text-xs md:text-sm uppercase mb-6 block">
            Mendoza, Argentina
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground mb-8 max-w-4xl"
          style={{ WebkitFontSmoothing: 'antialiased' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Donde la precisión <br className="hidden md:block" />se vuelve <span className="italic text-primary/90 font-serif">ritual.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground/60 max-w-2xl font-light mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Un estudio de alta gama para quienes entienden que cada corte deliberado es una declaración silenciosa. Sin apuros. Sin concesiones.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Button 
            onClick={() => openBooking()}
            size="lg"
            className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-[0.15em] uppercase relative overflow-hidden group shadow-[0_0_20px_rgba(204,153,85,0.3)] transition-all"
            data-testid="button-hero-book"
          >
            <span className="relative z-10">Reservar un turno</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Button>
          
          <div className="hidden sm:block w-8 h-[1px] bg-white/10" />
          
          <Button 
            size="lg"
            variant="outline"
            className="rounded-none border-white/10 bg-transparent text-foreground hover:bg-white/5 px-8 py-6 text-sm tracking-[0.15em] uppercase"
            data-testid="button-hero-discover"
          >
            Descubrir el Atelier
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/40">Deslizar</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0], translateY: [0, 0, 10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </section>
  );
}
