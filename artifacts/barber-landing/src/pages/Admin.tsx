import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";
import { BookingProvider, useBooking, Appointment, AppointmentStatus, SERVICES } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";

function AdminDashboard() {
  const { logout } = useAdminAuth();
  const { appointments, updateAppointmentStatus, loading } = useBooking();
  const [filter, setFilter] = useState<"todos" | AppointmentStatus>("todos");

  const filteredAppointments = appointments
    .filter(a => filter === "todos" || a.status === filter)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalCount = appointments.length;
  const confirmedCount = appointments.filter(a => a.status === "confirmado").length;
  const pendingCount = appointments.filter(a => a.status === "pendiente").length;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-widest">
          NOIR<span className="text-primary">.</span> <span className="font-light text-foreground/50">Admin</span>
        </h1>
        <button onClick={logout} className="text-foreground/50 hover:text-foreground transition-colors text-sm" data-testid="button-logout">
          Cerrar sesión
        </button>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 rounded-full border border-primary/30 border-t-primary animate-spin" />
              <p className="text-foreground/40 text-sm tracking-widest uppercase">Cargando turnos</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <StatCard title="Total" value={totalCount} />
              <StatCard title="Confirmados" value={confirmedCount} />
              <StatCard title="Pendientes" value={pendingCount} />
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {(["todos", "pendiente", "confirmado", "cancelado"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm capitalize transition-all border ${filter === f ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-foreground/60 hover:border-white/30"}`}
                  data-testid={`filter-${f}`}
                >
                  {f === "todos" ? "Todos" : f + "s"}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredAppointments.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20"
                  >
                    <p className="text-foreground/50 font-light mb-4">Aún no hay turnos registrados.</p>
                    <div className="w-16 h-px bg-white/10 mx-auto" />
                  </motion.div>
                ) : (
                  filteredAppointments.map((apt, index) => (
                    <motion.div
                      key={apt.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card border border-white/5 rounded-xl p-5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
                    >
                      <div>
                        <h3 className="text-xl font-light text-foreground mb-1">{apt.name} <span className="text-sm text-foreground/40 ml-2">{apt.phone}</span></h3>
                        <p className="text-foreground/50 text-sm mb-2">{SERVICES.find(s => s.slug === apt.service)?.name ?? apt.service} <span className="text-foreground/30">·</span> {apt.barberName ?? "—"}</p>
                        <p className="text-primary text-sm font-medium tracking-wide">{apt.date} — {apt.time}</p>
                      </div>
                      
                      <div className="flex gap-2 w-full md:w-auto">
                        {(["pendiente", "confirmado", "cancelado"] as AppointmentStatus[]).map(status => (
                          <motion.button
                            key={status}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => void updateAppointmentStatus(apt.id, status)}
                            className={`px-3 py-1.5 rounded-md text-xs uppercase tracking-wider transition-colors flex-1 md:flex-none border ${
                              apt.status === status
                                ? status === "pendiente" ? "bg-amber-500/20 text-amber-500 border-amber-500/50"
                                : status === "confirmado" ? "bg-green-500/20 text-green-500 border-green-500/50"
                                : "bg-red-500/20 text-red-500 border-red-500/50"
                                : "bg-transparent text-foreground/40 border-white/5 hover:border-white/20 hover:text-foreground"
                            }`}
                            data-testid={`status-${apt.id}-${status}`}
                          >
                            {status}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const end = value;
    if (end === 0) return;
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-white/5 p-6 rounded-xl">
      <p className="text-foreground/50 text-sm uppercase tracking-widest mb-2">{title}</p>
      <p className="text-4xl font-light text-foreground">{count}</p>
    </div>
  );
}

function LoginScreen() {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 selection:bg-primary/30 selection:text-primary">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <div className="text-3xl font-bold tracking-widest text-foreground mb-8">
            NOIR<span className="text-primary">.</span>
          </div>
          <span className="text-primary font-medium tracking-[0.2em] text-xs uppercase mb-2 block">
            Panel de Administración
          </span>
          <h2 className="text-3xl font-light text-foreground">Acceso Restringido</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-input border border-white/10 text-foreground placeholder:text-foreground/30 focus:border-primary/50 focus:ring-0 focus:outline-none rounded-xl px-4 py-4 transition-colors"
              data-testid="input-password"
            />
          </div>
          <div className="relative">
            <Button
              type="submit"
              className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(204,153,85,0.3)] transition-all"
              data-testid="button-login"
            >
              Ingresar
            </Button>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: [0, -10, 10, -10, 10, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -bottom-8 left-0 right-0 text-center text-red-500/80 text-sm"
                >
                  Contraseña incorrecta
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminContent() {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? <AdminDashboard /> : <LoginScreen />;
}

export default function Admin() {
  return (
    <BookingProvider>
      <AdminAuthProvider>
        <AdminContent />
      </AdminAuthProvider>
    </BookingProvider>
  );
}
