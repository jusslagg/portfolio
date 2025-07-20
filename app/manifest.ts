import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jesús Gil - Desarrollador Fullstack Portfolio",
    short_name: "Jesús Gil Portfolio",
    description:
      "Portfolio profesional de Jesús Gil, Desarrollador Web Fullstack especializado en React, Next.js y tecnologías modernas",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#8b5cf6",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["portfolio", "developer", "technology"],
    lang: "es",
    dir: "ltr",
  }
}
