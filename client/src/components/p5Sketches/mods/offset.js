class Offset {
  constructor(sketch) {
    this.sketch = sketch;
    this.currentXOffset = 0;
    this.currentYOffset = 0;
  }

  getNewOffSet() {
    this.currentXOffset = Math.random() * 20 + 10;
    this.currentYOffset = Math.random() * 20 + 10;

    this.currentXOffset *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    this.currentYOffset *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
  }

  mod(xOrd, yOrd) {
    return {
      x: xOrd + this.currentXOffset,
      y: yOrd + this.currentYOffset
    };
  }
}

export default Offset;
