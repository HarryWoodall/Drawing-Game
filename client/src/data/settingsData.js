class SettingsData {
  constructor(errors) {
    this.roomSettings = {};
    this.errors = errors;

    this.getSettings = this.getSettings.bind(this);
  }

  getSettings(roomName, onReceive) {
    fetch("/api/settings/" + roomName)
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.roomSettings = data;
          onReceive();
        } else {
          this.errors.catchFetchError(
            "Failed to recieve settings data from server"
          );
        }
      })
      .catch(error => {
        console.log("Unable to get Settings Data", error);
        console.log(this);

        this.errors.catchFetchError(
          "Failed to recieve settings data from server"
        );
      });
  }
}

export default SettingsData;
