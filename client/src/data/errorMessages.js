class ErrorMessages {
  constructor(onError) {
    this.onError = onError;
    this.timeoutDuration = 1000;
    this.currentErrorMessage = null;

    this.sendData = this.sendData.bind(this);
    this.drawingSentTimeout = this.drawingSentTimeout.bind(this);
    this.unrecievedSettingsData = this.unrecievedSettingsData.bind(this);
  }

  sendData() {
    fetch("/api/errors", {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
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
        this.onError();
        this.sendData();
      }, this.timeoutDuration);
    } else {
      clearTimeout(this.drawingSentTimer);
      this.drawingSentTimer = undefined;
    }
  }

  unrecievedSettingsData() {
    this.currentErrorMessage = "Failed to recieve settings data from server";
    this.onError();
    this.sendData();
  }
}

export default ErrorMessages;
