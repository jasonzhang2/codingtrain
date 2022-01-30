//Declaring variables
//setting up playing board as 3 x 3 array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

//Defines width of board
let w; 
//Defines lengths of board
let h; 
//Defines players 'human' and 'human2' as 'X' and 'O'
let human = 'O';
let human2 = 'X';
//Setting the player starting with
let currentPlayer = human;
//Creating the canvas and setting the height and width as one thrid the entire board to create 9 grids
function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
}
//Checking if a spot is occupied
function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

//Determines a winner
function checkWinner() {
  let winner = null;

  // Checks if any 3 horizontal grids matchand returns a winner
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  //Checks if any 3 vertical grids matchand returns a winner
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  //Checks if any 3 diagonal grids match and returns a winner
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  //Checks if there are any spots in the board array are still blank
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }
  //Checks that if function winner remains null or if there are no more open spots but there is still no winner, return tie
  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}
//Places player marker depending on mouse position
function mousePressed() {
  //When the currentplayer is human, the mouse pressed spot will be set as the current players marker
  if (currentPlayer == human) {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (board[i][j] == '') {
      board[i][j] = human;
      //After the first player places their marker, the current player becomes the second player and will pass the turn back after placing a marker
      currentPlayer = human2;
    }
  }
  if (currentPlayer == human2) {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (board[i][j] == '') {
      board[i][j] = human2;
      currentPlayer = human;
    }
  }
}
//sets up the board as a 3 x 3
function draw() {
  background(255);
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
  //Checks each spot on the 3 x 3 grid
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      //if the player placing the marker is human; it will draw an ellipse
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      //if the player placing the marker is human2; it will draw an X
      } else if (spot == human2) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }
//checks for winner
  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}
