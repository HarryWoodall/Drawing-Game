import React, { Component } from "react";
import Game from "../game/game";
import DrawingCanvas from "../drawing game/drawing phase/drawing area/drawing canvas/drawingCanvas";
import Countdown from "../drawing game/drawing phase/drawing area/countdown/countdown";
import DrawingArea from "../drawing game/drawing phase/drawing area/drawingArea";
import TimerBar from "../drawing game/drawing phase/timer bar/timerBar";
import DrawingPhase from "../drawing game/drawing phase/drawingPhase";
import GuessingPhase from "../drawing game/guessing phase/guessingPhase";
import DrawingGame from "../drawing game/drawingGame";
import ViewingCanvas from "../drawing game/guessing phase/viewing canvas/viewingCanvas";
import InputGuess from "../drawing game/guessing phase/guess area/input guess/inputGuess";
import OutputResult from "../drawing game/guessing phase/guess area/output result/outputResult";
import PeerReview from "../drawing game/guessing phase/guess area/peer review/peerReview";

import TextInput from "../landing/text input/textInput";
import ToggleButtons from "../landing/toggle buttons/toggleButtons";
import LandingPage from "../landing/landingPage";

import LobbyUserList from "../lobby/lobby user list/lobbyUserList";
import Lobby from "../lobby/lobby";

import Leaderboard from "../game/intermission/leaderboard/leaderboard";
import Intermission from "../game/intermission/intermission";

import Settings from "../game/settings/settings";

import ClientData from "../../data/clientData";
import RoomData from "../../data/roomData";
import SettingsData from "../../data/settingsData";

class testApp extends Component {
  constructor() {
    super();
    this.roomData = new RoomData("Room_01", "Frank", [
      "Billy",
      "Frank",
      "Bobby",
      "Jimmy",
      "Bill",
      "Ben",
      "James",
      "Kathy",
      "Beth"
    ]);
    this.clientData = new ClientData("Frank");
    this.clientData.peerDrawing = { suggestion: "flowers", owner: "Polly" };
    this.peerResult = { answer: "Grape", guess: "Pinapple", owner: "Polly" };
    this.roomData.scoreData = {
      leaderboardData: [
        { name: "Billy", score: 3 },
        { name: "Frank", score: 4 },
        { name: "DingleFinger", score: 6 },
        { name: "Beth", score: 700 },
        { name: "Kathy", score: 4 },
        { name: "James", score: 5 },
        { name: "Ben", score: 3 }
      ],
      bonusPointData: ["Kathy", "Kathy", "Frank", "Beth", "Ben", "Beth"]
    };
    this.settingsData = new SettingsData();
  }

  render() {
    if (this.props.testSet === "DRAWING_GAME") {
      switch (this.props.testName) {
        case "GAME":
          return <Game socket={this.props.socket} />;
        case "DRAWING_GAME":
          return <DrawingGame socket={this.props.socket} />;
        case "DRAWING_CANVAS":
          return <DrawingCanvas socket={this.props.socket} />;
        case "VIEWING_CANVAS":
          return <ViewingCanvas socket={this.props.socket} />;
        case "COUNTDOWN":
          return <Countdown />;
        case "DRAWING_AREA":
          return <DrawingArea socket={this.props.socket} />;
        case "TIMER_BAR":
          return <TimerBar time={2} />;
        case "DRAWING_PHASE":
          return (
            <DrawingPhase
              socket={this.props.socket}
              drawingCompletion={() => {
                console.log("completed");
              }}
              clientData={this.clientData}
            />
          );
        case "GUESSING_PHASE":
          this.clientData.peerDrawing = null;
          return (
            <GuessingPhase
              socket={this.props.socket}
              clientData={this.clientData}
            />
          );
        case "INPUT_GUESS":
          return <InputGuess clientData={this.clientData} />;
        case "OUTPUT_RESULT":
          this.clientData.guess = "flowers";
          return (
            <OutputResult
              socket={this.props.socket}
              clientData={this.clientData}
              peerResult={this.peerResult}
            />
          );
        case "PEER_REVIEW":
          return <PeerReview gotResult={true} peerResult={this.peerResult} />;
        default:
          return <h1>Invalid Test</h1>;
      }
    } else if (this.props.testSet === "LANDING_PAGE") {
      switch (this.props.testName) {
        case "LANDING_PAGE":
          return <LandingPage />;
        case "TEXT_INPUT":
          return <TextInput newRoom={false} />;
        case "TOGGLE_BUTTONS":
          return <ToggleButtons />;
        default:
          return <h1>Invalid Test</h1>;
      }
    } else if (this.props.testSet === "LOBBY") {
      switch (this.props.testName) {
        case "LOBBY":
          return (
            <Lobby
              clientData={this.clientData}
              roomData={this.roomData}
              socket={this.props.socket}
              settingsData={this.settingsData}
            />
          );
        case "LOBBY_USER_LIST":
          return (
            <LobbyUserList
              clientData={this.clientData}
              roomData={this.roomData}
            />
          );
        default:
          return <h1>Invalid Test</h1>;
      }
    } else if (this.props.testSet === "INTERMISSION") {
      switch (this.props.testName) {
        case "LEADERBOARD":
          return (
            <Leaderboard
              roomData={this.roomData}
              clientData={this.clientData}
              onScoreUpdate={() => {
                console.log("Score Updated");
              }}
              onBonusComplete={() => console.log("Bonus Complete")}
            />
          );
        case "INTERMISSION":
          return (
            <Intermission
              roomData={this.roomData}
              socket={this.props.socket}
              clientData={this.clientData}
              settingsData={this.settingsData}
              onScoreUpdate={() => console.log("Score Updated")}
            />
          );
        default:
          return <h1>Invalid Test</h1>;
      }
    } else if (this.props.testSet === "SETTINGS") {
      switch (this.props.testName) {
        case "SETTINGS":
          return (
            <Settings
              settingsData={this.settingsData}
              socket={this.props.socket}
            />
          );
        default:
          return <h1>Invalid Test</h1>;
      }
    } else {
      return <h1>Invalid Test Set</h1>;
    }
  }
}

testApp.defaultProps = {
  testSet: "DRAWING_GAME"
};

export default testApp;
