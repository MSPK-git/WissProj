import React from "react";
import { useEffect, useState } from "react";
import {
  Infrastructure,
  loadInfrastructure,
} from "../modules/infra/Infrastructure";
import { loadInfrastructure2 } from "../modules/infra/InfrastructureParserWebGL";
import SVGMap from "./SVGMap";
import WebGL from "./WebGLMap";

function Main() {
  const [infraNormalizedToSVG, setInfraNormalizedToSVG] = useState<Infrastructure | null>(null);
  const [infraNormalizedToCanvas, setInfraNormalizedToCanvas] = useState<Infrastructure | null>(null);
  const [showSVG, setMapType] = useState<"None" | "SVG" | "WebGL">("None");

  useEffect(() => {
    loadInfrastructure().then((i) => {
      setInfraNormalizedToSVG(i);
    });
    loadInfrastructure2().then((i) => {
      setInfraNormalizedToCanvas(i);
    });
  }, []);

  return (
    <>
      <h1>React/Map Test</h1>
      <div style={{ display: "flex" }}>
        <button onClick={() => setMapType("SVG")}>
          Show SVG example
        </button>
        <button onClick={() => setMapType("WebGL")}>
          Show WebGL based example
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {infraNormalizedToSVG === null || infraNormalizedToCanvas === null ? (
          <p>Loading data...</p>
        ) : showSVG === "None" ? (
          <>choose render type</>
        ) : showSVG === "SVG" ? (
          <SVGMap infra={infraNormalizedToSVG} />
        ) : (
          <WebGL infra={infraNormalizedToCanvas} />
        )}
      </div>
    </>
  );
}

export default Main;
