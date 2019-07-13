class Mirror {
  constructor(sketch, width, height) {
    this.sketch = sketch;
    this.width = width;
    this.height = height;

    console.log(width, height);
  }

  mod(xOrd, yOrd, orientation) {
    switch (orientation) {
      case "HORIZONTAL":
        return this.flipHorzontal(xOrd, yOrd);
      case "VERTICAL":
        return this.flipVertical(xOrd, yOrd);
      case "BOTH":
        return this.flipBoth(xOrd, yOrd);
      default:
        console.log("ERROR");
        break;
    }
  }

  flipHorzontal(xOrd, yOrd) {
    return {
      x: xOrd,
      y: this.height - yOrd
    };
  }

  flipVertical(xOrd, yOrd) {
    console.log(this.width - xOrd, yOrd);

    return {
      x: this.width - xOrd,
      y: yOrd
    };
  }

  flipBoth(xOrd, yOrd) {
    return {
      x: this.width - xOrd,
      y: this.height - yOrd
    };
  }
}

export default Mirror;
