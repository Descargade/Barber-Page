import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useBooking, SERVICES } from "@/context/BookingContext";

export default function Services() {
  const { openBooking } = useBooking();

  return (
    <section id="services" className="py-32 relative bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-[0.2em] text-sm uppercase mb-4 block"
          >
            Lo que ofrecemos
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-foreground"
          >
            El <span className="italic font-serif text-primary/90">Repertorio</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative bg-card/50 backdrop-blur-sm border border-white/5 p-8 hover:border-primary/30 transition-colors duration-500 flex flex-col h-full"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-light text-foreground">{service.name}</h3>
                  <span className="text-primary text-xl font-light tracking-widest">{service.price}</span>
                </div>
                
                <p className="text-foreground/60 font-light leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                
                <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-6">
                  <span className="text-xs text-foreground/40 uppercase tracking-[0.2em]">{service.duration}</span>
                  <Button 
                    onClick={() => openBooking(service.slug)}
                    variant="link" 
                    className="text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 h-auto text-xs tracking-widest uppercase rounded-none transition-all"
                    data-testid={`button-book-${service.slug}`}
                  >
                    Seleccionar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
