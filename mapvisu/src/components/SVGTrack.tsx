import {
    Track,
  } from "../modules/infra/Infrastructure";
  import React, { useState } from "react";
  
  
  type TracksProps = {
    track: Track;
  };
  
  function Tracks({ track }: TracksProps) {
    const [hovered, setHover] = useState(false);
  
    return (

            <polyline
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              stroke={hovered ? "red" : "black"}
              key={track.name}
              points={track.points
                .map((point) => `${point.x},${point.y}`)
                .join(" ")}
            />
    );
  }
  const Tracks2 = React.memo(Tracks);
  
  export default Tracks2;
  