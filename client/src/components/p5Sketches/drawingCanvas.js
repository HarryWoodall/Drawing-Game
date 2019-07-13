import InvisibleInk from "./mods/invisibleInk";
import Mirror from "./mods/mirror";
import Offset from "./mods/offset";

export default function sketch(sketch) {
  let x = window.innerWidth * 0.8;
  let y = window.innerHeight * 0.7;
  let isDrawing = false;
  let isEnabled = true;
  let previousX = -1;
  let previousY = -1;
  let handleDrawingEnd;
  let strokeColor = 0;
  let backgroundColor = 255;

  let currentMods = [];
  let invisibleInk = new InvisibleInk(sketch, strokeColor, backgroundColor);
  let mirror = new Mirror(sketch, x, y);
  let offSet = new Offset(sketch);

  let line = [];
  let drawing = [];

  sketch.setup = function() {
    sketch.background(backgroundColor);
    sketch.createCanvas(x, y);
    sketch.strokeWeight(4);
  };

  sketch.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    handleDrawingEnd = props.getDrawing;
    currentMods = props.mods;
    if (props.isComplete) {
      getDrawing(props.suggestion);
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

  function draw() {
    if (isDrawing && isEnabled) {
      const ords = modOrds(sketch.mouseX, sketch.mouseY);

      addPoint(ords.x, ords.y);
      sketch.line(previousX, previousY, ords.x, ords.y);
      previousX = ords.x;
      previousY = ords.y;
    }
  }

  function setUpDraw() {
    enableMods();
    const ords = modOrds(sketch.mouseX, sketch.mouseY);
    addPoint(ords.x, ords.y);
    isDrawing = true;
    previousX = ords.x;
    previousY = ords.y;
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

  function getDrawing(suggestion) {
    if (isDrawing) {
      endLine();
    }
    let dimentions = {
      width: x,
      height: y
    };
    handleDrawingEnd(dimentions, drawing);
  }

  function enableMods() {
    if (currentMods) {
      for (let mod of currentMods) {
        switch (mod) {
          case "INVISIBLE_INK":
            invisibleInk.setMod();
            break;
          case "OFFSET":
            offSet.getNewOffSet();
            break;
          default:
            break;
        }
      }
    }
  }

  function modOrds(xOrd, yOrd) {
    let x = xOrd;
    let y = yOrd;
    if (currentMods.length) {
      for (let mod of currentMods) {
        switch (mod) {
          case "MIRROR-H":
            x = mirror.mod(x, y, "HORIZONTAL").x;
            y = mirror.mod(x, y, "HORIZONTAL").y;
            break;
          case "MIRROR-V":
            x = mirror.mod(x, y, "VERTICAL").x;
            y = mirror.mod(x, y, "VERTICAL").y;
            break;
          case "MIRROR-B":
            x = mirror.mod(x, y, "BOTH").x;
            y = mirror.mod(x, y, "BOTH").y;
            break;
          case "OFFSET":
            x = offSet.mod(x, y).x;
            y = offSet.mod(x, y).y;
            break;
          default:
            break;
        }
      }
    }
    return {
      x: x,
      y: y
    };
  }
}
