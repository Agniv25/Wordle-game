var tile = document.querySelector(".tile-container");
var keyContainer = document.querySelector(".key-container");
var messageArea = document.querySelector(".message-area");
var rowIndex = 1;
var tileIndex = 0;
var ans = "";
var output = "";

//fetching the word
const fetchUrl =
  "https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase";

fetch(fetchUrl)
  .then((response) => response.json())
  .then((json) => (ans = json[0]))
  .catch((err) => console.log(err));

//for the keys
const keyboard = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "<<",
];

//adding the event listener to the physical keyboard

document.addEventListener("keydown", (e) => {
  if (e.key >= "a" && e.key <= "z") display(e.key.toUpperCase());
  else if (e.key == "Enter") {
    display("ENTER");
  } else if (e.key == "Backspace") {
    display("<<");
  }
});

//adding event listener to virtual keyboard
keyboard.forEach((item) => {
  var key = document.createElement("div");
  key.setAttribute("id", item);
  key.innerHTML = item;

  //adding the event listener
  key.addEventListener("click", (e) => {
    display(e.target.id);
  });
  key.classList.add("key");
  keyContainer.append(key);
});

//for the tiles
for (var i = 1; i <= 6; i++) {
  var row = document.createElement("div");
  row.setAttribute("id", "row" + i);
  for (var j = 1; j <= 5; j++) {
    var element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("id", "row-" + i + "-tile-" + j);
    row.append(element);
  }
  tile.append(row);
}

//to display on the screen
function display(e) {
  var char = e;

  //if ENTER then check whether the tile is full or not and call the checkAns function
  if (char == "ENTER") {
    if (tileIndex == 5) {
      checkAns();
    }
    return;
  }

  //if "<<" then check whether the tile is empty or not then erase the value;
  else if (char == "<<") {
    if (rowIndex >= 1) {
      document.querySelector(
        "#row-" + rowIndex + "-tile-" + tileIndex
      ).innerHTML = "";
      document
        .querySelector("#row-" + rowIndex + "-tile-" + tileIndex)
        .classList.remove("taken");
      output = output.substring(4, 1);
      tileIndex--;
    }
    return;
  }

  //if tileIndex<=5 increment it
  if (tileIndex < 5) {
    tileIndex++;
    var item = document.querySelector(
      "#row-" + rowIndex + "-tile-" + tileIndex
    );
    item.innerHTML = char;
    item.classList.add("taken");

    output += char;
  }
  // console.log(tileIndex);
}

//to check whether the answer is meaningful or not
function checkAns() {
  // tileIndex = 6;
  const isMeaningFullUrl =
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + output;
  fetch(isMeaningFullUrl).then((response) => {
    if (response.status === 404) {
      notify("Word Not Found");
      return;
    }

    // if meaningfull then call the match answer
    matchAns();
  });
}

function matchAns() {
  var tempAns = ans;

  console.log(output);
  var index = 1;
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      var item = document.querySelector("#row-" + rowIndex + "-tile-" + index);
      item.classList.remove("taken");
      var key = document.querySelector("#" + item.innerHTML);
      item.classList.add("flipping");
      if (
        item.innerHTML == ans[index - 1] &&
        tempAns.includes(ans[index - 1])
      ) {
        if (key.classList.contains("yellow")) {
          key.classList.remove("yellow");
        }
        item.classList.add("green");

        tempAns = tempAns.replace(item.innerHTML, "");
        console.log(tempAns);

        key.classList.add("green");
      } else if (tempAns.includes(item.innerHTML)) {
        item.classList.add("yellow");
        tempAns = tempAns.replace(item.innerHTML, "");
        if (!key.classList.contains("green")) {
          key.classList.add("yellow");
        }
      } else {
        item.classList.add("grey");
        if (
          !key.classList.contains("green") &&
          !key.classList.contains("yellow")
        ) {
          key.classList.add("grey");
        }
      }
      index++;

      if (index > 5) {
        tileIndex = 0;
        rowIndex++;

        if (output === ans) {
          notify("GENIUS");
          return;
          // gameover();
        }
        if (rowIndex > 6) {
          notify("GAME OVER");
        }
        output = "";
      }
    }, 600 * i);
  }
}

//the notification
function notify(message) {
  messageArea.innerHTML = message;
  messageArea.classList.add("notify");
  if (message == "GENIUS") {
    for (var i = 0; i < 5; i++) {
      setTimeout(() => {});
    }
  }
  setTimeout(() => {
    messageArea.classList.remove("notify");
    messageArea.innerHTML = "";
  }, 1000);
  if (message != "Word Not Found") {
    console.log(message);
    gameOver();
  }
}

//function to over the game
function gameOver() {
  rowIndex = 7;
  tileIndex = 7;
}
