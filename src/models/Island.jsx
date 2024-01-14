import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../assets/3d/island1.glb";

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    // {Island 3D model from: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907}
    <a.group ref={islandRef} {...props}>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_Material005_0.geometry}
        material={materials["Material.005"]}
        position={[92.088, -1359.733, -1022.194]}
        rotation={[0, 1.387, 0]}
        scale={183.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_Material004_0.geometry}
        material={materials["Material.004"]}
        position={[92.088, -1359.733, -1022.194]}
        rotation={[0, 1.387, 0]}
        scale={183.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_Material007_0.geometry}
        material={materials["Material.007"]}
        position={[-1220.449, 322.205, -117.979]}
        rotation={[-Math.PI / 2, 0, 2.409]}
        scale={[1154.002, 1154.002, 351.421]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object001_Object001_mtl_0.geometry}
        material={materials.Object001_mtl}
        position={[-824.066, 680.058, -1303.098]}
        rotation={[-1.59, -0.01, -0.665]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object001001_Object001_mtl_0.geometry}
        material={materials.Object001_mtl}
        position={[369.024, 680.058, -140.581]}
        rotation={[-Math.PI / 2, -0.022, 0.429]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object001002_Object001_mtl_0.geometry}
        material={materials.Object001_mtl}
        position={[369.024, 680.058, -140.581]}
        rotation={[-Math.PI / 2, -0.022, 0.429]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object001003_Object001_mtl_0.geometry}
        material={materials.Object001_mtl}
        position={[369.024, 680.058, -140.581]}
        rotation={[-Math.PI / 2, -0.022, 0.429]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object001004_Object001_mtl_0.geometry}
        material={materials.Object001_mtl}
        position={[369.024, 680.058, -140.581]}
        rotation={[-Math.PI / 2, -0.022, 0.429]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object001005_Object001_mtl_0.geometry}
        material={materials.Object001_mtl}
        position={[369.024, 680.058, -140.581]}
        rotation={[-Math.PI / 2, -0.022, 0.429]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object001006_Object001_mtl_0.geometry}
        material={materials.Object001_mtl}
        position={[369.024, 680.058, -140.581]}
        rotation={[-Math.PI / 2, -0.022, 0.429]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object001007_Object001_mtl_0.geometry}
        material={materials.Object001_mtl}
        position={[369.024, 680.058, -140.581]}
        rotation={[-Math.PI / 2, -0.022, 0.429]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010_Cube024_M4_0.geometry}
        material={materials.material}
        position={[590.185, 677.153, -995.55]}
        rotation={[3.126, -1.494, 3.126]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009_Cube004_M3_0.geometry}
        material={materials.material_5}
        position={[590.185, 670.893, -995.55]}
        rotation={[Math.PI, -1.494, Math.PI]}
        scale={100}
      />
    </a.group>
  );
}
