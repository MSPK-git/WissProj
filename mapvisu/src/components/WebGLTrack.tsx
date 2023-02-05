import React, { Component, useRef, useState, useMemo } from "react";

import {Vector2, BufferGeometry} from "three";
import { Track } from "../modules/infra/Infrastructure";


type TracksProps = {
    track: Track;
  };

function TrackElement ({ track }: TracksProps) {

    const coords: Vector2[] = []
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    track && track.points.length > 0 && track.points.map((point)=>coords.push(new Vector2((point.x), (point.y))))

    const lineGeometry = new BufferGeometry().setFromPoints(coords)


    // This reference will give us direct access to the mesh
    const line = useRef<BufferGeometry>();
          
    // Set up state for the hovered and active state 


    return (
        <line geometry={lineGeometry}
        {...track}
        //@ts-ignore
        ref={line}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        >
        <lineBasicMaterial attach="material" color={hovered ? '#b100cd' : '#000000'} linewidth={10} linecap={'round'} linejoin={'round'} />
        </line>
    );
}
export default TrackElement;
