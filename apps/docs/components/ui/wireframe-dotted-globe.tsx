"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

export default function RotatingEarth({ width = 800, height = 600, className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [size, setSize] = useState(Math.min(width, height))

  // Handle responsive resize to keep dimensions square
  useEffect(() => {
    const handleResize = () => {
      setSize(Math.min(width, height, window.innerWidth - 40, window.innerHeight - 100))
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width, height])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Set up responsive dimensions - fixed square sizes to prevent stretching
    const containerWidth = size
    const containerHeight = size
    const radius = size / 2.3

    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    context.scale(dpr, dpr)

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        // Check if point is in outer ring
        if (!pointInPolygon(point, coordinates[0])) {
          return false
        }
        // Check if point is in any hole (inner rings)
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false // Point is in a hole
          }
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        // Check each polygon in the MultiPolygon
        for (const polygon of geometry.coordinates) {
          // Check if point is in outer ring
          if (pointInPolygon(point, polygon[0])) {
            // Check if point is in any hole
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) {
              return true
            }
          }
        }
        return false
      }

      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds

      const stepSize = dotSpacing * 0.08
      let pointsGenerated = 0

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
            pointsGenerated++
          }
        }
      }

      console.log(
        `[v0] Generated ${pointsGenerated} points for land feature:`,
        feature.properties?.featurecla || "Land",
      )
      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
      isGreen: boolean
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw ocean (globe background) - 3D glowing white marble gradient
      const grad = context.createRadialGradient(
        containerWidth / 2 - currentScale * 0.2,
        containerHeight / 2 - currentScale * 0.2,
        currentScale * 0.1,
        containerWidth / 2,
        containerHeight / 2,
        currentScale
      )
      grad.addColorStop(0, "rgba(255, 255, 255, 1.0)") // bright white reflection
      grad.addColorStop(0.5, "rgba(250, 250, 252, 0.95)") // clean white/light grey body
      grad.addColorStop(1, "rgba(235, 235, 240, 0.98)") // soft grey-pink shadow edge

      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = grad
      context.fill()
      context.strokeStyle = "rgba(228, 228, 231, 0.9)" // clean soft grey border
      context.lineWidth = 1.5 * scaleFactor
      context.stroke()

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "rgba(244, 63, 94, 0.06)" // very soft pink grid lines
        context.lineWidth = 0.5 * scaleFactor
        context.globalAlpha = 1
        context.stroke()

        // Draw land outlines
        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "rgba(244, 63, 94, 0.18)" // soft pink borders
        context.lineWidth = 0.8 * scaleFactor
        context.stroke()

        // Draw halftone dots - base rose dots with highlighted active green dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath()
            const dotRadius = dot.isGreen ? 1.6 * scaleFactor : 1.2 * scaleFactor
            context.arc(projected[0], projected[1], dotRadius, 0, 2 * Math.PI)
            context.fillStyle = dot.isGreen ? "#22c55e" : "rgba(244, 63, 94, 0.22)"
            context.fill()
          }
        })
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        )
        if (!response.ok) throw new Error("Failed to load land data")

        landFeatures = await response.json()

        // Generate dots for all land features
        let totalDots = 0
        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 16)
          dots.forEach(([lng, lat]) => {
            // Distance calculations to active regions
            const distanceToIndia = Math.sqrt(Math.pow(lng - 78, 2) + Math.pow(lat - 20, 2))
            const distanceToBlackburn = Math.sqrt(Math.pow(lng - (-2.4820), 2) + Math.pow(lat - 53.7480, 2))
            const distanceToSydney = Math.sqrt(Math.pow(lng - 151.2093, 2) + Math.pow(lat - (-33.8688), 2))

            const isInIndia = distanceToIndia < 11
            const isNearBlackburn = distanceToBlackburn < 2.5
            const isNearSydney = distanceToSydney < 2.5
            
            let isGreen = false
            if (isInIndia) {
              isGreen = Math.random() < 0.22
            } else if (isNearBlackburn) {
              isGreen = Math.random() < 0.45 // exactly 1 or 2 dots in UK
            } else if (isNearSydney) {
              isGreen = Math.random() < 0.45 // exactly 1 or 2 dots in Sydney
            }
            
            allDots.push({ lng, lat, visible: true, isGreen })
            totalDots++
          })
        })

        console.log(`[v0] Total dots generated: ${totalDots} across ${landFeatures.features.length} land features`)

        render()
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    // Set up rotation
    const rotation: [number, number, number] = [0, 0, 0]
    const rotationSpeed = 0.5

    const rotate = () => {
      rotation[0] += rotationSpeed
      projection.rotate(rotation)
      render()
    }

    // Auto-rotation timer
    const rotationTimer = d3.timer(rotate)

    // Load the world data
    loadWorldData()

    // Cleanup
    return () => {
      rotationTimer.stop()
    }
  }, [size])

  if (error) {
    return (
      <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
        <canvas
          ref={canvasRef}
          className="rounded-full bg-transparent"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
