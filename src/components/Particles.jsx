import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * A lightweight drifting particle field (raw three.js points — no heavy deps).
 * Gently rotates on its own and leans toward the pointer for subtle parallax.
 */
export default function Particles({ count = 2600 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    const d = Math.min(delta, 0.05)
    ref.current.rotation.y += d * 0.02
    ref.current.rotation.x += d * 0.006
    // pointer lean
    const targetY = state.pointer.x * 0.25
    const targetX = -state.pointer.y * 0.2
    ref.current.rotation.y += (targetY - ref.current.rotation.y * 0.0) * d * 0.15
    ref.current.rotation.x += (targetX - ref.current.rotation.x * 0.0) * d * 0.15
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color={new THREE.Color('#8ea2ff')}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
