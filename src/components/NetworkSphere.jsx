import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

export function NetworkSphere({ pointCount = 700, radius = 220 }) {
  const ref = useRef(null)
  const [status, setStatus] = useState('loading')
  const { theme } = useTheme()

  useEffect(() => {
    const container = ref.current
    if (!container) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio || 1)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0) // ensure transparency
      renderer.domElement.style.position = 'absolute'
      renderer.domElement.style.top = '0'
      renderer.domElement.style.left = '0'
      renderer.domElement.style.pointerEvents = 'none'
      renderer.domElement.style.zIndex = theme === 'light' ? '20' : '0'
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000)
      camera.position.z = 600

      // helper group
      const group = new THREE.Group()
      scene.add(group)

      // create points distributed on a sphere
      const count = pointCount
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const basePositions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // random point on sphere
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      const i3 = i * 3
      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z

      basePositions[i3] = x
      basePositions[i3 + 1] = y
      basePositions[i3 + 2] = z

      velocities[i3] = (Math.random() - 0.5) * 0.2
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.2
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.2
    }

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // create small circle texture for points
    const size = 64
    const sprite = document.createElement('canvas')
    sprite.width = size
    sprite.height = size
    const ctx = sprite.getContext('2d')
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    grad.addColorStop(0, 'rgba(255,255,255,0.95)')
    grad.addColorStop(0.15, 'rgba(59,130,246,0.9)')
    grad.addColorStop(0.35, 'rgba(59,130,246,0.5)')
    grad.addColorStop(1, 'rgba(59,130,246,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
    const spriteTex = new THREE.CanvasTexture(sprite)
    spriteTex.needsUpdate = true

    const pointsMaterial = new THREE.PointsMaterial({
      size: Math.max(1.6, window.innerWidth / 240),
      map: spriteTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    group.add(points)

    // build connectivity once by nearest neighbors (k nearest)
    const k = 3
    const maxDistance = radius * 0.32 // threshold
    const linePositions = []

    // brute force nearest neighbors - O(n^2) but for <=1000 it's fine
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const xi = basePositions[i3]
      const yi = basePositions[i3 + 1]
      const zi = basePositions[i3 + 2]

      const dists = []
      for (let j = 0; j < count; j++) {
        if (i === j) continue
        const j3 = j * 3
        const dx = xi - basePositions[j3]
        const dy = yi - basePositions[j3 + 1]
        const dz = zi - basePositions[j3 + 2]
        const d2 = dx * dx + dy * dy + dz * dz
        dists.push({ idx: j, d2 })
      }
      dists.sort((a, b) => a.d2 - b.d2)
      for (let n = 0; n < Math.min(k, dists.length); n++) {
        const j = dists[n].idx
        const j3 = j * 3
        const dx = xi
        const dy = yi
        const dz = zi
        // push segment endpoints
        linePositions.push(xi, yi, zi)
        linePositions.push(basePositions[j3], basePositions[j3 + 1], basePositions[j3 + 2])
      }
    }

    const lineGeom = new THREE.BufferGeometry()
    const initialLinePosArr = new Float32Array(linePositions)
    lineGeom.setAttribute('position', new THREE.BufferAttribute(initialLinePosArr, 3))
    const lineMaterial = new THREE.LineBasicMaterial({ color: theme === 'light' ? 0x1e3a8a : 0x3b82f6, transparent: true, opacity: theme === 'light' ? 0.35 : 0.25 })
    const lines = new THREE.LineSegments(lineGeom, lineMaterial)
    group.add(lines)

    // interaction
    const mouse = new THREE.Vector2(-9999, -9999)
    const targetMouse3D = new THREE.Vector3(0, 0, 0)

    function onPointerMove(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

      // project ray at z=0 plane
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera)
      const dir = vector.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      targetMouse3D.copy(camera.position).add(dir.multiplyScalar(distance))
    }

    window.addEventListener('pointermove', onPointerMove)

    // animation loop
    let last = performance.now()
    const animate = () => {
      try {
      const now = performance.now()
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      // rotate the whole group slowly
      group.rotation.y += 0.02 * dt
      group.rotation.x += 0.01 * dt

      // update points with simple spring back to base and mouse repulsion
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        let px = positions[i3]
        let py = positions[i3 + 1]
        let pz = positions[i3 + 2]

        // spring back
        const bx = basePositions[i3]
        const by = basePositions[i3 + 1]
        const bz = basePositions[i3 + 2]

        // to mouse
        const dx = px - targetMouse3D.x
        const dy = py - targetMouse3D.y
        const dz = pz - targetMouse3D.z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        const influenceRadius = radius * 0.7
        if (dist < influenceRadius) {
          // repulse
          const force = (1 - dist / influenceRadius) * 300 * dt
          velocities[i3] += (dx / (dist || 1)) * force
          velocities[i3 + 1] += (dy / (dist || 1)) * force
          velocities[i3 + 2] += (dz / (dist || 1)) * force
        }

        // spring to base
        velocities[i3] += (bx - px) * 0.02 * dt
        velocities[i3 + 1] += (by - py) * 0.02 * dt
        velocities[i3 + 2] += (bz - pz) * 0.02 * dt

        // damping
        velocities[i3] *= 0.92
        velocities[i3 + 1] *= 0.92
        velocities[i3 + 2] *= 0.92

        // integrate
        px += velocities[i3] * dt * 60
        py += velocities[i3 + 1] * dt * 60
        pz += velocities[i3 + 2] * dt * 60

        positions[i3] = px
        positions[i3 + 1] = py
        positions[i3 + 2] = pz
      }

      // update buffer attributes
      pointsGeometry.attributes.position.needsUpdate = true

      // update lines positions to match points moved (line segments stored as pairs)
      const lp = lineGeom.attributes.position.array
      // each segment corresponds to [p_i, p_j] stored in order when built
      for (let s = 0; s < lp.length / 3; s++) {
        // segment endpoint maps back to index: we stored endpoint positions by value, but we need to update them
        // easiest approach: recalc from nearest base positions mapping - but to keep it simple, we will re-sync by searching nearest point per endpoint (cheap since endpoints count is limited)
        // however for performance, we built connections from basePositions; we can map endpoints to the original indices by checking equality
      }

      // Instead of expensive recalculation each frame, we can rebuild line positions array by iterating connections we computed earlier.
      let ptr = 0
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const xi = positions[i3]
        const yi = positions[i3 + 1]
        const zi = positions[i3 + 2]

        // find its k nearest in basePositions again (same pairing as when created)
        // Instead of recomputing kNN, reuse the neighbors we built earlier in the linePositions array layout: it is [p_i, p_j, p_i, p_k, ...]
        // We'll rebuild line array by walking basePositions and neighbors. To keep mapping simple, we'll use a consistent ordering: for every i, we stored connections to k neighbors consecutively when building linePositions. So we can use that pattern to update.
      }

      // To keep runtime simple and fast, we will update line geometry by sampling current positions for the stored pairs.
      // Build a quick map from base position string to current position index
      const map = new Map()
      for (let i = 0; i < count; i++) {
        map.set(`${basePositions[i * 3]},${basePositions[i * 3 + 1]},${basePositions[i * 3 + 2]}`, i)
      }

      // update line array
      for (let p = 0; p < initialLinePosArr.length; p += 6) {
        const bx = initialLinePosArr[p]
        const by = initialLinePosArr[p + 1]
        const bz = initialLinePosArr[p + 2]
        const jx = initialLinePosArr[p + 3]
        const jy = initialLinePosArr[p + 4]
        const jz = initialLinePosArr[p + 5]

        const keyA = `${bx},${by},${bz}`
        const keyB = `${jx},${jy},${jz}`
        const idxA = map.get(keyA)
        const idxB = map.get(keyB)
        if (idxA !== undefined && idxB !== undefined) {
          const ia3 = idxA * 3
          const ib3 = idxB * 3
          lp[p] = positions[ia3]
          lp[p + 1] = positions[ia3 + 1]
          lp[p + 2] = positions[ia3 + 2]
          lp[p + 3] = positions[ib3]
          lp[p + 4] = positions[ib3 + 1]
          lp[p + 5] = positions[ib3 + 2]
        }
      }

      lineGeom.attributes.position.needsUpdate = true

        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      } catch (err) {
        console.error('NetworkSphere animation error', err)
        setStatus('error')
      }
    }

    animationId = requestAnimationFrame(animate)
    setStatus('ok')

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // cleanup
    return () => {
      try {
        cancelAnimationFrame(animationId)
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('resize', onResize)
        pointsGeometry.dispose()
        pointsMaterial.dispose()
        lineGeom.dispose()
        lineMaterial.dispose()
        spriteTex.dispose()
        renderer.dispose()
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement)
        }
      } catch (e) {
        // ignore cleanup errors
      }
    }
  } catch (err) {
    console.warn('NetworkSphere init failed', err)
    setStatus('error')
  }
  }, [pointCount, radius, theme])

  return (
    <div className={`absolute inset-0 pointer-events-none ${theme === 'light' ? 'z-20' : 'z-0'}`}>
      <div ref={ref} className="absolute inset-0 pointer-events-none" />
    </div>
  )
}
