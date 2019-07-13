class InvisibleInk {
  constructor(sketch, strokeColor, backgroundColor) {
    this.sketch = sketch;
    this.backgroundColor = backgroundColor;
    this.strokeColor = strokeColor;
  }

  setMod() {
    this.sketch.stroke(this.backgroundColor);
  }

  unsetMod() {
    this.sketch.stroke(this.strokeColor);
  }
}

export default InvisibleInk;
