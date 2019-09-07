class ErrorMessages {
  constructor(onError, userName) {
    this.onError = onError;
    this.timeoutDuration = 1000;
    this.userName = userName || null;
    this.currentErrorMessage = null;

    this.sendData = this.sendData.bind(this);
    this.drawingSentTimeout = this.drawingSentTimeout.bind(this);
    this.catchFetchError = this.catchFetchError.bind(this);
  }

  sendData() {
    fetch("/api/errors", {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        user: this.userName,
        errorMessage: this.currentErrorMessage
      }),
      method: "POST"
    }).then(response => {
      response.json().then(data => {
        console.log(data);
      });
    });
  }

  drawingSentTimeout() {
    if (!this.drawingSentTimer) {
      this.drawingSentTimer = setTimeout(() => {
        this.currentErrorMessage = "Failed to return Peer Drawing";
        this.onError(this.currentErrorMessage);
        this.sendData();
      }, this.timeoutDuration);
    } else {
      clearTimeout(this.drawingSentTimer);
      this.drawingSentTimer = undefined;
    }
  }

  catchFetchError(message) {
    this.currentErrorMessage = message;
    this.onError(this.currentErrorMessage);
    this.sendData();
  }
}

export default ErrorMessages;
