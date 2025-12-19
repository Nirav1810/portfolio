import React, { useRef, useEffect, useState } from 'react'

export function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const blobsRef = useRef([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)' }}
    >
      {/* Animated blobs */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          left: `${mousePos.x * 0.02}px`,
          top: `${mousePos.y * 0.02}px`,
          transition: 'all 0.1s ease-out',
          animation: 'float 15s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
          right: `${mousePos.x * 0.01}px`,
          bottom: `${mousePos.y * 0.01}px`,
          transition: 'all 0.1s ease-out',
          animation: 'float-reverse 20s ease-in-out infinite 5s',
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-25"
        style={{
          background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
          left: `${mousePos.x * 0.015}px`,
          bottom: `${mousePos.y * 0.02}px`,
          transition: 'all 0.1s ease-out',
          animation: 'float 25s ease-in-out infinite 10s',
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        
        @keyframes float-reverse {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(30px);
          }
        }
      `}</style>
    </div>
  )
}
