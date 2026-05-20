import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 relative bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <span className="text-primary font-medium tracking-[0.2em] text-sm uppercase mb-4 block">
              The Space
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Designed for <span className="italic font-serif text-primary/90">Clarity</span>
            </h2>
          </div>
          <div className="hidden md:block text-foreground/40 text-sm tracking-widest uppercase">
            Est. 2024
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="col-span-1 md:col-span-2 aspect-[16/9] md:aspect-auto overflow-hidden group relative"
          >
            <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img 
              src="/images/gallery-2.png" 
              alt="Premium Barber Tools" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter grayscale-[0.3]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="col-span-1 aspect-square md:aspect-[3/4] overflow-hidden group relative"
          >
            <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img 
              src="/images/gallery-3.png" 
              alt="Atmospheric Hair Styling" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter grayscale-[0.3]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="col-span-1 md:col-span-3 aspect-[16/9] md:aspect-[21/9] overflow-hidden group relative mt-4 md:mt-0"
          >
            <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img 
              src="/images/gallery-1.png" 
              alt="Minimalist Barber Station" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter grayscale-[0.3]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
