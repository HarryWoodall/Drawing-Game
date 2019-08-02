class SettingsData {
  constructor() {
    this.roomSettings = {
      drawTime: 4,
      countdownTime: 0.5,
      gameCompleteTime: 0.5,
      gamesInRound: 1, // Will update from server settings on game start
      debuffsActive: true
    };
  }
}

export default SettingsData;
