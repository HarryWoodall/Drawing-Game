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
          this.errors.unrecievedSettingsData();
        }
      })
      .catch(error => {
        console.log("Unable to get Settings Data", error);
        console.log(this);

        this.errors.unrecievedSettingsData();
      });
  }
}

export default SettingsData;
