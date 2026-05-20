import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type AppointmentStatus = "pendiente" | "confirmado" | "cancelado";

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  service: string;       // service slug
  barberId: string;      // barber id
  barberName: string;    // barber display name
  date: string;          // ISO date string YYYY-MM-DD
  time: string;          // "HH:MM"
  createdAt: string;
  status: AppointmentStatus;
};

export type Barber = {
  id: string;
  name: string;
  role: string;
  initials: string;
};

export const BARBERS: Barber[] = [
  { id: "luciano", name: "Luciano", role: "Maestro Barbero", initials: "L" },
  { id: "mateo",   name: "Mateo",   role: "Maestro Barbero", initials: "M" },
];

export const SERVICES = [
  { slug: "corte-director",      name: "El Corte del Director",       price: "$12.000", description: "Nuestro corte insignia a medida. Incluye consulta exhaustiva, corte de precisión, masaje capilar y clase de peinado. Finaliza con afeitado de nuca con toalla caliente.", duration: "60 Min" },
  { slug: "afeitado-tradicional", name: "Afeitado Clásico con Navaja", price: "$8.500",  description: "Un ritual restaurativo completo. Aceite pre-afeitado, paños de vapor caliente, espuma tibia y un meticuloso afeitado con navaja recta. Cierra con bálsamo restaurador frío.",   duration: "45 Min" },
  { slug: "reset-ejecutivo",      name: "El Reset Ejecutivo",           price: "$18.000", description: "El reset definitivo. Combina El Corte del Director y el Afeitado Clásico con tratamiento capilar extendido y difuminado de canas opcional.",                                        duration: "90 Min" },
  { slug: "arquitectura-barba",   name: "Arquitectura de Barba",        price: "$6.500",  description: "Diseño estructural de barba con tijera y máquina. Termina con delineado en mejillas y cuello con navaja recta y aplicación de aceite de barba premium.",                            duration: "30 Min" },
];

// Returns true if that specific service+barber+date+time combo is already booked
// (only counts non-cancelled appointments)
export function isSlotTaken(
  appointments: Appointment[],
  serviceSlug: string,
  barberId: string,
  date: string,
  time: string
): boolean {
  return appointments.some(
    a =>
      a.service === serviceSlug &&
      a.barberId === barberId &&
      a.date === date &&
      a.time === time &&
      a.status !== "cancelado"
  );
}

type BookingContextType = {
  isOpen: boolean;
  selectedService: string | null;
  appointments: Appointment[];
  openBooking: (serviceSlug?: string) => void;
  closeBooking: () => void;
  addAppointment: (appointment: Omit<Appointment, "status">) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("noir_appointments");
      if (stored) setAppointments(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (updated: Appointment[]) => {
    setAppointments(updated);
    try { localStorage.setItem("noir_appointments", JSON.stringify(updated)); } catch {}
  };

  const openBooking = (serviceSlug?: string) => {
    setSelectedService(serviceSlug ?? null);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const addAppointment = (appointment: Omit<Appointment, "status">) => {
    persist([...appointments, { ...appointment, status: "pendiente" }]);
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    persist(appointments.map(a => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <BookingContext.Provider value={{ isOpen, selectedService, appointments, openBooking, closeBooking, addAppointment, updateAppointmentStatus }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
