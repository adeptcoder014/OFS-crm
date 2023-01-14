import { Canvas, useFrame } from "@react-three/fiber";
import { Children, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { functionsIn } from "lodash";

//==========================

function Spin({ children }) {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.1;
  });
  return <group ref={ref}>{children}</group>;
}

//--------------------
function Plane(props) {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}
//--------------------------------
function Dabba(props) {
  const [ref] = useBox(() => ({
    mass: 1,
    ...props,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}
export default function Cube() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[5, 10, 15]} />
      <Physics>
        <Dabba position={[1, 5, 1]} rotation={[4, -15, 15]} />
        <Spin>
          <Dabba position={[1.5, 0, 1]} rotation={[0.4, -10, -5]} />
        </Spin>
        <Spin>
          <Dabba position={[0, 6, 5]} />
        </Spin>
        <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} />
        <OrbitControls />
      </Physics>
    </Canvas>
  );
}
