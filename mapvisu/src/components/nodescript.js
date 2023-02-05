const fs = require("fs");
fs.readFile("../../public/infrastructure.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  const contentraw = jsonString;

  let content = JSON.parse(contentraw);
  //const jsonString = JSON.stringify(customer, null, 2);

  const offsetX = 4657928.97099938-(9945017.67352433/2.6);
  const offsetY = 9945017.67352433-(9945017.67352433/3.4);


//   "x": 4657928.97099938,
//   "y": 9945017.67352433

//   maxX
// : 
// 12605702.22569291
//4910214.41621156
// maxY
// : 
// 14243729.6272527
// 10051524.3593215

let points = 0
let tracks = 0
let nodes = 0

  for (node_name in content.nodes) {
    content.nodes[node_name].x = content.nodes[node_name].x - offsetX;
    content.nodes[node_name].y = content.nodes[node_name].y - offsetY;
    nodes = nodes +1
  }
  for (track_name in content.tracks) {
    track = content.tracks[track_name];
    tracks = tracks +1

    if ("shaping_points" in track) {
      if ("points" in track.shaping_points) {
        points = points+1
        for (let shapingCoords of track.shaping_points.points) {
           shapingCoords[0] = shapingCoords[0] - offsetX;
           shapingCoords[1] = shapingCoords[1] - offsetY;
        }
      }
    }
  }
  console.log("n", nodes, " t", tracks, " p", points)
  fs.writeFile("./data.json", JSON.stringify(content, null, 2), (err) => {
    if (err) console.log("Error writing file:", err);
  });
});