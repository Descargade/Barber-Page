import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking, SERVICES, BARBERS, isSlotTaken } from "@/context/BookingContext";

export default function BookingModal() {
  const { isOpen, closeBooking, selectedService, addAppointment, appointments, loading } = useBooking();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [service, setService] = useState<string | null>(null);
  const [barber, setBarber] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (selectedService) {
        setService(selectedService);
        setStep(2);
      } else {
        setStep(1);
      }
      setDirection(1);
      setBarber(null);
      setDate(null);
      setTime(null);
      setName("");
      setPhone("");
      setIsSuccess(false);
    }
  }, [isOpen, selectedService]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeBooking();
  };

  const goNext = () => { setDirection(1); setStep(s => s + 1); };
  const goBack = () => { setDirection(-1); setStep(s => s - 1); };

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

  const handleSubmit = async () => {
    if (!name.trim() || !/^[0-9\s\-\+]{8,}$/.test(phone)) return;
    if (!service || !barber || !date || !time) return;
    setIsSubmitting(true);
    try {
      const barberObj = BARBERS.find(b => b.id === barber);
      await addAppointment({
        id: Date.now().toString(),
        name,
        phone,
        service: service ?? "",
        barberId: barber ?? "",
        barberName: barberObj?.name ?? barber ?? "",
        date: date ?? "",
        time: time ?? "",
        createdAt: new Date().toISOString(),
      });
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    initial: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    animate: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2 } }),
  };

  const renderStepHeader = (title: string, subtitle?: string) => (
    <div>
      {step > 1 && !isSuccess && (
        <button onClick={goBack} className="flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors text-sm mb-4 group" data-testid="button-back">
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Volver
        </button>
      )}
      <h2 className="text-xl font-light text-foreground">{title}</h2>
      {subtitle && <p className="text-sm text-foreground/40 mt-1">{subtitle}</p>}
    </div>
  );

  const selectedServiceName = SERVICES.find(s => s.slug === service)?.name;
  const selectedBarberName = BARBERS.find(b => b.id === barber)?.name;

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
          className="bg-card border border-white/8 max-w-lg w-full p-8 md:p-10 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col min-h-[420px]"
        >
          <button 
            onClick={closeBooking}
            className="absolute top-6 right-6 text-foreground/50 hover:text-foreground transition-colors z-10"
            data-testid="button-close-modal"
          >
            <X size={24} />
          </button>
          
          {!isSuccess && (
            <div className="flex gap-1.5 mb-8 w-full">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                    i <= step ? "bg-primary" : "bg-white/10"
                  }`} 
                />
              ))}
            </div>
          )}

          <div className="relative flex-1 flex flex-col">
            <AnimatePresence mode="wait" custom={direction}>
              {isSuccess ? (
                <motion.div 
                  key="success"
                  custom={direction}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center justify-center flex-1 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                    className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mb-6"
                  >
                    <Check className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h2 className="text-2xl font-light text-foreground mb-4">¡Turno confirmado!</h2>
                  <div className="text-foreground/60 font-light mb-8 space-y-2">
                    <p>{name}</p>
                    <p>{selectedServiceName}</p>
                    <p>{selectedBarberName}</p>
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
              ) : step === 1 ? (
                <motion.div 
                  key="step1"
                  custom={direction}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col flex-1 gap-6"
                >
                  {renderStepHeader("Elegí tu servicio")}
                  <div className="flex flex-col gap-3 overflow-y-auto pr-2 max-h-[300px] scrollbar-thin">
                    {SERVICES.map((s) => (
                      <div
                        key={s.slug}
                        onClick={() => setService(s.slug)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          service === s.slug 
                            ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(204,153,85,0.15)] ring-1 ring-primary" 
                            : "border-white/10 bg-card/50 hover:border-white/30"
                        }`}
                        data-testid={`service-${s.slug}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-foreground">{s.name}</span>
                          <span className="text-primary">{s.price}</span>
                        </div>
                        <p className="text-sm text-foreground/50">{s.duration}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-4">
                    <Button 
                      onClick={goNext}
                      disabled={!service}
                      className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(204,153,85,0.3)] transition-all"
                      data-testid="button-next-step"
                    >
                      Continuar
                    </Button>
                  </div>
                </motion.div>
              ) : step === 2 ? (
                <motion.div 
                  key="step2"
                  custom={direction}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col flex-1 gap-6"
                >
                  {renderStepHeader("Elegí tu barbero", "Dos maestros, un mismo estándar.")}
                  <div className="grid grid-cols-2 gap-4">
                    {BARBERS.map((b) => (
                      <motion.div
                        key={b.id}
                        whileHover={{ y: -2 }}
                        onClick={() => setBarber(b.id)}
                        className={`p-6 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                          barber === b.id 
                            ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(204,153,85,0.15)] ring-1 ring-primary" 
                            : "border-white/10 bg-card/50 hover:border-white/30"
                        }`}
                        data-testid={`barber-${b.id}`}
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                          <span className="text-primary font-light text-2xl">{b.initials}</span>
                        </div>
                        <h3 className="text-lg font-light text-foreground">{b.name}</h3>
                        <p className="text-xs text-foreground/40 uppercase tracking-widest mt-1">{b.role}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-auto pt-4">
                    <Button 
                      onClick={goNext}
                      disabled={!barber}
                      className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(204,153,85,0.3)] transition-all"
                      data-testid="button-next-step"
                    >
                      Continuar
                    </Button>
                  </div>
                </motion.div>
              ) : step === 3 ? (
                <motion.div 
                  key="step3"
                  custom={direction}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col flex-1 gap-6"
                >
                  {renderStepHeader("Fecha y hora", `${selectedServiceName} · ${selectedBarberName}`)}
                  <div>
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
                          data-testid={`date-${d.value}`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {date && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-5 gap-2 mt-2"
                    >
                      {loading ? (
                        Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className="py-2 rounded-full border border-white/5 bg-white/3 animate-pulse h-[38px]" />
                        ))
                      ) : times.map((t) => {
                        const taken = service && barber && date ? isSlotTaken(appointments, service, barber, date, t) : false;
                        return (
                          <button
                            key={t}
                            disabled={taken}
                            onClick={() => setTime(t)}
                            className={`py-2 rounded-full border text-center transition-all text-sm ${
                              taken 
                                ? "opacity-30 cursor-not-allowed line-through border-white/5 text-foreground/50"
                                : time === t
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-white/10 bg-transparent text-foreground hover:border-white/30"
                            }`}
                            data-testid={`time-${t}`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                  
                  <div className="mt-auto pt-4">
                    <Button 
                      onClick={goNext}
                      disabled={!date || !time}
                      className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(204,153,85,0.3)] transition-all"
                      data-testid="button-next-step"
                    >
                      Continuar
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="step4"
                  custom={direction}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col flex-1 gap-6"
                >
                  {renderStepHeader("Tus datos")}
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-input border border-white/10 text-foreground placeholder:text-foreground/30 focus:border-primary/50 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 transition-colors"
                      data-testid="input-name"
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-input border border-white/10 text-foreground placeholder:text-foreground/30 focus:border-primary/50 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 transition-colors"
                      data-testid="input-phone"
                    />
                  </div>
                  
                  <div className="bg-muted/30 rounded-xl p-4 border border-white/5 mt-2">
                    <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                      <span className="text-foreground/40">Servicio</span>
                      <span className="text-foreground">{selectedServiceName}</span>
                      <span className="text-foreground/40">Barbero</span>
                      <span className="text-foreground">{selectedBarberName}</span>
                      <span className="text-foreground/40">Fecha</span>
                      <span className="text-foreground">{date} · {time}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <Button 
                      onClick={() => void handleSubmit()}
                      disabled={!name.trim() || !/^[0-9\s\-\+]{8,}$/.test(phone) || isSubmitting}
                      className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(204,153,85,0.3)] transition-all"
                      data-testid="button-confirm-booking"
                    >
                      {isSubmitting ? "Reservando..." : "Confirmar turno"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
