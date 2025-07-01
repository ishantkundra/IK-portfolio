import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

// Simple test component to verify basic Three.js functionality
const TestCube = () => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

// Test component for GLTF loading
const TestGLTF = () => {
  try {
    const { scene } = useGLTF('./desktop_pc/scene.gltf');
    console.log('GLTF loaded successfully:', scene);
    return <primitive object={scene} scale={0.1} position={[0, -1, 0]} />;
  } catch (error) {
    console.error('Error loading GLTF:', error);
    return null;
  }
};

const TestCanvas = () => {
  return (
    <div style={{ width: '100%', height: '400px', border: '2px solid #915eff' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<TestCube />}>
          <TestGLTF />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TestCanvas;
