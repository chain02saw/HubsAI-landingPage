import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// A single orbiting cube
function OrbitingCube({ radius = 5, speed = 0.2, size = 0.6, color = '#14b8a6', angleOffset = 0 }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + angleOffset;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.007;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

const OrbitingCubesBackground = () => {
  return (
    <div className="absolute inset-0 z-50 bg-red-500">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={40} depth={50} count={100} factor={4} saturation={0} fade speed={1} />
        {[...Array(8)].map((_, i) => (
          <OrbitingCube
            key={i}
            radius={5 + i * 0.4}
            speed={0.15 + i * 0.02}
            size={0.5 + (i % 2 === 0 ? 0.2 : 0)}
            angleOffset={i * Math.PI * 0.25}
            color={'#14b8a6'}
          />
        ))}
        {/* Optionally add orbit controls for development */}
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

export default OrbitingCubesBackground;
