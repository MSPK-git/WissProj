import { Infrastructure } from "../modules/infra/Infrastructure";
import { Vector } from "../modules/utils/Vector";
import { MouseEventHandler, useState, WheelEventHandler } from "react";
import Track from "./SVGTrack";

type ViewBox = {
  x: number;
  y: number;
  w: number;
  h: number;
  zoomScale: number;
};

type MapProps = {
  infra: Infrastructure;
};

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 775;

function Map({ infra }: MapProps) {
  const [viewBox, setViewBox] = useState<ViewBox>({
    x: 0,
    y: 0,
    w: infra.maxX,
    h: infra.maxY,
    zoomScale: 1,
  });
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState(new Vector(0, 0));

  const relateToCanvas = (x: number, y: number) => {
    return [x / CANVAS_WIDTH, y / CANVAS_HEIGHT];
  };

  const onmousewheel: WheelEventHandler<SVGElement> = (e) => {
    e.preventDefault();
    const [mouseX, mouseY] = relateToCanvas(e.clientX, e.clientY);
    const mouseXInWorld = viewBox.x + mouseX * viewBox.w;
    const mouseYInWorld = viewBox.y + mouseY * viewBox.h;
    const dw = viewBox.w * Math.sign(e.deltaY) * -0.1;
    const dh = viewBox.h * Math.sign(e.deltaY) * -0.1;
    const zoomedWidth = viewBox.w - dw;
    const zoomedHeight = viewBox.h - dh;
    setViewBox({
      x: mouseXInWorld - mouseX * zoomedWidth,
      y: mouseYInWorld - mouseY * zoomedHeight,
      w: zoomedWidth,
      h: zoomedHeight,
      zoomScale: infra.maxX / zoomedWidth,
    });
  };

  const onmousedown: MouseEventHandler<SVGElement> = (e) => {
    setIsPanning(true);
    setStartPoint(new Vector(e.clientX, e.clientY));
  };

  const onmousemove: MouseEventHandler<SVGElement> = (e) => {
    if (isPanning) {
      const endPoint = new Vector(e.clientX, e.clientY);

      const [xScaleToImage, yScaleToImage] = relateToCanvas(
        viewBox.w,
        viewBox.h
      );
      var dx = (startPoint.x - endPoint.x) * xScaleToImage;
      var dy = (startPoint.y - endPoint.y) * yScaleToImage;
      setViewBox((prevViewBox) => {
        return {
          x: viewBox.x + dx,
          y: viewBox.y + dy,
          w: viewBox.w,
          h: viewBox.h,
          zoomScale: prevViewBox.zoomScale,
        };
      });
      setStartPoint(endPoint);
    }
  };

  const onmouseup = () => {
    setIsPanning(false);
  };

  const onmouseleave = () => {
    setIsPanning(false);
  };

  let strokeWidth = 4000 / viewBox.zoomScale;

  return (
    <>
      <>SVG choosed</>
      <svg
        id="viewport"
        className="w-full h-3/4"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ marginLeft: "10px" }}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        onWheel={onmousewheel}
        onMouseDown={onmousedown}
        onMouseLeave={onmouseleave}
        onMouseMove={onmousemove}
        onMouseUp={onmouseup}
      >
        <g
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="black"
          strokeWidth={strokeWidth}
        >
          {infra.tracks &&
            infra.tracks.length > 0 &&
            infra.tracks.map((track) => <Track track={track}></Track>)}
        </g>
      </svg>
    </>
  );
}

export default Map;
