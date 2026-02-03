import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export function TiltCard({ children, className = "", ...props }) {
  const ref = useRef(null)
  const scaleTimeoutRef = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let tiltX = 0
    let tiltY = 0
    let scale = 1
    let isZoomed = false

    const handleMouseEnter = () => {
      if (scaleTimeoutRef.current) {
        clearTimeout(scaleTimeoutRef.current)
      }
      scaleTimeoutRef.current = setTimeout(() => {
        scale = 1.08
        element.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.320, 1)"
        element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`
        scaleTimeoutRef.current = setTimeout(() => {
          isZoomed = true
        }, 400)
      }, 200)
    }

    const handleMouseLeave = () => {
      if (scaleTimeoutRef.current) {
        clearTimeout(scaleTimeoutRef.current)
      }
      scale = 1
      tiltX = 0
      tiltY = 0
      isZoomed = false
      element.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)"
      element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`
    }

    const handleMouseMove = (e) => {
      // Only apply tilt if zoomed
      if (!isZoomed) return

      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Calculate rotation based on distance from center
      // Maximum 20 degrees rotation
      tiltY = ((x - centerX) / centerX) * 20
      tiltX = ((centerY - y) / centerY) * 20

      // Apply transforms without transition for smooth tilt tracking
      element.style.transition = "none"
      element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      if (scaleTimeoutRef.current) {
        clearTimeout(scaleTimeoutRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      style={{
        transformStyle: "preserve-3d",
        pointerEvents: "auto",
        WebkitFontSmoothing: "antialiased",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        WebkitTransform: "translateZ(0)",
        willChange: "transform",
        transition: "transform 0.1s ease-out",
        zIndex: 1,
      }}
      onMouseEnter={() => {
        if (ref.current) ref.current.style.zIndex = "10"
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.zIndex = "1"
      }}
      className={`relative ${className}`}
      {...props}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          pointerEvents: "auto",
          WebkitFontSmoothing: "antialiased",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  )
}
