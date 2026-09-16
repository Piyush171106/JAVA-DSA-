'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useDSAStore } from '../../context/DSAContext';
import { DSATopic } from '../../types';

const TOPIC_LIST: DSATopic[] = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Prefix Sum & Subarrays',
  'Fast & Slow Pointers',
  'Binary Search',
  'Linked List',
  'Stack & Queue',
  'Binary Trees',
  'Binary Search Trees',
  'Heaps & Priority Queue',
  'Backtracking & Recursion',
  'Graphs',
  'Dynamic Programming',
  'Tries',
  'Intervals & Greedy',
  'Bit Manipulation & Math'
];

interface NodeData {
  name: DSATopic;
  position: [number, number, number];
  solvedCount: number;
  totalCount: number;
}

function TopicNode({ node, onClick }: { node: NodeData; onClick: (t: DSATopic) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const ratio = node.totalCount > 0 ? node.solvedCount / node.totalCount : 0;
  const color = useMemo(() => {
    if (ratio === 1) return '#10b981'; // Emerald
    if (ratio > 0.5) return '#06b6d4'; // Cyan
    if (ratio > 0) return '#6366f1'; // Indigo
    return '#64748b'; // Slate
  }, [ratio]);

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(node.name)}
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <Text
        position={[0, -0.85, 0]}
        fontSize={0.32}
        color="#f8fafc"
        anchorX="center"
        anchorY="top"
      >
        {node.name}
      </Text>

      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-slate-900/90 text-white backdrop-blur-md border border-cyan-500/40 px-3 py-1.5 rounded-lg shadow-xl text-xs whitespace-nowrap">
            <div className="font-bold text-cyan-400">{node.name}</div>
            <div className="text-slate-300 font-mono">
              {node.solvedCount} / {node.totalCount} Solved ({Math.round(ratio * 100)}%)
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function ConstellationLines({ nodes }: { nodes: NodeData[] }) {
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const p1 = new THREE.Vector3(...nodes[i].position);
        const p2 = new THREE.Vector3(...nodes[j].position);
        if (p1.distanceTo(p2) < 6.5) {
          points.push(p1, p2);
        }
      }
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [nodes]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#38bdf8" opacity={0.25} transparent />
    </lineSegments>
  );
}

export default function TopicConstellation3D() {
  const { problems, solvedIds, setFilterState, setActiveTab } = useDSAStore();

  const nodes: NodeData[] = useMemo(() => {
    const radius = 5.5;
    return TOPIC_LIST.map((topic, idx) => {
      const phi = Math.acos(-1 + (2 * idx) / TOPIC_LIST.length);
      const theta = Math.sqrt(TOPIC_LIST.length * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const topicProblems = problems.filter((p) => p.topic === topic);
      const solved = topicProblems.filter((p) => solvedIds.has(p.id)).length;

      return {
        name: topic,
        position: [x, y, z],
        solvedCount: solved,
        totalCount: topicProblems.length,
      };
    });
  }, [problems, solvedIds]);

  const handleNodeClick = (topicName: DSATopic) => {
    setFilterState((prev) => ({ ...prev, topic: topicName }));
    setActiveTab('catalog');
  };

  return (
    <div className="w-full h-[450px] relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
      <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/50">
        <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          3D Topic Constellation Universe
        </h3>
        <p className="text-xs text-slate-400">Click any 3D node to filter catalog by topic • Drag to rotate 3D view</p>
      </div>

      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#818cf8" />

        <group>
          <ConstellationLines nodes={nodes} />
          {nodes.map((node) => (
            <TopicNode key={node.name} node={node} onClick={handleNodeClick} />
          ))}
        </group>

        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.8} maxDistance={20} minDistance={5} />
      </Canvas>
    </div>
  );
}
