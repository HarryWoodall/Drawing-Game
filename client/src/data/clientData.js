class ClientData {
  constructor(userName) {
    this.userName = userName;
    this.score = 0;
    this.lastSuggestion = null;
    this.suggestion = null;
    this.selfDrawing = null;
    this.peerDrawing = null;
    this.guess = null;
  }

  // sendData(isNewRoom, roomName) {
  //   fetch("/", {
  //     headers: {
  //       "content-type": "application/json; charset=UTF-8"
  //     },
  //     body: JSON.stringify({
  //       newRoom: isNewRoom,
  //       roomName: roomName,
  //       userName: this.userName
  //     }),
  //     method: "POST"
  //   }).then(response => {
  //     console.log(response);
  //     response.json().then(data => {
  //       console.log(data);
  //     });
  //   });
  // }

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
}

export default ClientData;
