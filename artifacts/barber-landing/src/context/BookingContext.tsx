import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export type AppointmentStatus = "pendiente" | "confirmado" | "cancelado";

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  service: string;
  barberId: string;
  barberName: string;
  date: string;
  time: string;
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
  { slug: "corte-director",       name: "El Corte del Director",        price: "$12.000", description: "Nuestro corte insignia a medida. Incluye consulta exhaustiva, corte de precisión, masaje capilar y clase de peinado. Finaliza con afeitado de nuca con toalla caliente.",  duration: "60 Min" },
  { slug: "afeitado-tradicional", name: "Afeitado Clásico con Navaja",  price: "$8.500",  description: "Un ritual restaurativo completo. Aceite pre-afeitado, paños de vapor caliente, espuma tibia y un meticuloso afeitado con navaja recta. Cierra con bálsamo restaurador frío.", duration: "45 Min" },
  { slug: "reset-ejecutivo",      name: "El Reset Ejecutivo",            price: "$18.000", description: "El reset definitivo. Combina El Corte del Director y el Afeitado Clásico con tratamiento capilar extendido y difuminado de canas opcional.",                                    duration: "90 Min" },
  { slug: "arquitectura-barba",   name: "Arquitectura de Barba",         price: "$6.500",  description: "Diseño estructural de barba con tijera y máquina. Termina con delineado en mejillas y cuello con navaja recta y aplicación de aceite de barba premium.",                       duration: "30 Min" },
];

// Map DB row (snake_case) → TS Appointment (camelCase)
function rowToAppointment(row: Record<string, unknown>): Appointment {
  return {
    id: row.id as string,
    name: row.name as string,
    phone: row.phone as string,
    service: row.service as string,
    barberId: row.barber_id as string,
    barberName: row.barber_name as string,
    date: row.date as string,
    time: row.time as string,
    createdAt: row.created_at as string,
    status: row.status as AppointmentStatus,
  };
}

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
  loading: boolean;
  openBooking: (serviceSlug?: string) => void;
  closeBooking: () => void;
  addAppointment: (appointment: Omit<Appointment, "status">) => Promise<void>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => Promise<void>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial fetch
  useEffect(() => {
    let mounted = true;
    async function fetchAppointments() {
      const { data } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });
      if (mounted && data) {
        setAppointments(data.map(rowToAppointment));
      }
      if (mounted) setLoading(false);
    }
    fetchAppointments();

    // Real-time subscription
    const channel = supabase
      .channel("appointments-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, () => {
        fetchAppointments();
      })
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const openBooking = (serviceSlug?: string) => {
    setSelectedService(serviceSlug ?? null);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const addAppointment = async (appointment: Omit<Appointment, "status">) => {
    const row = {
      id: appointment.id,
      name: appointment.name,
      phone: appointment.phone,
      service: appointment.service,
      barber_id: appointment.barberId,
      barber_name: appointment.barberName,
      date: appointment.date,
      time: appointment.time,
      created_at: appointment.createdAt,
      status: "pendiente",
    };
    const { data } = await supabase.from("appointments").insert(row).select().single();
    if (data) {
      setAppointments(prev => [rowToAppointment(data), ...prev]);
    }
  };

  const updateAppointmentStatus = async (id: string, status: AppointmentStatus) => {
    const { data } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (data) {
      setAppointments(prev => prev.map(a => (a.id === id ? rowToAppointment(data) : a)));
    }
  };

  return (
    <BookingContext.Provider value={{ isOpen, selectedService, appointments, loading, openBooking, closeBooking, addAppointment, updateAppointmentStatus }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
