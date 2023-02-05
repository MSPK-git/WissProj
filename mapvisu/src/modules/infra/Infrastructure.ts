import { Vector } from "../utils/Vector";

export interface Infrastructure {
  tracks: Track[];
  maxX: number;
  maxY: number;
}

export interface Track {
  name: string;
  points: Vector[];
}

export async function loadInfrastructure(): Promise<Infrastructure> {
  const response = await fetch(`/data.json`);

  const infra = await response.json();

  let min_x = Infinity;
  let min_y = Infinity;
  let max_x = -Infinity;
  let max_y = -Infinity;

  const tracks: Track[] = [];
  for (let track_name in infra.tracks) {
    const track = infra.tracks[track_name];
    var points: Vector[] = [];
    const node1 = infra.nodes[track.nodes[0]];
    points.push(new Vector(node1.x, node1.y));
    if ("shaping_points" in track) {
      if ("points" in track.shaping_points) {
        const shapingPoints = Array();
        for (let shapingCoords of track.shaping_points.points) {
          points.push(
            new Vector(
              shapingCoords[0],
              shapingCoords[1]
            )
          );
        }
        // Reverse shaping points, if they are given from node2 to node1
        if (track.shaping_points.ref_node == track.nodes[1]) {
          shapingPoints.reverse();
        }
        points = points.concat(shapingPoints);
      }
    }
    const node2 = infra.nodes[track.nodes[1]];
    points.push(new Vector(node2.x, node2.y));

    // Reverse Y coordinate
    points = points.map(point => point.reverseY());

    // Update min/max values
    points.forEach((p) => {
      min_x = Math.min(min_x, p.x);
      max_x = Math.max(max_x, p.x);
      min_y = Math.min(min_y, p.y);
      max_y = Math.max(max_y, p.y);
    });
    console.log(points);
    tracks.push({
      name: track_name,
      points: points,
    });
  }

  //Normalize coordinates
  tracks.forEach(track => {
      track.points = track.points.map(point => {
          return point.minus(new Vector(min_x, min_y))
      });
  });
  console.log(tracks, max_x - min_x, max_y);


  return {
    tracks: tracks,
    maxX: max_x - min_x,
    maxY: max_y - min_y,
  };
}
