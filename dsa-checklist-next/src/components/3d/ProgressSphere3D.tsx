'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSphere({ progressRatio }: { progressRatio: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const count = 800;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const radius = 2.4;

    const solvedCount = Math.floor(count * progressRatio);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const isSolved = i < solvedCount;
      if (isSolved) {
        col[i * 3] = 0.06; // R
        col[i * 3 + 1] = 0.72; // G (Emerald)
        col[i * 3 + 2] = 0.5; // B
      } else {
        col[i * 3] = 0.38; // Slate
        col[i * 3 + 1] = 0.45;
        col[i * 3 + 2] = 0.55;
      }
    }
    return [pos, col];
  }, [progressRatio]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.4;
      pointsRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.6;
    }
  });

  const percentageText = `${Math.round(progressRatio * 100)}%`;

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.08} vertexColors transparent opacity={0.85} />
      </points>

      {/* Orbiting Halo Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.04, 16, 100]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} />
      </mesh>

      {/* Center Progress Text */}
      <Text
        fontSize={0.9}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
      >
        {percentageText}
      </Text>
      <Text
        position={[0, -0.7, 0]}
        fontSize={0.25}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        COMPLETED
      </Text>
    </group>
  );
}

export default function ProgressSphere3D({ solvedCount, totalCount }: { solvedCount: number; totalCount: number }) {
  const ratio = totalCount > 0 ? solvedCount / totalCount : 0;

  return (
    <div className="w-full h-full min-h-[260px] relative rounded-xl overflow-hidden bg-slate-900/60 border border-slate-800 shadow-xl flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#06b6d4" />
        <ParticleSphere progressRatio={ratio} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
