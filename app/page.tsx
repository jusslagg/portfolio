"use client"

import type React from "react"

import { useState, useEffect, useRef, lazy } from "react"
import { useTheme } from "next-themes"
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Gamepad2,
  BookOpen,
  Sparkles,
  Zap,
  Coffee,
  Brain,
  Rocket,
  Target,
  Trophy,
  Download,
  Sun,
  Moon,
  Menu,
  X,
  Flame,
  Lightbulb,
  Music,
  Wifi,
  WifiOff,
  Smartphone,
  Monitor,
  Gamepad,
  Wand2,
  Fingerprint,
  Scan,
  ShieldCheck,
  Heart,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAnalytics } from "@/hooks/use-analytics"
import { AnimatedSection } from "@/components/animated-section"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Lazy load heavy components
const LazyProjectGallery = lazy(() => import("@/components/project-gallery"))
// const LazySkillsConstellation = lazy(() => import("@/components/skills-constellation"))

export default function Portfolio() {
  const [currentCertificate, setCurrentCertificate] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentBlogPost, setCurrentBlogPost] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")

  // Easter Eggs State
  const [easterEggs, setEasterEggs] = useState({
    konami: false,
    secretClick: false,
    longScroll: false,
    rapidClick: false,
    nightOwl: false,
    developer: false,
  })
  const [konamiCode, setKonamiCode] = useState<string[]>([])
  const [clickCount, setClickCount] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [stats, setStats] = useState({
    projects: 0,
    certificates: 0,
    coffees: 0,
    codeLines: 0,
  })

  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const { trackEvent, trackPageView } = useAnalytics()
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const rapidClickTimer = useRef<NodeJS.Timeout | null>(null)

  // Konami Code sequence
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

  // PWA Installation
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    trackEvent({
      action: "pwa_install",
      category: "Engagement",
      label: outcome,
    })

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  // Device Detection
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      if (width < 768) setDeviceType("mobile")
      else if (width < 1024) setDeviceType("tablet")
      else setDeviceType("desktop")
    }

    detectDevice()
    window.addEventListener("resize", detectDevice)
    return () => window.removeEventListener("resize", detectDevice)
  }, [])

  // Online/Offline Detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast({
        title: "🌐 Conexión Restaurada",
        description: "¡Volviste a estar online!",
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast({
        title: "📱 Modo Offline",
        description: "El portfolio funciona sin conexión",
      })
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [toast])

  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsVisible(true)
      trackPageView("/")
    }, 3000)
    return () => clearTimeout(timer)
  }, [trackPageView])

  // Scroll effects and Easter Eggs
  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY
      setScrollY(newScrollY)

      // Long scroll easter egg
      if (newScrollY > 5000 && !easterEggs.longScroll) {
        setEasterEggs((prev) => ({ ...prev, longScroll: true }))
        toast({
          title: "🏔️ ¡Explorador Incansable!",
          description: "Has desbloqueado el easter egg del scroll infinito",
        })
        trackEvent({
          action: "easter_egg_found",
          category: "Engagement",
          label: "Long Scroll",
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [easterEggs.longScroll, toast, trackEvent])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Night Owl Easter Egg
  useEffect(() => {
    const checkNightOwl = () => {
      const hour = new Date().getHours()
      if ((hour >= 23 || hour <= 5) && !easterEggs.nightOwl) {
        setEasterEggs((prev) => ({ ...prev, nightOwl: true }))
        toast({
          title: "🦉 ¡Búho Nocturno!",
          description: "Visitando mi portfolio de madrugada. ¡Eres dedicado!",
        })
        trackEvent({
          action: "easter_egg_found",
          category: "Engagement",
          label: "Night Owl",
        })
      }
    }

    checkNightOwl()
    const interval = setInterval(checkNightOwl, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [easterEggs.nightOwl, toast, trackEvent])

  // Konami Code Easter Egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...konamiCode, e.code].slice(-10)
      setKonamiCode(newSequence)

      if (newSequence.join(",") === konamiSequence.join(",")) {
        setEasterEggs((prev) => ({ ...prev, konami: true, developer: true }))
        toast({
          title: "🎮 ¡KONAMI CODE ACTIVADO!",
          description: "¡Eres un verdadero gamer! Modo desarrollador desbloqueado.",
        })
        trackEvent({
          action: "easter_egg_found",
          category: "Engagement",
          label: "Konami Code",
        })
        // Trigger special effects
        document.body.style.animation = "rainbow 3s infinite"
        setTimeout(() => {
          document.body.style.animation = ""
        }, 10000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiCode, easterEggs.konami, toast, trackEvent])

  // Rapid Click Easter Egg
  const handleRapidClick = () => {
    setClickCount((prev) => prev + 1)

    if (rapidClickTimer.current) {
      clearTimeout(rapidClickTimer.current)
    }

    rapidClickTimer.current = setTimeout(() => {
      if (clickCount >= 10 && !easterEggs.rapidClick) {
        setEasterEggs((prev) => ({ ...prev, rapidClick: true }))
        toast({
          title: "⚡ ¡Click Master!",
          description: "¡10 clicks rápidos! Tienes dedos de velocista.",
        })
        trackEvent({
          action: "easter_egg_found",
          category: "Engagement",
          label: "Rapid Click",
        })
      }
      setClickCount(0)
    }, 2000)
  }

  // Secret Click Easter Egg
  const handleSecretClick = () => {
    if (!easterEggs.secretClick) {
      setEasterEggs((prev) => ({ ...prev, secretClick: true }))
      toast({
        title: "🕵️ ¡Secreto Encontrado!",
        description: "Has encontrado el click secreto. ¡Bien hecho!",
      })
      trackEvent({
        action: "easter_egg_found",
        category: "Engagement",
        label: "Secret Click",
      })
    }
  }

  // Auto-rotate testimonials and blog posts
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    const blogTimer = setInterval(() => {
      setCurrentBlogPost((prev) => (prev + 1) % blogPosts.length)
    }, 8000)

    return () => {
      clearInterval(testimonialTimer)
      clearInterval(blogTimer)
    }
  }, [])

  // Animated stats
  useEffect(() => {
    if (!isVisible) return

    const animateStats = () => {
      const targets = { projects: 25, certificates: 10, coffees: 1247, codeLines: 50000 }
      const duration = 2000
      const steps = 60
      const stepTime = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setStats({
          projects: Math.floor(targets.projects * easeOut),
          certificates: Math.floor(targets.certificates * easeOut),
          coffees: Math.floor(targets.coffees * easeOut),
          codeLines: Math.floor(targets.codeLines * easeOut),
        })

        if (step >= steps) clearInterval(timer)
      }, stepTime)
    }

    const timer = setTimeout(animateStats, 1000)
    return () => clearTimeout(timer)
  }, [isVisible])

 const certificates = [
  {
    name: "React Js",
    institution: "Coderhouse",
    color: "from-cyan-400 via-blue-500 to-indigo-600",
    icon: "⚛️",
    link: "https://drive.google.com/file/d/14YnxBA046sILa2_sN3WtMt5Ujg-Vd-PY/view?usp=sharing",
  },
  {
    name: "Inglés para el mundo digital",
    institution: "Coderhouse",
    color: "from-emerald-400 via-teal-500 to-cyan-600",
    icon: "🌍",
    link: "https://drive.google.com/file/d/1TSnM8cndIieEkyQ9sJD8cBXrFkSYdiLx/view?usp=sharing",
  },
  {
    name: "Desarrollo avanzado de Backend",
    institution: "Coderhouse",
    color: "from-purple-400 via-pink-500 to-rose-600",
    icon: "🔧",
    link: "https://drive.google.com/file/d/1LRl7YqPrhlsJ7yOaLwJFvNagdzK6sziH/view?usp=sharing",
  },
  {
    name: "IA: Prompt Engineering",
    institution: "Coderhouse",
    color: "from-orange-400 via-red-500 to-pink-600",
    icon: "🤖",
    link: "https://drive.google.com/file/d/1rmbXtPjvpWt2wAUFI3de385sRy6Bkwdq/view?usp=sharing",
  },
  {
    name: "Programación con Java",
    institution: "Coderhouse",
    color: "from-amber-400 via-orange-500 to-red-600",
    icon: "☕",
    link: "https://drive.google.com/file/d/1JxIMsPUokobhzyITC9S1RN7RM8O6s8Rn/view?usp=sharing",
  },
  {
    name: "Backend II: Diseño y Arquitectura",
    institution: "Coderhouse",
    color: "from-teal-400 via-blue-500 to-indigo-600",
    icon: "🏗️",
    link: "https://drive.google.com/file/d/18Tn4jmcH9qOLHxqF9LR36Qf0iGOtY7ps/view?usp=sharing",
  },
  {
    name: "Photoshop e Illustrator",
    institution: "Coderhouse",
    color: "from-pink-400 via-rose-500 to-red-600",
    icon: "🎨",
    link: "https://drive.google.com/file/d/1hZMEaVitMqqJ4SjFaiZ-ItiQCsB7Yhab/view?usp=sharing",
  },
  {
    name: "Backend III: Testing y Escalabilidad",
    institution: "Coderhouse",
    color: "from-violet-400 via-purple-500 to-indigo-600",
    icon: "🧪",
    link: "https://drive.google.com/file/d/1KjYkDduozg6BFFE6HKcW-Jx2ERViGqgX/view?usp=sharing",
  },
  {
    name: "Next Js",
    institution: "Coderhouse",
    color: "from-gray-400 via-slate-500 to-gray-700",
    icon: "▲",
    link: "https://drive.google.com/file/d/1pvBxKX2xm0Os-hj29678KFGfNZhClvQc/view?usp=sharing",
  },
  {
    name: "Inglés Nivel Advanced",
    institution: "Coderhouse",
    color: "from-green-400 via-emerald-500 to-teal-600",
    icon: "🎓",
    link: "https://drive.google.com/file/d/1sfhCxMnb1HH6sX6HAgbRrrjQJGVDvhs7/view?usp=sharing",
  },
];


  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "Plataforma completa de comercio electrónico con React, Node.js y MongoDB. Incluye carrito de compras, pagos con Stripe y panel de administración.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      image: "/placeholder.svg?height=300&width=500",
      demo: "#",
      github: "#",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Task Management App",
      description:
        "Aplicación de gestión de tareas con autenticación JWT, tiempo real con Socket.io y notificaciones push.",
      tech: ["Next.js", "TypeScript", "Prisma", "Socket.io", "PostgreSQL"],
      image: "/placeholder.svg?height=300&width=500",
      demo: "#",
      github: "#",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "AI Chat Interface",
      description:
        "Interfaz de chat con IA utilizando prompt engineering avanzado, streaming de respuestas y historial conversacional.",
      tech: ["React", "OpenAI API", "Tailwind", "Framer Motion", "WebSocket"],
      image: "/placeholder.svg?height=300&width=500",
      demo: "#",
      github: "#",
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: "Gaming Community Platform",
      description: "Plataforma social para gamers con sistema de torneos, rankings en tiempo real y chat grupal.",
      tech: ["Next.js", "PostgreSQL", "Redis", "WebSocket", "Docker"],
      image: "/placeholder.svg?height=300&width=500",
      demo: "#",
      github: "#",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Digital Library System",
      description: "Sistema de biblioteca digital con recomendaciones IA, búsqueda avanzada y sistema de préstamos.",
      tech: ["React", "Python", "FastAPI", "TensorFlow", "Elasticsearch"],
      image: "/placeholder.svg?height=300&width=500",
      demo: "#",
      github: "#",
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      title: "Crypto Trading Dashboard",
      description:
        "Dashboard en tiempo real para trading de criptomonedas con gráficos interactivos y alertas automáticas.",
      tech: ["Vue.js", "Node.js", "WebSocket", "Chart.js", "Redis"],
      image: "/placeholder.svg?height=300&width=500",
      demo: "#",
      github: "#",
      gradient: "from-yellow-500 to-orange-600",
    },
  ]

  const blogPosts = [
    {
      title: "El Futuro del Desarrollo Web: Tendencias 2024",
      excerpt:
        "Exploramos las tecnologías emergentes que están revolucionando el desarrollo web, desde Web3 hasta IA generativa.",
      date: "15 Dic 2024",
      readTime: "8 min",
      views: "2.3k",
      likes: 156,
      image: "/placeholder.svg?height=200&width=400",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Optimización de Performance en React: Guía Completa",
      excerpt:
        "Técnicas avanzadas para optimizar aplicaciones React, incluyendo lazy loading, memoización y code splitting.",
      date: "10 Dic 2024",
      readTime: "12 min",
      views: "4.1k",
      likes: 289,
      image: "/placeholder.svg?height=200&width=400",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Arquitectura de Microservicios con Node.js",
      excerpt: "Cómo diseñar y implementar una arquitectura de microservicios escalable usando Node.js y Docker.",
      date: "5 Dic 2024",
      readTime: "15 min",
      views: "3.7k",
      likes: 234,
      image: "/placeholder.svg?height=200&width=400",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "IA en el Desarrollo: Prompt Engineering Práctico",
      excerpt: "Guía práctica para integrar IA en tus proyectos de desarrollo usando técnicas de prompt engineering.",
      date: "1 Dic 2024",
      readTime: "10 min",
      views: "5.2k",
      likes: 412,
      image: "/placeholder.svg?height=200&width=400",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  const testimonials = [
    {
      name: "María González",
      role: "Product Manager",
      company: "TechCorp",
      text: "Jesús transformó completamente nuestra visión en una realidad digital increíble. Su atención al detalle y capacidad para resolver problemas complejos es excepcional.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
    {
      name: "Carlos Ruiz",
      role: "CTO",
      company: "StartupXYZ",
      text: "La capacidad de Jesús para resolver problemas complejos y crear soluciones elegantes es impresionante. Un verdadero profesional del desarrollo fullstack.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
    {
      name: "Ana Martín",
      role: "UX Designer",
      company: "Creative Studio",
      text: "Trabajar con Jesús fue una experiencia fantástica. Entiende perfectamente la intersección entre diseño y desarrollo, creando interfaces hermosas y funcionales.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
    {
      name: "Roberto Silva",
      role: "Founder",
      company: "InnovateLab",
      text: "Jesús no solo entrega código de calidad, sino que aporta ideas innovadoras que mejoran significativamente el producto final. Altamente recomendado.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
  ]

  const skills = [
    { name: "React", level: 95, color: "bg-gradient-to-r from-cyan-500 to-blue-600", icon: "⚛️" },
    { name: "Next.js", level: 90, color: "bg-gradient-to-r from-gray-700 to-gray-900", icon: "▲" },
    { name: "Node.js", level: 88, color: "bg-gradient-to-r from-green-500 to-emerald-600", icon: "🟢" },
    { name: "TypeScript", level: 75, color: "bg-gradient-to-r from-blue-600 to-indigo-700", icon: "📘" },
    { name: "Java", level: 85, color: "bg-gradient-to-r from-orange-500 to-red-600", icon: "☕" },
    { name: "Python", level: 80, color: "bg-gradient-to-r from-yellow-500 to-green-600", icon: "🐍" },
    { name: "MongoDB", level: 87, color: "bg-gradient-to-r from-green-600 to-teal-700", icon: "🍃" },
    { name: "Docker", level: 78, color: "bg-gradient-to-r from-blue-400 to-cyan-600", icon: "🐳" },
    { name: "JavaScript", level: 92, color: "bg-gradient-to-r from-yellow-400 to-amber-500", icon: "🟨" },
    { name: "IA", level: 85, color: "bg-gradient-to-r from-purple-500 to-violet-700", icon: "🤖" },
  ]

  const timeline = [
    {
      year: "2024",
      title: "Certificación Fullstack Developer",
      description: "Completé mi formación integral en Coderhouse con 10 certificaciones especializadas",
      icon: "🎓",
      color: "from-blue-500 to-purple-600",
    },
    {
      year: "2023",
      title: "Especialización en Backend Avanzado",
      description: "Profundicé en arquitecturas escalables, testing y optimización de performance",
      icon: "🔧",
      color: "from-purple-500 to-pink-600",
    },
    {
      year: "2023",
      title: "Incursión en Inteligencia Artificial",
      description: "Exploré el mundo del Prompt Engineering y desarrollo de aplicaciones con IA",
      icon: "🤖",
      color: "from-orange-500 to-red-600",
    },
    {
      year: "2022",
      title: "Dominio del Frontend Moderno",
      description: "Masterización de React, Next.js y tecnologías frontend de vanguardia",
      icon: "⚛️",
      color: "from-cyan-500 to-blue-600",
    },
  ]

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    trackEvent({
      action: "form_submit",
      category: "Contact",
      label: "Contact Form",
    })

    // Simulate form submission
    toast({
      title: "🚀 ¡Mensaje Enviado!",
      description: "Gracias por contactarme. Te responderé pronto.",
    })

    formRef.current?.reset()
  }

  const nextCertificate = () => {
    setCurrentCertificate((prev) => (prev + 1) % certificates.length)
    trackEvent({
      action: "navigate",
      category: "Certificates",
      label: "Next Certificate",
    })
  }

  const prevCertificate = () => {
    setCurrentCertificate((prev) => (prev - 1 + certificates.length) % certificates.length)
    trackEvent({
      action: "navigate",
      category: "Certificates",
      label: "Previous Certificate",
    })
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying)
    toast({
      title: musicPlaying ? "🔇 Música Pausada" : "🎵 Música Activada",
      description: musicPlaying ? "Modo silencioso activado" : "¡Disfruta del ambiente!",
    })
    trackEvent({
      action: "toggle_music",
      category: "Interaction",
      label: musicPlaying ? "Pause" : "Play",
    })
  }

  // Count found easter eggs
  const foundEasterEggs = Object.values(easterEggs).filter(Boolean).length

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="w-24 h-24 border-4 border-blue-500 border-b-transparent rounded-full animate-spin absolute top-4 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-16 h-16 border-4 border-pink-500 border-l-transparent rounded-full animate-spin absolute top-8 left-1/2 transform -translate-x-1/2"></div>
            <Code className="w-12 h-12 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Cargando Portfolio Épico...
          </h2>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
          <p className="text-gray-400 mb-2">Preparando experiencia extraordinaria...</p>
          <div className="text-sm text-purple-300">
            {deviceType === "mobile" && "📱 Optimizado para móvil"}
            {deviceType === "tablet" && "📱 Optimizado para tablet"}
            {deviceType === "desktop" && "💻 Experiencia completa de escritorio"}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 overflow-x-hidden transition-colors duration-500">
      {/* Performance Monitor (Development only) */}
      <PerformanceMonitor />

      {/* Custom Cursor */}
      <div
        className="fixed w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 opacity-80"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-40">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${(scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-4 right-4 z-40 flex gap-2">
        {/* Online/Offline Indicator */}
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
            isOnline
              ? "bg-green-500/20 text-green-700 dark:text-green-300"
              : "bg-red-500/20 text-red-700 dark:text-red-300"
          }`}
        >
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {isOnline ? "Online" : "Offline"}
        </div>

        {/* Device Type Indicator */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm text-sm font-medium">
          {deviceType === "mobile" && <Smartphone className="w-4 h-4" />}
          {deviceType === "tablet" && <Smartphone className="w-4 h-4" />}
          {deviceType === "desktop" && <Monitor className="w-4 h-4" />}
        </div>

        {/* PWA Install Button */}
        {showInstallPrompt && (
          <Button
            onClick={handleInstallPWA}
            size="sm"
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            📱 Instalar App
          </Button>
        )}

        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          size="icon"
          variant="outline"
          className="bg-white/10 dark:bg-black/10 backdrop-blur-sm border-white/20 dark:border-gray-700 hover:scale-110 transition-all"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        <Button
          onClick={toggleMusic}
          size="icon"
          variant="outline"
          className={`bg-white/10 dark:bg-black/10 backdrop-blur-sm border-white/20 dark:border-gray-700 hover:scale-110 transition-all ${musicPlaying ? "text-green-500" : ""}`}
        >
          <Music className="w-4 h-4" />
        </Button>

        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          size="icon"
          variant="outline"
          className="bg-white/10 dark:bg-black/10 backdrop-blur-sm border-white/20 dark:border-gray-700 hover:scale-110 transition-all md:hidden"
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </nav>

      {/* Easter Eggs Counter */}
      {foundEasterEggs > 0 && (
        <div className="fixed top-4 left-4 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
          🎮 Easter Eggs: {foundEasterEggs}/6
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-110 transition-transform shadow-lg animate-pulse"
          asChild
          onClick={handleRapidClick}
        >
          <a href="mailto:lagg312@gmail.com">
            <Mail className="w-6 h-6" />
          </a>
        </Button>

        {/* Secret Easter Egg Button */}
        <div className="w-4 h-4 bg-transparent cursor-pointer" onClick={handleSecretClick} title="🤫" />

        {/* Easter Egg Buttons */}
        {easterEggs.konami && (
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-110 transition-transform shadow-lg animate-bounce"
            onClick={() => toast({ title: "🎮 ¡Modo Desarrollador Activado!", description: "¡Eres increíble!" })}
          >
            <Gamepad className="w-5 h-5" />
          </Button>
        )}

        {easterEggs.longScroll && (
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-110 transition-transform shadow-lg animate-bounce"
            onClick={() => toast({ title: "🏔️ ¡Explorador!", description: "¡Scroll infinito desbloqueado!" })}
          >
            <Target className="w-5 h-5" />
          </Button>
        )}

        {easterEggs.rapidClick && (
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:scale-110 transition-transform shadow-lg animate-bounce"
            onClick={() => toast({ title: "⚡ ¡Click Master!", description: "¡Dedos de velocista!" })}
          >
            <Zap className="w-5 h-5" />
          </Button>
        )}

        {easterEggs.nightOwl && (
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-110 transition-transform shadow-lg animate-bounce"
            onClick={() => toast({ title: "🦉 ¡Búho Nocturno!", description: "¡Madrugador dedicado!" })}
          >
            <Moon className="w-5 h-5" />
          </Button>
        )}

        {easterEggs.secretClick && (
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-110 transition-transform shadow-lg animate-bounce"
            onClick={() => toast({ title: "🕵️ ¡Detective!", description: "¡Secreto encontrado!" })}
          >
            <Scan className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Hero Section */}
      <AnimatedSection animation="fadeIn">
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20"
              style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            />
            {[...Array(200)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  transform: `translateY(${scrollY * (Math.random() * 0.5)}px)`,
                }}
              >
                <Sparkles className="w-2 h-2 text-purple-400 dark:text-purple-300" />
              </div>
            ))}
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[Code, Gamepad2, BookOpen, Coffee, Brain, Rocket, Lightbulb, Flame, Wand2, ShieldCheck].map((Icon, i) => (
              <Icon
                key={i}
                className="absolute text-purple-400/20 dark:text-purple-400/30 animate-bounce"
                size={32}
                style={{
                  left: `${10 + i * 10}%`,
                  top: `${10 + (i % 4) * 25}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${4 + i * 0.3}s`,
                }}
              />
            ))}
          </div>

          <div
            className={`relative z-10 text-center px-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transform: `translateY(${scrollY * -0.3}px)` }}
          >
            <div className="mb-8">
              <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-2 animate-spin-slow">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                  <div className="relative">
                    <Code className="w-24 h-24 text-blue-500 dark:text-blue-400 animate-pulse" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full animate-ping flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    </div>
                    {easterEggs.developer && (
                      <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-yellow-500 rounded-full animate-bounce flex items-center justify-center">
                        <Fingerprint className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative mb-6">
                <h1 className="text-6xl md:text-9xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  Jesús Gil
                </h1>
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 blur-3xl -z-10 animate-pulse"></div>
              </div>

              <div className="relative mb-8">
                <p className="text-3xl md:text-4xl text-purple-600 dark:text-purple-300 mb-4 font-semibold">
                  Desarrollador Web Fullstack
                </p>
                <div className="flex justify-center items-center gap-3 text-xl text-gray-600 dark:text-gray-400 flex-wrap">
                  <Zap className="w-6 h-6 text-yellow-500 animate-bounce" />
                  <span>Creando el futuro, una línea de código a la vez</span>
                  <Zap className="w-6 h-6 text-yellow-500 animate-bounce" />
                </div>
                {easterEggs.developer && (
                  <div className="mt-4 text-lg text-green-500 dark:text-green-400 animate-pulse">
                    🎮 MODO DESARROLLADOR ACTIVADO 🎮
                  </div>
                )}
              </div>

              <div className="max-w-4xl mx-auto text-gray-700 dark:text-gray-300 text-xl leading-relaxed mb-12">
                <div className="bg-white/60 dark:bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-purple-200 dark:border-purple-500/20 shadow-xl">
                  <p className="mb-6 flex items-center justify-center gap-3 flex-wrap">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-blue-500 animate-pulse" />
                      <span>Lector apasionado</span>
                    </span>
                    <span className="text-purple-500">•</span>
                    <span className="flex items-center gap-2">
                      <Gamepad2 className="w-6 h-6 text-purple-500 animate-pulse" />
                      <span>Gamer de corazón</span>
                    </span>
                    <span className="text-purple-500">•</span>
                    <span className="flex items-center gap-2">
                      <Code className="w-6 h-6 text-green-500 animate-pulse" />
                      <span>Creador de código</span>
                    </span>
                  </p>
                  <p className="text-2xl font-medium">
                    A los 34 años, transformo ideas en experiencias digitales extraordinarias.
                    <br className="hidden md:block" />
                    Cada proyecto es una nueva aventura, cada bug un boss final por derrotar.
                  </p>
                  {foundEasterEggs > 0 && (
                    <p className="mt-4 text-lg text-purple-600 dark:text-purple-400">
                      🎯 Has encontrado {foundEasterEggs}/6 easter eggs. ¡Sigue explorando!
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-110 transition-all shadow-xl text-lg px-8"
                onClick={() => trackEvent({ action: "click", category: "CTA", label: "Contact Button" })}
              >
                <a href="#contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Hablemos
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white bg-white/50 dark:bg-transparent transform hover:scale-110 transition-all shadow-xl text-lg px-8"
              >
                <a href="https://github.com/jusslagg" target="_blank" rel="noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white bg-white/50 dark:bg-transparent transform hover:scale-110 transition-all shadow-xl text-lg px-8"
              >
                <a href="https://www.linkedin.com/in/jesusgilgonzalez/" target="_blank" rel="noreferrer">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-600 dark:text-green-400 hover:bg-green-500 hover:text-white bg-white/50 dark:bg-transparent transform hover:scale-110 transition-all shadow-xl text-lg px-8"
              >
                <Download className="w-5 h-5 mr-2" />
                CV
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-8 h-12 border-2 border-purple-500 dark:border-purple-400 rounded-full flex justify-center">
                <div className="w-2 h-4 bg-purple-500 dark:bg-purple-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Stats Section with Smooth Transition */}
      <AnimatedSection animation="slideUp" delay={200}>
        <section className="py-32 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-black/20 to-transparent"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  label: "Proyectos",
                  value: stats.projects,
                  icon: Rocket,
                  color: "text-blue-600 dark:text-blue-400",
                  bg: "from-blue-500 to-cyan-500",
                },
                {
                  label: "Certificados",
                  value: stats.certificates,
                  icon: Trophy,
                  color: "text-purple-600 dark:text-purple-400",
                  bg: "from-purple-500 to-pink-500",
                },
                {
                  label: "Cafés",
                  value: stats.coffees,
                  icon: Coffee,
                  color: "text-orange-600 dark:text-orange-400",
                  bg: "from-orange-500 to-red-500",
                },
                {
                  label: "Líneas de Código",
                  value: stats.codeLines,
                  icon: Code,
                  color: "text-green-600 dark:text-green-400",
                  bg: "from-green-500 to-emerald-500",
                },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div
                      className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${stat.bg} p-4 group-hover:scale-110 transition-transform shadow-xl`}
                    >
                      <stat.icon className="w-full h-full text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                  </div>
                  <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3`}>
                    {stat.value.toLocaleString()}
                    {stat.label === "Líneas de Código" && "+"}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* About Me Section */}
      <AnimatedSection animation="slideLeft" delay={300}>
        <section
          ref={aboutRef}
          className="py-32 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold text-center text-gray-900 dark:text-white mb-20">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sobre Mí
              </span>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
            </h2>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="bg-white/80 dark:bg-gradient-to-br dark:from-purple-900/50 dark:to-blue-900/50 backdrop-blur-sm rounded-3xl p-10 border border-purple-200 dark:border-purple-500/20 shadow-2xl">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    Mi Historia
                  </h3>
                  <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    <p>
                      🎮 <strong className="text-purple-600 dark:text-purple-400">Gamer desde la infancia:</strong> Los
                      videojuegos me enseñaron lógica, resolución de problemas y perseverancia. Cada nivel completado
                      era una lección de programación.
                    </p>
                    <p>
                      📚 <strong className="text-blue-600 dark:text-blue-400">Lector voraz:</strong> La literatura
                      expandió mi creatividad y me enseñó que cada historia tiene una estructura, igual que el código.
                    </p>
                    <p>
                      💻 <strong className="text-green-600 dark:text-green-400">Creador nato:</strong> Combino la lógica
                      de los juegos, la narrativa de los libros y la magia del código para crear experiencias digitales
                      únicas.
                    </p>
                    <p>
                      ☕ <strong className="text-orange-600 dark:text-orange-400">Filosofía:</strong> "El mejor código
                      es como una buena historia: elegante, comprensible y memorable."
                    </p>
                  </div>
                </div>
                <div className="absolute -inset-6 bg-gradient-to-r from-purple-600/10 to-blue-600/10 dark:from-purple-600/20 dark:to-blue-600/20 blur-3xl -z-10 animate-pulse"></div>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: Target,
                    title: "Mi Misión",
                    description:
                      "Transformar ideas complejas en soluciones digitales elegantes y funcionales que impacten positivamente en la vida de las personas.",
                    gradient: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Heart,
                    title: "Mi Pasión",
                    description:
                      "Crear experiencias que conecten emocionalmente con los usuarios y resuelvan problemas reales del mundo digital.",
                    gradient: "from-pink-500 to-rose-500",
                  },
                  {
                    icon: Rocket,
                    title: "Mi Visión",
                    description:
                      "Ser parte de la revolución digital que está transformando la forma en que interactuamos con la tecnología.",
                    gradient: "from-green-500 to-emerald-500",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/80 dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-purple-500/20 transform hover:scale-105 transition-all shadow-xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center`}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Certificates Carousel */}
      <AnimatedSection animation="scaleIn" delay={500}>
        <section className="py-32 px-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-900 dark:text-white mb-20">
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Certificaciones
              </span>
              <div className="w-32 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mt-6 rounded-full"></div>
            </h2>

            <div className="relative">
              <div className="flex items-center justify-center">
                <Button
                  onClick={prevCertificate}
                  variant="outline"
                  size="icon"
                  className="absolute left-4 z-10 bg-white/90 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 text-gray-900 dark:text-white transform hover:scale-110 transition-all shadow-xl border-2"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <div className="flex gap-6 overflow-hidden max-w-6xl">
                  {[-2, -1, 0, 1, 2].map((offset) => {
                    const index = (currentCertificate + offset + certificates.length) % certificates.length
                    const cert = certificates[index]
                    const isCenter = offset === 0
                    const isAdjacent = Math.abs(offset) === 1

                    return (
                      <Card
                        key={index}
                        className={`transition-all duration-700 ${
                          isCenter
                            ? "scale-110 z-20 shadow-2xl shadow-purple-500/25"
                            : isAdjacent
                              ? "scale-95 z-10 opacity-80"
                              : "scale-75 opacity-40"
                        } min-w-[320px] transform hover:scale-105 border-0 overflow-hidden`}
                      >
                        <CardContent className="p-0">
                          <div
                            className={`h-60 bg-gradient-to-br ${cert.color} p-8 text-white relative overflow-hidden`}
                          >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 animate-pulse"></div>
                            <div className="absolute top-6 right-6 text-4xl animate-bounce">{cert.icon}</div>

                            <div className="relative z-10">
                              <h3 className="text-2xl font-bold mb-3 leading-tight">{cert.name}</h3>
                              <p className="text-white/90 mb-6 text-lg">{cert.institution}</p>
                              <div className="absolute bottom-6 right-6">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                  <Trophy className="w-10 h-10" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <Button
                  onClick={nextCertificate}
                  variant="outline"
                  size="icon"
                  className="absolute right-4 z-10 bg-white/90 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 text-gray-900 dark:text-white transform hover:scale-110 transition-all shadow-xl border-2"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex justify-center mt-10 gap-3">
                {certificates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCertificate(index)}
                    className={`h-4 rounded-full transition-all ${
                      index === currentCertificate
                        ? "bg-orange-500 w-12"
                        : "bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 w-4"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Skills Constellation */}
      <AnimatedSection animation="rotateIn" delay={600}>
        <section className="py-32 px-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-900 dark:text-white mb-20">
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Constelación de Habilidades
              </span>
              <div className="w-32 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="bg-white/90 dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 transform hover:scale-105 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{skill.icon}</span>
                        <span className="text-gray-900 dark:text-white font-bold text-xl">{skill.name}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 font-mono text-xl font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full ${skill.color} transition-all duration-1000 ease-out relative`}
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Projects Gallery */}
      <AnimatedSection animation="slideUp" delay={700}>
        <section className="py-32 px-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-900 dark:text-white mb-20">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Galería de Proyectos
              </span>
              <div className="w-32 h-2 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden bg-white/90 dark:bg-slate-800/30 backdrop-blur-sm border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-500 transform hover:scale-105 hover:rotate-1 shadow-xl border-0"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                    />

                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30"
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noreferrer">
                          <Play className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>

                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-purple-100 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-600/30 transition-colors px-3 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Section - Simplified for now */}
      <AnimatedSection animation="fadeIn" delay={400}>
        <section
          id="contact"
          className="py-32 px-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10"
        >
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-6xl font-bold text-gray-900 dark:text-white mb-12">
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                ¿Listo para crear magia juntos?
              </span>
            </h2>
            <p className="text-2xl text-gray-700 dark:text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto">
              Tengo las herramientas, la pasión y las ganas de convertir tu visión en realidad digital.
              <br />
              ¡Hablemos y creemos algo extraordinario!
            </p>

            <div className="flex justify-center gap-8 flex-wrap">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-110 transition-all shadow-xl text-lg px-8"
              >
                <a href="mailto:lagg312@gmail.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Directo
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white bg-white/50 dark:bg-transparent transform hover:scale-110 transition-all shadow-xl text-lg px-8"
              >
                <a href="https://www.linkedin.com/in/jesusgilgonzalez/" target="_blank" rel="noreferrer">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-500 text-gray-600 dark:text-gray-400 hover:bg-gray-500 hover:text-white bg-white/50 dark:bg-transparent transform hover:scale-110 transition-all shadow-xl text-lg px-8"
              >
                <a href="https://github.com/jusslagg" target="_blank" rel="noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-gray-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Jesús Gil
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Desarrollador Fullstack • Creador Digital • Solucionador de Problemas
            </p>
            <div className="flex justify-center gap-8">
              <a
                href="mailto:lagg312@gmail.com"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors transform hover:scale-110"
              >
                <Mail className="w-8 h-8" />
              </a>
              <a
                href="https://github.com/jusslagg"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors transform hover:scale-110"
              >
                <Github className="w-8 h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/jesusgilgonzalez/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors transform hover:scale-110"
              >
                <Linkedin className="w-8 h-8" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">&copy; 2024 Jesús Gil. Hecho con ❤️, ☕ y mucho código.</p>
              <p className="text-base italic">"El código es poesía que las máquinas pueden entender"</p>
              {foundEasterEggs > 0 && (
                <p className="text-purple-500 dark:text-purple-400 mt-2 animate-pulse">
                  🎮 Easter Eggs Encontrados: {foundEasterEggs}/6 ¡Eres increíble!
                </p>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
