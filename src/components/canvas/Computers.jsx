import React from 'react'
import { Suspense, useEffect, useState, useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

// Here I am using ThreeMFLoader.js to create 3d visual Effects..
// 3d Geometry

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf');
  const meshRef = useRef();
  
  // Add error handling for the model
  if (!computer || !computer.scene) {
    console.warn('Computer model not loaded properly', computer);
    return null;
  }

  console.log('Computer model loaded successfully', computer);

  // Add subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      console.log('Animation frame:', state.clock.elapsedTime); // Debug log
      // Smooth Y-axis rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Floating up and down motion - moved down further
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15 + (isMobile ? -2.0 : -2.5);
      // Slight X-axis tilting
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1}/>
      <spotLight 
        position={[-20, 50, 10]} 
        angle={0.12} 
        penumbra={1} 
        intensity={1} 
        castShadow 
        shadow-mapSize={1024}
      />
      <primitive 
        ref={meshRef}
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.6}
        position={isMobile ? [0,-2.0,-1.5] : [0,-2.5,-1.2]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(null);

  console.log('ComputersCanvas rendering...');

  useEffect(() => { 
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change',handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
  }, [])

  // Handle WebGL context loss
  const handleContextLoss = (event) => {
    event.preventDefault();
    console.warn('WebGL context lost');
    setError('WebGL context lost. Please refresh the page.');
  };

  const handleContextRestore = () => {
    console.log('WebGL context restored');
    setError(null);
  };

  if (error) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'white',
        background: 'linear-gradient(to bottom, #000, #111)'
      }}>
        <div>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              marginTop: '10px', 
              padding: '10px 20px', 
              background: '#6366f1', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      frameloop='always' // Enable continuous rendering for smooth animations
      shadows 
      camera={{position:[20, 3, 5], fov: 25}}
      gl={{
        preserveDrawingBuffer: true,
        antialias: false, // Disable for better performance and fewer context issues
        alpha: true, // Enable transparency to show background
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true
      }}
      onCreated={({ gl }) => {
        console.log('3D Canvas created');
        gl.domElement.addEventListener('webglcontextlost', handleContextLoss);
        gl.domElement.addEventListener('webglcontextrestored', handleContextRestore);
      }}
      onError={(error) => {
        console.error('Canvas error:', error);
        setError(`Rendering error: ${error.message}`);
      }}
    >
       <Suspense fallback={<CanvasLoader/>}>
        {/* canvasloader shows the loading of the Computer canvas 3D element */}
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
       </Suspense>

       <Preload all/>
    </Canvas>
  )
}

// Preload the model to prevent loading issues
useGLTF.preload('./desktop_pc/scene.gltf');

export default ComputersCanvas;