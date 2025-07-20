"use client"

import type React from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scaleIn" | "rotateIn"
  delay?: number
}

export function AnimatedSection({ children, className = "", animation = "fadeIn", delay = 0 }: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-1000 ease-out"

    if (!isIntersecting) {
      switch (animation) {
        case "fadeIn":
          return `${baseClasses} opacity-0`
        case "slideUp":
          return `${baseClasses} opacity-0 translate-y-10`
        case "slideLeft":
          return `${baseClasses} opacity-0 translate-x-10`
        case "slideRight":
          return `${baseClasses} opacity-0 -translate-x-10`
        case "scaleIn":
          return `${baseClasses} opacity-0 scale-95`
        case "rotateIn":
          return `${baseClasses} opacity-0 rotate-3 scale-95`
        default:
          return `${baseClasses} opacity-0`
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`
  }

  return (
    <section ref={ref} className={`${getAnimationClasses()} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </section>
  )
}
