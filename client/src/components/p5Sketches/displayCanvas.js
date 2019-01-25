import socketAPI from "../../sockets/api";

export default function displayCanvas(sketch) {
  let x;
  let y;
  let xScale;
  let yScale;
  let socket;

  let line = [];
  let drawing = [];

  sketch.setup = function() {
    x = window.innerWidth * 0.8;
    y = window.innerHeight * 0.7;
    sketch.background(255);
    sketch.createCanvas(x, y);
    drawBorder();
    drawSketch();
    socket.on("DRAWING_GAME_01_EMMIT_NEW_DRAWING", data => {
      drawing = data.content;
      xScale = x / data.width;
      yScale = y / data.height;
    });
  };

  //sketch.draw = function() {};

  sketch.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    socket = props.socket;
    console.log("props Changed");
  };

  //Helper Functions

  function drawBorder() {
    sketch.strokeWeight(1);
    sketch.rect(0, 0, x - 1, y - 1);
    sketch.stroke(0);
    sketch.strokeWeight(4);
  }

  function drawSketch(data) {
    let prevX = -1;
    let prevY = -1;
    for (let line of data) {
      for (let point of line) {
        if (prevX !== -1 && prevY !== -1) {
          sketch.line(prevX, prevY, point.x * xScale, point.y * yScale);
        }
        prevX = point.x;
        prevY = point.y;
      }
      prevX = -1;
      prevY = -1;
    }
  }
}
