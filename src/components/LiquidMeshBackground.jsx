import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

function LiquidPlane({ mouseRef, scrollRef, theme }) {
  const meshRef = useRef(null)
  const { viewport } = useThree()

  const planeSize = useMemo(() => {
    const w = viewport.width * 1.4
    const h = viewport.height * 1.4
    return [w, h]
  }, [viewport.width, viewport.height])

  const uniforms = useMemo(() => {
    const isDark = theme === 'dark'
    const baseDark = new THREE.Color('#020617')
    const accentDark = new THREE.Color('#3b82f6')
    const baseLight = new THREE.Color('#0f172a')
    const accentLight = new THREE.Color('#60a5fa')
    const alphaScale = isDark ? 0.9 : 0.6

    return {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScrollStrength: { value: 0 },
      uBaseColor: { value: isDark ? baseDark : baseLight },
      uAccentColor: { value: isDark ? accentDark : accentLight },
      uAlphaScale: { value: alphaScale },
    }
  }, [theme])

  useFrame((_, delta) => {
    uniforms.uTime.value += delta

    const targetMouse = mouseRef.current
    const currentMouse = uniforms.uMouse.value
    const mouseLerp = Math.min(1, delta * 6)
    currentMouse.x += (targetMouse.x - currentMouse.x) * mouseLerp
    currentMouse.y += (targetMouse.y - currentMouse.y) * mouseLerp

    const targetScroll = scrollRef.current
    const scrollLerp = Math.min(1, delta * 4)
    uniforms.uScrollStrength.value += (targetScroll - uniforms.uScrollStrength.value) * scrollLerp
  })

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScrollStrength;

    varying vec2 vUv;
    varying float vStrength;

    float waveFn(vec2 p) {
      float t = uTime;
      float low = sin(p.x * 6.0 + t * 1.4) + sin(p.y * 5.0 - t * 1.1);
      float high = sin(p.x * 14.0 + t * 2.3) * 0.4;
      return low * 0.6 + high;
    }

    void main() {
      vUv = uv;

      vec2 centeredUv = uv - 0.5;
      float mouseDist = distance(uv, uMouse);
      float mouseInfluence = smoothstep(0.45, 0.0, mouseDist);

      float scrollInfluence = uScrollStrength;

      float edgeX = smoothstep(0.0, 0.08, uv.x) * smoothstep(0.0, 0.08, 1.0 - uv.x);
      float edgeY = smoothstep(0.0, 0.08, uv.y) * smoothstep(0.0, 0.08, 1.0 - uv.y);
      float edgeMask = edgeX * edgeY;

      float displacement = waveFn(centeredUv) * 0.25;
      displacement += mouseInfluence * 0.5;
      displacement += scrollInfluence * 0.55;

      displacement *= edgeMask;

      vStrength = displacement;

      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `

  const fragmentShader = `
    uniform vec3 uBaseColor;
    uniform vec3 uAccentColor;
    uniform float uAlphaScale;

    varying vec2 vUv;
    varying float vStrength;

    void main() {
      float intensity = abs(vStrength) * 1.8;
      float radial = length(vUv - 0.5);
      float falloff = smoothstep(0.9, 0.15, radial);

      float mixFactor = clamp(falloff + intensity * 0.7, 0.0, 1.0);
      vec3 color = mix(uBaseColor, uAccentColor, mixFactor);

      float alpha = 0.55 + intensity * 0.45;
      alpha *= falloff * uAlphaScale;

      gl_FragColor = vec4(color, alpha);
    }
  `

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[planeSize[0], planeSize[1], 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

export function LiquidMeshBackground() {
  const { theme } = useTheme()
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const scrollRef = useRef(0)

  useEffect(() => {
    let lastY = window.scrollY
    let lastTime = performance.now()

    const handleScroll = () => {
      const now = performance.now()
      const dy = window.scrollY - lastY
      const dt = now - lastTime || 16
      lastY = window.scrollY
      lastTime = now

      const velocity = Math.abs(dy) / dt
      const strength = Math.min(1, velocity * 0.6)
      scrollRef.current = strength
    }

    const handlePointerMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = 1 - e.clientY / window.innerHeight
      mouseRef.current = { x, y }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        key={theme}
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <LiquidPlane mouseRef={mouseRef} scrollRef={scrollRef} theme={theme} />
      </Canvas>
    </div>
  )
}
