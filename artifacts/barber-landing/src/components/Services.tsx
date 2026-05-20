import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const services = [
  {
    name: "The Director's Cut",
    price: "$120",
    description: "Our signature tailored haircut. Includes a comprehensive consultation, precision cut, scalp massage, and styling lesson. Finished with a hot towel neck shave.",
    time: "60 Min",
  },
  {
    name: "Traditional Hot Lather Shave",
    price: "$85",
    description: "A complete restorative ritual. Pre-shave oil, hot steam towels, warm lather, and a meticulous straight razor shave. Concludes with a cooling restorative balm.",
    time: "45 Min",
  },
  {
    name: "The Executive Reset",
    price: "$180",
    description: "The ultimate reset. Combines The Director's Cut and Traditional Shave with an extended scalp treatment and subtle grey blending if desired.",
    time: "90 Min",
  },
  {
    name: "Beard Architecture",
    price: "$65",
    description: "Structural beard shaping using both shears and clippers. Finished with straight razor detailing on the cheeks and neck, and premium beard oil application.",
    time: "30 Min",
  }
];

export default function Services() {
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
            Our Offerings
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-foreground"
          >
            The <span className="italic font-serif text-primary/90">Repertoire</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
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
                  <span className="text-xs text-foreground/40 uppercase tracking-[0.2em]">{service.time}</span>
                  <Button 
                    variant="link" 
                    className="text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 h-auto text-xs tracking-widest uppercase rounded-none transition-all"
                    data-testid={`button-book-${service.name.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    Select
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
