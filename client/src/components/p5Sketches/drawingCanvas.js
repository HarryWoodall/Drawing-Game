export default function sketch(sketch) {
  let x;
  let y;
  let isDrawing = false;
  let isEnabled = true;
  let previousX = -1;
  let previousY = -1;
  let socket;
  let owner;

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
    owner = props.owner;

    if (props.isDrawn) {
      emitDrawing(props.suggestion);
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
    sketch.stroke(155);
    sketch.strokeWeight(4);
    sketch.rect(0, 0, x, y);
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

  function emitDrawing(suggestion) {
    if (isDrawing) {
      endLine();
    }

    let data = {
      suggestion: suggestion,
      dimentions: {
        width: x,
        height: y
      },
      content: drawing,
      ownerName: owner
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
