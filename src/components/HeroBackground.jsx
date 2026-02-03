import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

// Shader-based interactive background (soft blobs reacting to mouse)
export function HeroBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer, scene, camera, material, mesh, animationId

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
      renderer.setPixelRatio(window.devicePixelRatio || 1)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.domElement.style.position = 'absolute'
      renderer.domElement.style.top = '0'
      renderer.domElement.style.left = '0'
      renderer.domElement.style.pointerEvents = 'none'
      renderer.domElement.style.zIndex = '0'
      container.appendChild(renderer.domElement)

      scene = new THREE.Scene()

      // Fullscreen quad (NDC)
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

      const vertexShader = `
        precision highp float;
        attribute vec3 position;
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `

      const fragmentShader = `
        precision highp float;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;

        vec3 palette(float t) {
          return mix(vec3(0.03,0.11,0.18), vec3(0.14,0.53,0.96), smoothstep(0.0,1.0,t));
        }

        float circle(vec2 uv, vec2 p, float r) {
          float d = length(uv - p);
          return 1.0 - smoothstep(r - 0.02, r + 0.02, d);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          uv.y = 1.0 - uv.y;

          vec2 m = u_mouse / u_resolution;

          float t = u_time * 0.3;
          vec2 p1 = vec2(0.45 + 0.12*sin(t), 0.5 + 0.08*cos(t*0.9));
          vec2 p2 = vec2(0.65 + 0.10*cos(t*1.1), 0.35 + 0.06*sin(t*1.3));
          vec2 p3 = vec2(0.25 + 0.08*sin(t*1.2), 0.35 + 0.06*cos(t*1.4));

          vec2 attract = mix(vec2(0.5), m, 0.8);

          float a1 = circle(uv, p1 + 0.04*(attract-0.5), 0.25 + 0.03*sin(u_time*0.8));
          float a2 = circle(uv, p2 + 0.06*(attract-0.5), 0.20 + 0.04*cos(u_time*1.1));
          float a3 = circle(uv, p3 + 0.05*(attract-0.5), 0.18 + 0.03*sin(u_time*1.3));

          float intensity = clamp(a1*1.2 + a2*0.9 + a3*1.0, 0.0, 1.0);

          float n = 0.5 + 0.5*sin((uv.x+uv.y+u_time*0.1)*10.0);
          vec3 col = palette(intensity) * (0.6 + 0.4*intensity) + vec3(0.02)*n;

          float alpha = intensity * 0.9;

          gl_FragColor = vec4(col, alpha);
        }
      `

      material = new THREE.RawShaderMaterial({
        uniforms: {
          u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          u_mouse: { value: new THREE.Vector2(-9999, -9999) },
          u_time: { value: 0 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
      })

      const geometry = new THREE.BufferGeometry()
      const verts = new Float32Array([ -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0 ])
      geometry.setAttribute('position', new THREE.BufferAttribute(verts, 3))
      geometry.setIndex([0,1,2, 2,3,0])

      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      // Interaction
      const mouse = { x: -9999, y: -9999 }
      let targetMouse = { x: -9999, y: -9999 }

      const onPointerMove = (e) => {
        targetMouse.x = e.clientX
        targetMouse.y = window.innerHeight - e.clientY
      }

      window.addEventListener('pointermove', onPointerMove)

      let lastTime = performance.now()
      const loop = () => {
        const now = performance.now()
        const dt = Math.min(0.06, (now - lastTime)/1000)
        lastTime = now

        // smooth mouse
        mouse.x += (targetMouse.x - mouse.x) * Math.min(1, 10 * dt)
        mouse.y += (targetMouse.y - mouse.y) * Math.min(1, 10 * dt)

        material.uniforms.u_mouse.value.set(mouse.x, mouse.y)
        material.uniforms.u_time.value += dt

        renderer.render(scene, camera)
        animationId = requestAnimationFrame(loop)
      }

      animationId = requestAnimationFrame(loop)

      const onResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
      }

      window.addEventListener('resize', onResize)

      return () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('resize', onResize)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement)
        }
      }

    } catch (err) {
      console.warn('WebGL init failed, showing CSS fallback', err)
    }
  }, [])

  // Fallback CSS visible whenever WebGL didn't initialize
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', left: '10%', top: '20%' }} />
        <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-15" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', right: '10%', top: '40%' }} />
        <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-25" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)', left: '40%', bottom: '10%' }} />
      </div>
    </div>
  )
}