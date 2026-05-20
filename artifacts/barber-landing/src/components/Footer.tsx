export default function Footer() {
  return (
    <footer className="bg-secondary text-foreground/70 py-16 border-t border-transparent" style={{ borderImage: "linear-gradient(to right, transparent, rgba(204,153,85,0.2), transparent) 1" }}>
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="col-span-1 md:col-span-1 flex flex-col">
          <a href="#" className="text-2xl font-bold tracking-widest text-foreground mb-6 inline-block">
            NOIR<span className="text-primary">.</span>
          </a>
          <p className="font-light text-sm max-w-xs mb-8">
            Un santuario de silencio, habilidad y precisión sin concesiones.
          </p>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <h4 className="text-foreground uppercase tracking-widest text-xs font-medium mb-2">Ubicación</h4>
          <p className="font-light text-sm">
            184 Franklin St<br />
            Tribeca, NY 10013
          </p>
          <a href="#" className="text-primary text-sm hover:underline decoration-primary/50 underline-offset-4 w-fit transition-all mt-2">
            Cómo llegar
          </a>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <h4 className="text-foreground uppercase tracking-widest text-xs font-medium mb-2">Horarios</h4>
          <p className="font-light text-sm flex justify-between max-w-[200px]">
            <span>Mar - Vie</span>
            <span>10hs - 20hs</span>
          </p>
          <p className="font-light text-sm flex justify-between max-w-[200px]">
            <span>Sábado</span>
            <span>9hs - 18hs</span>
          </p>
          <p className="font-light text-sm flex justify-between max-w-[200px] text-foreground/40">
            <span>Dom - Lun</span>
            <span>Cerrado</span>
          </p>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <h4 className="text-foreground uppercase tracking-widest text-xs font-medium mb-2">Contacto</h4>
          <a href="#" className="font-light text-sm hover:text-primary hover:tracking-wide transition-all w-fit">Instagram</a>
          <a href="#" className="font-light text-sm hover:text-primary hover:tracking-wide transition-all w-fit">Revista</a>
          <a href="#" className="font-light text-sm hover:text-primary hover:tracking-wide transition-all w-fit">Concierge@noir.studio</a>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light tracking-wider text-foreground/40">
        <p>&copy; {new Date().getFullYear()} NOIR STUDIO. TODOS LOS DERECHOS RESERVADOS.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Política de Privacidad</a>
          <a href="#" className="hover:text-foreground transition-colors">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
}
