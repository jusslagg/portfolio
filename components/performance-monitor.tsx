"use client"

import { useEffect, useState } from "react"
import { useAnalytics } from "@/hooks/use-analytics"

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<{
    fcp?: number
    lcp?: number
    cls?: number
    fid?: number
  }>({})
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case "paint":
            if (entry.name === "first-contentful-paint") {
              setMetrics((prev) => ({ ...prev, fcp: entry.startTime }))
              trackEvent({
                action: "timing",
                category: "Performance",
                label: "First Contentful Paint",
                value: Math.round(entry.startTime),
              })
            }
            break
          case "largest-contentful-paint":
            setMetrics((prev) => ({ ...prev, lcp: entry.startTime }))
            trackEvent({
              action: "timing",
              category: "Performance",
              label: "Largest Contentful Paint",
              value: Math.round(entry.startTime),
            })
            break
          case "layout-shift":
            if (!(entry as any).hadRecentInput) {
              setMetrics((prev) => ({
                ...prev,
                cls: (prev.cls || 0) + (entry as any).value,
              }))
            }
            break
        }
      }
    })

    // Observe different entry types
    try {
      observer.observe({ entryTypes: ["paint", "largest-contentful-paint", "layout-shift"] })
    } catch (e) {
      console.log("Performance Observer not supported")
    }

    return () => observer.disconnect()
  }, [trackEvent])

  // Don't render anything in production
  if (process.env.NODE_ENV === "production") return null

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
      <div>FCP: {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : "..."}</div>
      <div>LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : "..."}</div>
      <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : "..."}</div>
    </div>
  )
}
