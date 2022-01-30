//define board variable
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
//define variables
/* 
players: player symbols
currentplayer: %1 value to determine current player
avalible: empty board spots
tt: boolean to finish game
*/
let players = ["X", "O"];
let currentPlayer;
let available = [];
let tt = false;

//setup function
function setup() {
  //create canvas
  let ttttt = createCanvas(400, 400);
  //assign parent in html to allow for text under canvas
  ttttt.parent("sketch-holder");
  //set framerate to 30fps
  frameRate(30);
  //randomly choose a first player
  currentPlayer = floor(random(players.length));
  //fill `avalible` with all board slots
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }
}

//set winner to current player (1D always ends on first turn)
function checkWinner() {
  let winner = null;

  if (currentPlayer == 1) {
    return "X";
  } else {
    return "O";
  }
}
//choose a random spot for the cpu to place a symbol
function nextTurn() {
  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];
  board[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}
//play 1 turn on mouse press
function mousePressed() {
  nextTurn();
  tt = true;
}
//draw function
function draw() {
  //set background to white
  background(255, 255, 255);
  //variables for drawing lines and players
  let w = width / 3;
  let h = height / 3;
  //set line stroke thickness to 4px
  strokeWeight(4);

  //draw board
  //vertical
  line(w, 0 + h, w, height - h);
  line(w * 2, 0 + h, w * 2, height - h);
  //horizontal
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  //loop and check all board spaces to see if anyone has played
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * 1 + h / 2;
      let spot = board[i][j];
      //textSize(32);
      if (spot == players[1]) {
        //draw ellipse if O played
        noFill();
        ellipse(x, width / 2, w / 2);
      } else if (spot == players[0]) {
        //draw cross if X played
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }
    }
  }
//announce who won in html if a winner has won
  let result = checkWinner();
  if (result != null && tt == true) {
    noLoop();
    let resultP = createP("");
    resultP.style("font-family", "Poppins");
    resultP.style("font-size", "32pt");
    if (result == "tie") {
      resultP.html("Tie!");
    } else {
      resultP.html(`${result} wins!`);
    }
  } /*else {
     nextTurn();
  }*/
}
