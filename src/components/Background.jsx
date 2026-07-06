import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

const COUNT = 88
const RADIUS = 3.3

function fibonacciSphere(count, radius) {
  const pts = []
  const inc = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const phi = i * inc
    pts.push(new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r).multiplyScalar(radius))
  }
  return pts
}

// A large, dim, slowly-rotating globe of connected nodes — the page-wide
// ambient backdrop (offset to the right so hero copy stays readable).
function BackgroundGlobe() {
  const group = useRef()

  const { nodePositions, linePositions } = useMemo(() => {
    const pts = fibonacciSphere(COUNT, RADIUS)
    const np = new Float32Array(COUNT * 3)
    pts.forEach((p, i) => {
      np[i * 3] = p.x
      np[i * 3 + 1] = p.y
      np[i * 3 + 2] = p.z
    })
    const segs = []
    const K = 3
    for (let i = 0; i < pts.length; i++) {
      const near = pts
        .map((q, j) => ({ j, d: pts[i].distanceTo(q) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, K)
      for (const { j } of near) {
        if (j > i) segs.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
      }
    }
    return { nodePositions: np, linePositions: new Float32Array(segs) }
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return
    const d = Math.min(delta, 0.05)
    group.current.rotation.y += d * 0.05 + state.pointer.x * d * 0.05
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.12
  })

  return (
    <group ref={group} position={[1.7, 0.2, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#5b6cff" transparent opacity={0.09} depthWrite={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={COUNT}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#aab6ff"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

/**
 * Fixed, full-viewport background: aurora blobs + a rotating node-globe +
 * masked grid + grain + vignette. The 3D canvas is skipped under reduced motion.
 */
export default function Background() {
  const reduce = useReducedMotion()

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#05060a]">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />

      {!reduce && (
        <Canvas
          className="!absolute inset-0"
          style={{ pointerEvents: 'none' }}
          camera={{ position: [0, 0, 7], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <BackgroundGlobe />
          </Suspense>
        </Canvas>
      )}

      <div className="grid-overlay" />
      <div className="noise" />
      <div className="vignette" />
    </div>
  )
}
