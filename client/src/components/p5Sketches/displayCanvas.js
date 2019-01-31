export default function displayCanvas(sketch) {
  let x;
  let y;
  let xScale;
  let yScale;
  let socket;
  let drawing;

  sketch.setup = function() {
    x = window.innerWidth * 0.6;
    y = window.innerHeight * 0.525;
    sketch.background(255);
    sketch.createCanvas(x, y);
    drawBorder();
  };

  //sketch.draw = function() {};

  sketch.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    socket = props.socket;
    socket.on("OTHER_DRAWING", data => {
      drawing = data.content;
      xScale = x / data.dimentions.width;
      yScale = y / data.dimentions.height;
      console.log("drawing other sketch");
      drawSketch(drawing);
    });
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
        prevX = point.x * xScale;
        prevY = point.y * yScale;
      }
      prevX = -1;
      prevY = -1;
    }
  }
}
