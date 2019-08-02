class ClientData {
  constructor(userName) {
    this.userName = userName;
    this.score = 0;
    this.scoreWeightData = [];
    this.lastSuggestion = null;
    this.suggestion = null;
    this.selfDrawing = null;
    this.peerDrawing = null;
    this.guess = null;
    this.debuffSelectionAvailable = false;
    this.currentMods = [];
  }

  getSuggestion() {
    return fetch("/api/drawing/categories/random/1")
      .then(res => res.json())
      .then(data => {
        if (this.lastSuggestion === data[0]) {
          this.getSuggestion();
        } else {
          this.suggestion = data[0];
          this.lastSuggestion = this.suggestion;
        }
      });
  }

  reset() {
    this.suggestion = null;
    this.selfDrawing = null;
    this.peerDrawing = null;
    this.guess = null;
  }

  roundReset() {
    this.reset();
    this.scoreWeightData = [];
    this.debuffSelectionAvailable = false;
    // this.currentMods = []; // Possible Error
  }
}

export default ClientData;
