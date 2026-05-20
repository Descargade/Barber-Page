import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  createdAt: string;
};

export const SERVICES = [
  {
    slug: "corte-director",
    name: "El Corte del Director",
    price: "$12.000",
    description: "Nuestro corte insignia a medida. Incluye consulta exhaustiva, corte de precisión, masaje capilar y clase de peinado. Finaliza con afeitado de nuca con toalla caliente.",
    duration: "60 Min",
  },
  {
    slug: "afeitado-tradicional",
    name: "Afeitado Clásico con Navaja",
    price: "$8.500",
    description: "Un ritual restaurativo completo. Aceite pre-afeitado, paños de vapor caliente, espuma tibia y un meticuloso afeitado con navaja recta. Cierra con bálsamo restaurador frío.",
    duration: "45 Min",
  },
  {
    slug: "reset-ejecutivo",
    name: "El Reset Ejecutivo",
    price: "$18.000",
    description: "El reset definitivo. Combina El Corte del Director y el Afeitado Clásico con tratamiento capilar extendido y difuminado de canas opcional.",
    duration: "90 Min",
  },
  {
    slug: "arquitectura-barba",
    name: "Arquitectura de Barba",
    price: "$6.500",
    description: "Diseño estructural de barba con tijera y máquina. Termina con delineado en mejillas y cuello con navaja recta y aplicación de aceite de barba premium.",
    duration: "30 Min",
  }
];

type BookingContextType = {
  isOpen: boolean;
  selectedService: string | null;
  appointments: Appointment[];
  openBooking: (serviceSlug?: string) => void;
  closeBooking: () => void;
  addAppointment: (appointment: Appointment) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("noir_appointments");
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
  }, []);

  const openBooking = (serviceSlug?: string) => {
    setSelectedService(serviceSlug || null);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const addAppointment = (appointment: Appointment) => {
    const updated = [...appointments, appointment];
    setAppointments(updated);
    try {
      localStorage.setItem("noir_appointments", JSON.stringify(updated));
    } catch (e) {
      console.error("Error writing to localStorage", e);
    }
  };

  return (
    <BookingContext.Provider value={{ isOpen, selectedService, appointments, openBooking, closeBooking, addAppointment }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
