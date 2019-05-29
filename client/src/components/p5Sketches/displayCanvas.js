export default function displayCanvas(sketch) {
  let x;
  let y;
  let xScale;
  let yScale;
  let drawing;

  sketch.setup = function() {
    x = window.innerWidth * 0.54;
    y = window.innerHeight * 0.475;
    sketch.background(255);
    sketch.createCanvas(x, y);
    sketch.strokeWeight(4);
  };

  sketch.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.drawingData !== null) {
      console.log("drawing recienved", props.drawingData);

      drawing = props.drawingData.content;
      xScale = x / props.drawingData.dimentions.width;
      yScale = y / props.drawingData.dimentions.height;
      console.log("drawing other sketch");
      drawSketch(drawing);
    }
  };

  //Helper Functions

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
