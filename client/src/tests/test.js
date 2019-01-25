export function Tests() {
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
    newRoom: false,
    roomName: "TEST_ROOM",
    userName: "User" + Math.random() * 1000
  };
  xhr.send(JSON.stringify(data));
}
