import * as THREE from "three";
import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Infrastructure } from "../modules/infra/Infrastructure";
import WebGLTracks from "./WebGLTrack";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.

type MapProps = {
  infra: Infrastructure;
};

const CameraOrbitCOntroller = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    console.log(camera);
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableRotate = false;
    controls.zoomSpeed = controls.zoomSpeed *2;

    controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
    };
    controls.update();
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

function WebGL({ infra }: MapProps) {
  return (
    <>
      <>WEBGL choosed</>
      <Canvas
      id="viewport"
        style={{ height: 775, width: 700 }}
        orthographic
        camera={{
          position: [0, 0, 3],
          zoom: 0.000052,
          far: 10000,
        }}
      >
        <CameraOrbitCOntroller></CameraOrbitCOntroller>

        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {infra.tracks &&
          infra.tracks.length > 0 &&
          infra.tracks.map((track) => (
            <WebGLTracks track={track}></WebGLTracks>
          ))}
      </Canvas>
    </>
  );
}
export default WebGL;
