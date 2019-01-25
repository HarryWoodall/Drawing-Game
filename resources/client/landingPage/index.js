let newRoomBtn = document.getElementById("new-room-button");
let enterRoomBtn = document.getElementById("enter-room-button");
let roomNameInput = document.getElementById("room-name-input");
let userNameInput = document.getElementById("user-name-input");

let isNewRoom = false;

enterRoomBtn.disabled = true;
roomNameInput.style.visibility = "visible";

function toggleButton() {
  isNewRoom = !isNewRoom;
  enterRoomBtn.disabled = !enterRoomBtn.disabled;
  newRoomBtn.disabled = !newRoomBtn.disabled;

  roomNameInput.style.visibility = newRoomBtn.disabled ? "hidden" : "visible";
}

function postData() {
  var xhr = new XMLHttpRequest();
  var url = "/";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      console.log(json);
    }
  };
  var data = {
    newRoom: isNewRoom,
    roomName: roomNameInput.value,
    userName: userNameInput.value
  };
  xhr.send(JSON.stringify(data));
}
