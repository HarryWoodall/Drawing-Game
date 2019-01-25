export default function sketch(sketch) {
  let x;
  let y;
  let isDrawing = false;
  let isEnabled = true;
  let previousX = -1;
  let previousY = -1;
  let socket;

  let line = [];
  let drawing = [];

  sketch.setup = function() {
    x = window.innerWidth * 0.8;
    y = window.innerHeight * 0.7;
    sketch.background(255);
    sketch.createCanvas(x, y);
    drawBorder();
  };

  //sketch.draw = function() {};

  sketch.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    socket = props.socket;

    console.log("props Changed");
    if (props.isComplete) {
      sketch.clear();
      console.log("clearing Sketch");

      //Debug Stuff
      drawBorder();
      console.log("re-drawing Border");

      drawSketch(drawing);
      console.log("drawing Sketch");
      emitDrawing();
    }
  };

  sketch.mousePressed = function() {
    setUpDraw();
  };

  sketch.mouseReleased = function() {
    endLine();
  };

  sketch.mouseDragged = function() {
    draw();
  };

  sketch.touchStarted = function() {
    setUpDraw();
  };

  sketch.touchEnded = function() {
    endLine();
  };

  sketch.touchMoved = function() {
    draw();
  };

  //Helper Functions

  function drawBorder() {
    sketch.strokeWeight(1);
    sketch.rect(0, 0, x - 1, y - 1);
    sketch.stroke(0);
    sketch.strokeWeight(4);
  }

  function draw() {
    if (isDrawing && isEnabled) {
      addPoint(sketch.mouseX, sketch.mouseY);
      sketch.line(previousX, previousY, sketch.mouseX, sketch.mouseY);
      previousX = sketch.mouseX;
      previousY = sketch.mouseY;
    }
  }

  function setUpDraw() {
    addPoint(sketch.mouseX, sketch.mouseY);
    isDrawing = true;
    previousX = sketch.mouseX;
    previousY = sketch.mouseY;
  }

  function addPoint(xOrd, yOrd) {
    let point = {
      x: xOrd,
      y: yOrd
    };
    line.push(point);
  }

  function endLine() {
    isDrawing = false;
    drawing.push(line);
    line = [];
  }

  function emitDrawing() {
    let data = {
      dimentions: {
        width: x,
        height: y
      },
      content: drawing
    };
    socket.emit("SEND_DRAWING", data);
  }

  function drawSketch(data) {
    let prevX = -1;
    let prevY = -1;
    for (let line of data) {
      for (let point of line) {
        if (prevX !== -1 && prevY !== -1) {
          sketch.line(prevX, prevY, point.x, point.y);
        }
        prevX = point.x;
        prevY = point.y;
      }
      prevX = -1;
      prevY = -1;
    }
  }
}