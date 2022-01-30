//testing board below
/*
let board = [
  [
    ['X','V','N'],
    ['X','V','N'],
    ['X','V','n']
  ],
  [
    ['S','D','F'],
    ['S','D','F'],
    ['S','D','F']
  ],
  [
    ['A','B','C'],
    ['A','B','C'],
    ['A','B','C']
  ]
]; */
//create new cube object to act as board, filled with `■` symbols
let board = new cube("■");

//define player symbols
let players = ["X", "O"];
//define current player and avalible spaces
let currentPlayer;
let available = [];

//setup function
function setup() {
  //create canvas
  let op = createCanvas(400, 400);
  //allow for html text under canvas
  op.parent("sketch-holder");
  //set framerate to 30fps
  frameRate(30);
  //choose a random first player
  currentPlayer = floor(random(players.length));
  //fill `avalible` with all board spaces
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      for (let u = 0; u < 3; u++) {
        available.push([i, j, u]);
      }
    }
  }
}
//function to check if 3 values are equal
function equals3(a, b, c) {
  return a == b && b == c && a != "■";
}
//play a turn, fill one space with current player's symbol
function nextTurn() {
  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];
  let u = spot[2];
  board.space[i][j][u] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}
//play a new move on mouse press
function mousePressed() {
  nextTurn();
}
//draw function
function draw() {
  //white background
  background(255, 255, 255);
  //thick line size
  strokeWeight(4);
  //allow for 3d drawings
  let drawX = 0;
  let drawY = 0;
  let drawZ = 0;
  //set fill color to black
  fill(0);

  //draw board using 3 nested loops
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let u = 0; u < 3; u++) {
        textSize(32);
        text(
          board.space[i][j][u],
          80 * drawX + 20 * drawY + 90,
          80 * drawZ + 20 * drawY + 100
        );
        drawX++;
      }
      drawY++;
      drawX = 0;
    }
    drawZ++;
    drawY = 0;
  }
  //if winner has won then announce it
  let result = board.checkWinner();
  if (result != null) {
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
  } */
}
