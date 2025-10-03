import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { ExoplanetData } from '@/types/exoplanet';
import * as THREE from 'three';

interface PlanetMeshProps {
  radius: number;
  temperature?: number;
}

const PlanetMesh = ({ radius, temperature = 280 }: PlanetMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  // Determine planet color based on temperature
  const getPlanetColor = (temp: number) => {
    if (temp < 200) return '#4FC3F7'; // Ice blue
    if (temp < 300) return '#66BB6A'; // Earth-like green
    if (temp < 600) return '#FFA726'; // Warm orange
    if (temp < 1000) return '#FF7043'; // Hot red
    return '#F44336'; // Very hot red
  };

  const color = getPlanetColor(temperature);

  return (
    <Sphere ref={meshRef} args={[radius, 64, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        metalness={0.1}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </Sphere>
  );
};

interface PlanetVisualizationProps {
  exoplanet: ExoplanetData;
  className?: string;
}

export const PlanetVisualization = ({ exoplanet, className = "" }: PlanetVisualizationProps) => {
  // Scale the radius for better visualization (Earth = 1, show relative to 3 units max)
  // Use default radius of 1 if not detected by AI
  const radius = exoplanet.radius ?? 1;
  const scaledRadius = Math.min(radius * 0.5, 3);

  return (
    <div className={`${className} bg-gradient-card rounded-lg border border-primary/20 shadow-glow overflow-hidden`}>
      <div className="h-80 w-full">
        <Canvas camera={{ position: [5, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4FC3F7" />
          
          <PlanetMesh 
            radius={scaledRadius} 
            temperature={exoplanet.temperature} 
          />
          
          {/* Orbit ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[scaledRadius + 2, scaledRadius + 2.1, 64]} />
            <meshBasicMaterial color="#4FC3F7" opacity={0.3} transparent />
          </mesh>
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={15}
          />
          
          {/* Starfield background */}
          <mesh>
            <sphereGeometry args={[50]} />
            <meshBasicMaterial color="#000011" side={THREE.BackSide} />
          </mesh>
        </Canvas>
      </div>
      
      <div className="p-4 bg-secondary/30">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Radius:</span>
            <span className="ml-2 font-medium">{exoplanet.radius} R⊕</span>
          </div>
          <div>
            <span className="text-muted-foreground">Mass:</span>
            <span className="ml-2 font-medium">{exoplanet.mass} M⊕</span>
          </div>
          {exoplanet.temperature && (
            <div>
              <span className="text-muted-foreground">Temperature:</span>
              <span className="ml-2 font-medium">{exoplanet.temperature} K</span>
            </div>
          )}
          {exoplanet.orbital_period && (
            <div>
              <span className="text-muted-foreground">Orbital Period:</span>
              <span className="ml-2 font-medium">{exoplanet.orbital_period} days</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};