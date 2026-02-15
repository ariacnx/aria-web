import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- Pine Needle ---
function PineNeedle({ position, rotation, scale, color }: { position: [number, number, number]; rotation: [number, number, number]; scale: number; color: string }) {
  return (
    <mesh position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <cylinderGeometry args={[0.005, 0.02, 1.1, 4]} />
      <meshStandardMaterial color={color} emissive="#2c1e0f" emissiveIntensity={0.35} roughness={0.3} metalness={0.4} />
    </mesh>
  );
}

// --- Pine Branch ---
function PineBranch({ height, radius, tilt, position, color }: { height: number; radius: number; tilt: number; position: [number, number, number]; color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const needles = useMemo(() => {
    const items: { y: number; angle: number; rotX: number; scale: number }[] = [];
    const count = Math.floor(70 * (height / 2.0));
    for (let i = 0; i < count; i++) {
      const t = i / count;
      items.push({
        y: -(height / 2 * 0.9) + (t * height * 0.95),
        angle: i * 2.4,
        rotX: (Math.PI / 4) + (Math.random() * 0.3),
        scale: (0.6 + Math.random() * 0.4) * (1.0 - t * 0.3),
      });
    }
    return items;
  }, [height]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = tilt + Math.sin(t * 0.5) * 0.12;
    groupRef.current.rotation.x = Math.cos(t * 0.45) * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <cylinderGeometry args={[radius * 0.5, radius * 0.8, height, 5]} />
        <meshStandardMaterial color={color} emissive="#2c1e0f" emissiveIntensity={0.25} roughness={0.3} metalness={0.4} />
      </mesh>
      {needles.map((n, i) => (
        <PineNeedle key={i} position={[0, n.y, 0]} rotation={[n.rotX, n.angle, 0]} scale={n.scale} color={color} />
      ))}
    </group>
  );
}

// --- Inner Core ---
function InnerCore({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
  });

  return (
    <group ref={groupRef}>
      <PineBranch height={2.0} radius={0.04} tilt={0.25} position={[0.12, -0.2, 0]} color={color} />
      <PineBranch height={1.4} radius={0.03} tilt={-0.35} position={[-0.2, -0.45, 0]} color={color} />
      <PineBranch height={0.9} radius={0.025} tilt={0.5} position={[0.3, 0.1, 0.15]} color={color} />
    </group>
  );
}

// --- Glass Sphere ---
function GlassSphere({ radius, sheenColor }: { radius: number; sheenColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.35) * 0.12);
  });

  return (
    <mesh ref={meshRef} renderOrder={1}>
      <sphereGeometry args={[radius, 128, 128]} />
      <meshPhysicalMaterial
        color="#ffffff" metalness={0.1} roughness={0} transmission={1.0} thickness={1.5}
        ior={2.1} clearcoat={1.0} clearcoatRoughness={0}
        attenuationColor={new THREE.Color('#ffffff')} attenuationDistance={20}
        envMapIntensity={2.5} sheen={1.0} sheenColor={new THREE.Color(sheenColor)} transparent
      />
    </mesh>
  );
}

// --- Particles ---
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.5 + Math.random() * 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

// --- Scene ---
function CrystalScene({ pineColor, sheenColor }: { pineColor: string; sheenColor: string }) {
  const ballRadius = 2.8;
  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[5, 5, 5]} intensity={10} distance={40} />
      <pointLight position={[-5, 2, -5]} intensity={15} distance={40} color="#a5d6a7" />
      <pointLight position={[0, -5, 2]} intensity={5} distance={30} color="#e0f2f1" />
      <GlassSphere radius={ballRadius} sheenColor={sheenColor} />
      <InnerCore color={pineColor} />
      <Particles count={200} />
      <Environment preset="studio" />
    </>
  );
}

interface CrystalOrbProps {
  size?: number;
  pineColor?: string;
  sheenColor?: string;
}

export default function CrystalOrb({ size = 200, pineColor = '#3e5a3a', sheenColor = '#a5d6a7' }: CrystalOrbProps) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 0 30px rgba(165, 214, 167, 0.15)', border: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.8 }}
        style={{ background: 'transparent', border: 'none' }}
      >
        <CrystalScene pineColor={pineColor} sheenColor={sheenColor} />
      </Canvas>
    </div>
  );
}
