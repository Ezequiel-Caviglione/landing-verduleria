import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Heart,
  Sparkles,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'

// --- Components ---

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Productos', href: '#seasonal' },
    { label: 'Nosotros', href: '#about' },
    { label: 'Dónde Estamos', href: '#location' },
  ]

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-salmon/80 backdrop-blur-md border-b border-emerald/10">
        <a href="#hero" className="font-heading text-2xl md:text-3xl text-emerald uppercase tracking-tight">
          Verdulería
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-sm uppercase tracking-widest text-emerald/70 hover:text-emerald transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-emerald p-1"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu size={28} />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative ml-auto w-72 max-w-[80vw] h-full bg-salmon shadow-2xl flex flex-col py-20 px-8">
            <button
              className="absolute top-6 right-6 text-emerald"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-4xl uppercase tracking-tight text-emerald hover:text-emerald/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const Ticker = () => {
  return (
    <div className="ticker absolute bottom-0 left-[-10%] w-[120%] h-24 bg-emerald transform rotate-[-2deg] flex items-center overflow-hidden z-30 shadow-2xl border-y-4 border-gold">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-white font-heading text-3xl uppercase tracking-tighter mx-4">
            FRESCO • LOCAL • SALUDABLE • FRESCO • LOCAL • SALUDABLE • FRESCO • LOCAL • SALUDABLE • 
          </span>
        ))}
      </motion.div>
    </div>
  )
}

const Hero = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen bg-salmon overflow-hidden flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/2 min-h-[60vh] md:h-screen flex flex-col justify-center px-10 md:px-20 z-10 bg-salmon pt-20 md:pt-0">
        <div className="absolute top-10 left-10 opacity-10">
          <img 
            src="https://cdn.jsdelivr.net/npm/game-icons-transparent@latest/svgs/lorc/sunbeams.svg" 
            className="w-64 h-64 invert-[24%] sepia-[98%] saturate-[1210%] hue-rotate-[130deg] brightness-[92%] contrast-[102%]" 
            alt=""
          />
        </div>
        <motion.h1 
          className="font-heading text-6xl md:text-[11rem] leading-[0.8] uppercase transform -rotate-2 relative mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Verdulería<br />
          <span className="text-white bg-emerald px-6 md:px-10 py-2 md:py-4 rotate-3 inline-block shadow-[10px_10px_0px_white] mt-4 brutalist-border !border-white !shadow-white">
            Local
          </span>
          <img 
            src="https://cdn.jsdelivr.net/npm/game-icons-transparent@latest/svgs/delapouite/sun-spear.svg" 
            className="w-16 h-16 absolute -top-12 -right-8 opacity-40 rotate-12 hidden md:block text-white" 
            alt=""
          />
        </motion.h1>
        <motion.p 
          className="font-body text-4xl md:text-5xl mt-8 max-w-xl leading-[1.1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          El sabor del campo, directo a tu mesa. <br />
          <span className="bg-gold px-2">Frescura garantizada</span> desde 1962.
        </motion.p>
      </div>

      <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-emerald z-20 hidden md:block"></div>
        <img 
          src="https://images.unsplash.com/photo-1583670406087-4967a6e073e7?auto=format&w=1200&q=80&fit=crop" 
          alt="Fruit Market" 
          className="w-full h-full object-cover diagonal-clip md:clip-none" 
        />
      </div>

      <Ticker />
    </section>
  )
}

const Seasonal = () => {
  return (
    <section id="seasonal" className="bg-salmon py-32 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-5xl md:text-6xl uppercase transform rotate-1">Temporada de Salud</h2>
          <p className="font-body text-2xl md:text-3xl mt-2">Good for the gut, good for the soul</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            className="md:col-span-2 md:row-span-2 bg-gold brutalist-border p-8 md:p-10 flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <h3 className="font-heading text-4xl md:text-5xl mb-6">El Tesoro de la Huerta</h3>
              <p className="text-2xl md:text-3xl leading-snug">Cada mañana seleccionamos lo mejor para ti. Sin químicos, sin intermediarios, solo amor por la tierra.</p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Heart className="w-12 h-12 md:w-16 md:h-16 hover:scale-110 cursor-pointer transition-transform fill-none group-hover:fill-emerald" />
                <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-emerald animate-pulse" />
              </div>
              <button className="bg-emerald text-white font-heading text-xl md:text-2xl px-6 md:px-8 py-3 transform -rotate-1 hover:rotate-1 transition-transform brutalist-border !shadow-emerald/50">
                Explorar
              </button>
            </div>
          </motion.div>

          <div className="bg-white brutalist-border overflow-hidden relative group h-64 md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&w=600&q=80&fit=crop" 
              alt="Papaya" 
              className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700" 
            />
            <div className="absolute bottom-4 right-4 bg-gold px-4 py-1 font-heading border-2 border-emerald">PAPAYA</div>
          </div>

          <div className="md:row-span-2 bg-white brutalist-border overflow-hidden relative group h-80 md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1528279335935-f486951a6adf?auto=format&w=800&q=80&fit=crop" 
              alt="Bananas" 
              className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700" 
            />
            <div className="absolute top-4 left-4 bg-salmon px-4 py-1 font-heading border-2 border-emerald text-white">PLÁTANO VERDE</div>
          </div>

          <div className="bg-emerald brutalist-border p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group h-64 md:h-auto">
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <img 
                src="https://cdn.jsdelivr.net/npm/game-icons-transparent@latest/svgs/lorc/expanded-rays.svg" 
                className="w-full h-full scale-150 invert" 
                alt=""
              />
            </div>
            <p className="text-gold font-heading text-4xl md:text-5xl leading-none uppercase relative z-10 group-hover:scale-110 transition-transform">
              Directo <br /> del <br /> Campo
            </p>
            <div className="absolute -top-4 -right-4 text-gold animate-pulse">
              <Sparkles className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const About = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [-200, 200])

  return (
    <section id="about" className="relative bg-gold py-32 md:py-40 overflow-hidden">
      <div className="absolute top-[-1px] left-0 w-full overflow-hidden leading-none z-20">
        <div className="w-full h-[120px] bg-salmon torn-edge-top transform rotate-180"></div>
      </div>

      <motion.div 
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <span className="text-[20rem] md:text-[40rem] font-heading text-emerald opacity-5 transform select-none">1962</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24 pt-20 md:pt-48">
        <div className="md:w-1/2">
          <h2 className="font-heading text-7xl md:text-9xl mb-8 md:mb-12 transform -rotate-2 leading-none relative">
            Desde<br />
            <span className="text-white [-webkit-text-stroke:3px_var(--color-emerald)]">1962</span>
            <img 
              src="https://cdn.jsdelivr.net/npm/game-icons-transparent@latest/svgs/delapouite/striped-sun.svg" 
              className="w-24 h-24 absolute -top-20 -left-12 opacity-20 text-emerald" 
              alt=""
            />
          </h2>
          <p className="text-3xl md:text-5xl leading-[1.3]">
            Comenzamos con un pequeño camión y un gran sueño: llevar la huerta directamente a los barrios de Madrid. Tres generaciones después, seguimos seleccionando cada fruto con la misma pasión que el primer día.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <span className="w-16 h-1 bg-emerald"></span>
            <span className="font-heading text-xl md:text-2xl uppercase tracking-widest">Tradición Familiar</span>
          </div>
        </div>

        <div className="md:w-1/2 relative h-[500px] md:h-[600px] w-full flex items-center justify-center">
          <motion.div 
            className="absolute top-0 left-0 bg-white p-4 pb-12 md:pb-16 brutalist-border rotate-[-8deg] z-20 w-64 md:w-80 shadow-2xl cursor-pointer"
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
            animate={{ y: [0, 15, 0], rotate: [-8, -7, -8] }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1775826405991-ddb8bc85d22f?auto=format&w=600&q=80&fit=crop" 
              alt="Vintage Truck" 
              className="w-full aspect-square object-cover" 
            />
            <p className="mt-6 text-center text-3xl md:text-4xl font-body text-gray-700">El camión del abuelo</p>
            <div className="absolute -top-4 -right-4 bg-gold w-12 h-12 rounded-full flex items-center justify-center border-2 border-emerald">
              <Star className="w-6 h-6 fill-emerald text-emerald" />
            </div>
          </motion.div>

          <motion.div 
            className="absolute bottom-0 right-0 bg-white p-4 pb-12 md:pb-16 brutalist-border rotate-[12deg] z-10 w-64 md:w-80 shadow-2xl cursor-pointer"
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <img 
              src="https://images.unsplash.com/photo-1774244764146-021c31335e27?auto=format&w=600&q=80&fit=crop" 
              alt="Old Market" 
              className="w-full aspect-square object-cover" 
            />
            <p className="mt-6 text-center text-3xl md:text-4xl font-body text-gray-700">Calle de la Fruta, 1968</p>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-salmon text-white font-heading px-6 py-2 border-2 border-emerald rounded-full rotate-12 shadow-lg whitespace-nowrap">
            100% LOCAL
          </div>
        </div>
      </div>
    </section>
  )
}

const Location = () => {
  return (
    <section id="location" className="bg-salmon py-32 px-6 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        <div className="w-full md:w-1/2">
          <h2 className="font-heading text-6xl md:text-8xl mb-16 md:mb-20 uppercase">Dónde<br />Estamos</h2>
          
          <div className="space-y-12 md:space-y-16">
            <div className="relative group flex items-start pt-12">
              <span className="font-heading text-8xl md:text-[14rem] leading-none text-emerald opacity-10 absolute left-[-1rem] -top-12 select-none">01</span>
              <div className="relative z-10 pl-12 md:pl-16">
                <h4 className="font-heading text-4xl md:text-6xl mb-2 uppercase text-white bg-emerald inline-block px-6 rotate-1">Dirección</h4>
                <p className="text-xl sm:text-3xl md:text-5xl mt-6 font-body break-all">Calle de la Fruta 45,<br />Barrio Mercado, Madrid</p>
              </div>
            </div>
    
            <div className="relative group flex items-start pt-12">
              <span className="font-heading text-8xl md:text-[14rem] leading-none text-emerald opacity-10 absolute left-[-1rem] -top-12 select-none">02</span>
              <div className="relative z-10 pl-12 md:pl-16">
                <h4 className="font-heading text-4xl md:text-6xl mb-2 uppercase text-white bg-emerald inline-block px-6 -rotate-1">Horario</h4>
                <p className="text-xl sm:text-3xl md:text-5xl mt-6 font-body break-all">Lun - Sáb: 7:00 - 20:00<br />Dom: 8:00 - 14:00</p>
              </div>
            </div>
    
            <div className="relative group flex items-start pt-12">
              <span className="font-heading text-8xl md:text-[14rem] leading-none text-emerald opacity-10 absolute left-[-1rem] -top-12 select-none">03</span>
              <div className="relative z-10 pl-12 md:pl-16">
                <h4 className="font-heading text-4xl md:text-6xl mb-2 uppercase text-white bg-emerald inline-block px-6 rotate-2">Contacto</h4>
                <p className="text-xl sm:text-3xl md:text-5xl mt-6 font-body break-all">+34 91 123 4567<br />hola@labodegalocal.es</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-[500px] md:h-[650px] bg-gold border-4 border-emerald shadow-[16px_16px_0px_var(--color-emerald)] relative overflow-hidden flex items-center justify-center p-8 md:p-12">
          <div className="absolute inset-0 map-dots opacity-20"></div>
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              className="w-24 h-24 md:w-32 md:h-32 bg-emerald rounded-full flex items-center justify-center border-4 border-white mb-8"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <MapPin className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </motion.div>
            <p className="font-heading text-4xl md:text-5xl text-center leading-[0.9] text-emerald">
              Visítanos y prueba la <br />
              <span className="text-emerald text-6xl md:text-7xl uppercase underline decoration-4 underline-offset-8">diferencia</span>
            </p>
            <button className="mt-12 bg-emerald text-white font-heading text-2xl md:text-3xl px-12 md:px-16 py-4 md:py-6 brutalist-border hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
              Cómo llegar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-emerald py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <h2 className="font-heading text-3xl md:text-4xl text-gold uppercase">La Bodega Local</h2>
          <p className="text-white text-xl md:text-2xl mt-2 font-body">© 2024 - Tradición, salud y frescura.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-gold hover:scale-125 transition-transform"><Instagram size={32} /></a>
          <a href="#" className="text-gold hover:scale-125 transition-transform"><Facebook size={32} /></a>
          <a href="#" className="text-gold hover:scale-125 transition-transform"><MessageCircle size={32} /></a>
        </div>
      </div>
    </footer>
  )
}

// --- Main App ---

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main className="relative w-full overflow-hidden">
      <Navbar />
      <Hero />
      <Seasonal />
      <About />
      <Location />
      <Footer />
    </main>
  )
}

export default App
