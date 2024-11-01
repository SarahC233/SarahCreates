"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -4.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3,
      geometry: new THREE.IcosahedronGeometry(4), // Gem
    },
  ];

  const materials = [
    new THREE.MeshNormalMaterial({
      roughness: 0.1,
      metalness: 0.5,
    }), // Multicolored
    new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.1,
      metalness: 0.5,
    }), // Dark Blue-Gray
    new THREE.MeshStandardMaterial({
      color: 0x8e44ad,
      roughness: 0.1,
      metalness: 0.5,
    }), // Purple
  ];

  // Sound effects
  // const soundEffects = [
  //   new Audio("/sounds/knock1.ogg"),
  //   new Audio("/sounds/knock2.ogg"),
  //   new Audio("/sounds/knock3.ogg"),
  // ];

  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      // soundEffects={soundEffects}
      geometry={geometry}
      materials={materials}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, materials }) {  // Add soundEffects back in 
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(() => getRandomMaterial());

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    // Sounds effects disabled for now
    // gsap.utils.random(soundEffects).play();

    // Perform the rotation animation
    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 1)}`,
      y: `+=${gsap.utils.random(0, 1)}`,
      z: `+=${gsap.utils.random(0, 1)}`,
      duration: 2.5,
      ease: "elastic.out(1, 0.3)",
      yoyo: true,
    });

    // Ensure material is different from current one
    let newMaterial;
    do {
      newMaterial = getRandomMaterial();
    } while (newMaterial === currentMaterial);

    // Set new material and update state
    setCurrentMaterial(newMaterial);
    mesh.material = newMaterial.clone();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        delay: 0.3,
      });
    });
    return () => ctx.revert(); //cleanup
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        duration: 40,
        x: Math.PI * 2,
        y: Math.PI * 2,
        z: Math.PI * 2,
        repeat: -1,
        ease: "none",
      });
    }
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={r} rotationIntensity={r} floatIntensity={r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={currentMaterial}
        />
      </Float>
    </group>
  );
}

