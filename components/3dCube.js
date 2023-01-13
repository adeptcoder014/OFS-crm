import { Canvas, useFrame } from "@react-three/fiber";
import { Children, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
//==========================

function Spin({ children }) {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.1;
  });
  return <group ref={ref}>{children}</group>;
}

function Dabba(props) {
  return (
    <mesh {...props}>
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
      <Dabba position={[5, 1, 1]} />
      <Spin>
        <Dabba position={[1.5, 0, 1]} />
      </Spin>
      <Spin>
        <Dabba position={[3, 1, 1]} />
      </Spin>
      <OrbitControls/>
    </Canvas>
  );
}
