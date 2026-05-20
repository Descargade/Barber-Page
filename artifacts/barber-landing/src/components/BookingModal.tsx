import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking, SERVICES } from "@/context/BookingContext";

export default function BookingModal() {
  const { isOpen, closeBooking, selectedService, addAppointment } = useBooking();
  const [step, setStep] = useState(1);
  
  // Step 1 state
  const [service, setService] = useState<string | null>(null);
  
  // Step 2 state
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  
  // Step 3 state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Success state
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize with selected service if any
  useEffect(() => {
    if (isOpen) {
      if (selectedService) {
        setService(selectedService);
        setStep(2);
      } else {
        setStep(1);
      }
      setDate(null);
      setTime(null);
      setName("");
      setPhone("");
      setIsSuccess(false);
    }
  }, [isOpen, selectedService]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeBooking();
    }
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = d.toLocaleDateString('es-ES', { weekday: 'short' });
      const dayNum = d.getDate();
      dates.push({
        value: d.toISOString().split('T')[0],
        label: `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${dayNum}`
      });
    }
    return dates;
  };

  const times = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

  const handleServiceSelect = (s: string) => {
    setService(s);
    setTimeout(() => setStep(2), 300);
  };

  const handleTimeSelect = (t: string) => {
    setTime(t);
    setTimeout(() => setStep(3), 200);
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    if (!/^[0-9\s\-\+]{8,}$/.test(phone)) return;
    
    addAppointment({
      id: Date.now().toString(),
      name,
      phone,
      service: service || "",
      date: date || "",
      time: time || "",
      createdAt: new Date().toISOString()
    });
    
    setIsSuccess(true);
  };

  const variants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  const renderStep = () => {
    if (isSuccess) {
      return (
        <motion.div 
          key="success"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center py-10 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6"
          >
            <Check className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-3xl font-light text-foreground mb-4">¡Turno confirmado!</h2>
          <div className="text-foreground/60 font-light mb-8 space-y-2">
            <p>{name}</p>
            <p>{SERVICES.find(s => s.slug === service)?.name}</p>
            <p>{date} a las {time}</p>
          </div>
          <Button 
            onClick={closeBooking}
            className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(204,153,85,0.3)] transition-all"
            data-testid="button-close-success"
          >
            Cerrar
          </Button>
        </motion.div>
      );
    }

    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <h2 className="text-2xl font-light mb-6">Elegir Servicio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map((s) => {
                const isSelected = service === s.slug;
                return (
                  <button
                    key={s.slug}
                    onClick={() => handleServiceSelect(s.slug)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col ${
                      isSelected 
                        ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(204,153,85,0.2)] ring-1 ring-primary" 
                        : "border-white/10 bg-card/50 hover:border-white/30"
                    }`}
                  >
                    <span className="font-medium text-foreground mb-2">{s.name}</span>
                    <div className="flex justify-between w-full text-sm mt-auto">
                      <span className="text-primary">{s.price}</span>
                      <span className="text-foreground/50">{s.duration}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            key="step2"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <h2 className="text-2xl font-light mb-6">Fecha y Hora</h2>
            
            <div className="mb-8">
              <p className="text-sm text-foreground/50 mb-3 uppercase tracking-widest">Fecha</p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {generateDates().map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setDate(d.value)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full border transition-all text-sm ${
                      date === d.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-white/10 bg-transparent text-foreground hover:border-white/30"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {date && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm text-foreground/50 mb-3 uppercase tracking-widest">Hora</p>
                <div className="grid grid-cols-4 gap-2">
                  {times.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleTimeSelect(t)}
                      className={`py-2 rounded-full border text-center transition-all text-sm ${
                        time === t
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-white/10 bg-transparent text-foreground hover:border-white/30"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            key="step3"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <h2 className="text-2xl font-light mb-6">Tus Datos</h2>
            <div className="space-y-4 mb-8">
              <div>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-input border border-white/10 text-foreground placeholder:text-foreground/30 focus:border-primary/50 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 transition-colors"
                  data-testid="input-name"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-input border border-white/10 text-foreground placeholder:text-foreground/30 focus:border-primary/50 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 transition-colors"
                  data-testid="input-phone"
                />
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-white/10">
              <Button 
                onClick={handleSubmit}
                disabled={!name.trim() || !/^[0-9\s\-\+]{8,}$/.test(phone)}
                className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(204,153,85,0.3)] transition-all"
                data-testid="button-confirm-booking"
              >
                Confirmar turno
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card border border-white/8 max-w-lg w-full p-8 md:p-10 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          <button 
            onClick={closeBooking}
            className="absolute top-6 right-6 text-foreground/50 hover:text-foreground transition-colors"
            data-testid="button-close-modal"
          >
            <X size={24} />
          </button>
          
          {!isSuccess && (
            <div className="flex gap-2 mb-8 justify-center">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${
                    i <= step ? "bg-primary" : "bg-white/10"
                  }`} 
                />
              ))}
            </div>
          )}

          <div className="min-h-[300px]">
            <AnimatePresence mode="wait" initial={false}>
              {renderStep()}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
