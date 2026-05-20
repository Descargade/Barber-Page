import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "The only hour of my week where my phone stays in my pocket. The attention to detail borders on obsessive, in the best way possible.",
    author: "James M.",
    role: "Creative Director"
  },
  {
    quote: "It doesn't feel like getting a haircut. It feels like visiting a private club where everyone knows exactly what they are doing.",
    author: "Alexander T.",
    role: "Architect"
  },
  {
    quote: "A masterclass in restraint and skill. They don't just cut hair; they architect it. Worth every penny.",
    author: "David L.",
    role: "Founder"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 relative bg-secondary/20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/30 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="flex flex-col relative"
            >
              <span className="text-primary text-6xl font-serif absolute -top-8 -left-4 opacity-20">"</span>
              <p className="text-lg md:text-xl font-light text-foreground/80 leading-relaxed mb-8 relative z-10 italic">
                {t.quote}
              </p>
              <div className="mt-auto flex flex-col gap-1 border-l border-primary/30 pl-4">
                <span className="text-foreground tracking-wide">{t.author}</span>
                <span className="text-xs text-foreground/40 uppercase tracking-widest">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
