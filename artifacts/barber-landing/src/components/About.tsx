import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const end = 45;
    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= end) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-32 relative bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
            <img 
              src="/images/about.png" 
              alt="Barber hands holding razor" 
              className="w-full h-full object-cover filter grayscale-[0.2]"
            />
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-primary/30 z-0 hidden md:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <span className="text-primary font-medium tracking-[0.2em] text-sm uppercase mb-4">
              La Filosofía
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight">
              Maestría silenciosa. <br />
              <span className="italic font-serif text-primary/90">Enfoque absoluto.</span>
            </h2>
            
            <div className="space-y-6 text-foreground/60 font-light text-lg">
              <p>
                NOIR nació de una premisa singular: el cuidado masculino perdió su reverencia. En un mundo de turnos apresurados y distracciones ruidosas, ofrecemos un santuario de silencio y habilidad.
              </p>
              <p>
                Inspirados en la tradición japonesa del omakase y la arquitectura minimalista, cada servicio en NOIR es un ritual calculado. Nuestros maestros barberos se concentran por completo en el oficio, aplicando técnicas perfeccionadas durante décadas.
              </p>
              <p>
                Sin apuros. Sin pretensiones. Solo la elevación pura de la experiencia.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
              <div>
                <h4 className="text-3xl font-light text-foreground mb-2 tracking-tighter">02.</h4>
                <p className="text-sm text-foreground/50 uppercase tracking-widest">Maestros Barberos</p>
              </div>
              <div>
                <h4 className="text-3xl font-light text-foreground mb-2 tracking-tighter">{count}<span className="text-primary/70 text-xl">m</span></h4>
                <p className="text-sm text-foreground/50 uppercase tracking-widest">Turno Mínimo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
