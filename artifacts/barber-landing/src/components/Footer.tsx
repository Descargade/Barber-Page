export default function Footer() {
  return (
    <footer className="bg-secondary text-foreground/70 py-16 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="col-span-1 md:col-span-1 flex flex-col">
          <a href="#" className="text-2xl font-bold tracking-widest text-foreground mb-6 inline-block">
            NOIR<span className="text-primary">.</span>
          </a>
          <p className="font-light text-sm max-w-xs mb-8">
            A sanctuary of silence, skill, and uncompromising precision.
          </p>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <h4 className="text-foreground uppercase tracking-widest text-xs font-medium mb-2">Location</h4>
          <p className="font-light text-sm">
            184 Franklin St<br />
            Tribeca, NY 10013
          </p>
          <a href="#" className="text-primary text-sm hover:underline decoration-primary/50 underline-offset-4 w-fit transition-all mt-2">
            Get Directions
          </a>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <h4 className="text-foreground uppercase tracking-widest text-xs font-medium mb-2">Hours</h4>
          <p className="font-light text-sm flex justify-between max-w-[200px]">
            <span>Tue - Fri</span>
            <span>10am - 8pm</span>
          </p>
          <p className="font-light text-sm flex justify-between max-w-[200px]">
            <span>Saturday</span>
            <span>9am - 6pm</span>
          </p>
          <p className="font-light text-sm flex justify-between max-w-[200px] text-foreground/40">
            <span>Sun - Mon</span>
            <span>Closed</span>
          </p>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <h4 className="text-foreground uppercase tracking-widest text-xs font-medium mb-2">Connect</h4>
          <a href="#" className="font-light text-sm hover:text-primary transition-colors w-fit">Instagram</a>
          <a href="#" className="font-light text-sm hover:text-primary transition-colors w-fit">Journal</a>
          <a href="#" className="font-light text-sm hover:text-primary transition-colors w-fit">Concierge@noir.studio</a>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light tracking-wider text-foreground/40">
        <p>&copy; {new Date().getFullYear()} NOIR STUDIO. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
