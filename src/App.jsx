import './App.css'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { DoubleSide, TextureLoader } from 'three'
import bg from  "./assets/blue_bg.png";
import lamppost from "./assets/Lamppost_no_bg.png"
import lightlamppost from "./assets/Light.png"
import rainfall from "./assets/Rain.png";
import { Suspense, useRef } from 'react';

const Scene = () => {
  const map = useLoader(TextureLoader, [bg,lamppost,lightlamppost,rainfall]);
  const {width, height}  = useThree(state => state.viewport);
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const rainSpeed = 0.2, flickerFactor = 6;
  useFrame((state,delta) => {
    ref.current.material.opacity = Math.abs(Math.cos(ref.current.material.opacity)*flickerFactor)%1;
    ref2.current.position.y = (ref2.current.position.y-rainSpeed)%(height);
    ref3.current.position.y = ref2.current.position.y+height;
  })
  return(<>
    <mesh scale={[width,height,1]}>
      <planeGeometry args={[1,1]} />
      <meshBasicMaterial side={DoubleSide} map={map[0]} />
    </mesh>
    <mesh scale={[width, height, 1]}>
      <planeGeometry args={[0.7, 1]} />
      <meshBasicMaterial side={DoubleSide} map={map[1]} transparent />
    </mesh>
    <mesh ref={ref} scale={[width, height, 1]}>
      <planeGeometry args={[0.7, 1]} />
      <meshBasicMaterial side={DoubleSide} map={map[2]} transparent />
    </mesh>
    <mesh ref={ref2} scale={[width, height, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial side={DoubleSide} map={map[3]} transparent />
    </mesh>
    <mesh position={[0,height,0]} ref={ref3} scale={[width, height, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial side={DoubleSide} map={map[3]} transparent />
    </mesh>
  </>)
}

function App() {
  return (
      <Canvas>
        <Suspense fallback={<Html>Loading...</Html>}>
          <Scene />
        </Suspense>
      </Canvas>
    )
}

export default App
