// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/149-tic-tac-toe.html
// https://youtu.be/GTWrWM1UsnA
// https://editor.p5js.org/codingtrain/sketches/5JngATm3c
// Modified by Stefan Martincevic

//Declaring all variables

//Board containing positions where players played
//Held in a variable set equal to a multidimensional array
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

//Available players to play
let players = ["X", "O"];
//Panel for messaging and score reporting
let resultP;
//Player that plays
let currentPlayer;
//Available boxes for play
let available = [];
//Wait till next user play
let wait = true;
//X position of the mouse click
let posX;
//Y position of the mouse click
let posY;
//Container for checkbox switch
let toggleSwitch;
// canvas coordinate offset
let offset;
// button for restart of the game
let newGame;               

//Function that setsup how the canvas should look like
function setup() {
  //Creating a checkbox
  toggleSwitch = createP("");
  //Inputting a textbox through html
  toggleSwitch.html(
    '<label> <input id="chkSmartPlay" type="checkbox" > Inteligent Cpu </label>'
  );
  //Setting the font size
  toggleSwitch.style("font-size", "24pt");
  //Setting the text colour
  toggleSwitch.style("color", "black");
  //Setting as true when first used
  document.getElementById("chkSmartPlay").checked = true;

  //canvas size in pixels
  createCanvas(400, 400);
  //Setting the frame rate
  frameRate(20);

  //Creating a message panel
  resultP = createP("");
  //Setting the font size
  resultP.style("font-size", "32pt");
  //Setting the text colour
  resultP.style("color", "black");
  
  // create button 
  newGame = createP('');
  newGame.html("<button onclick=\"restart()\">New Game</button>");

  //Register event handler for mouse click on canvas
  canvas.addEventListener("click", mousePos, true);

  //Populating available array with x,y indexes of the board
  currentPlayer = floor(random(players.length));

  // assign canvas offset
  offset = canvas.getBoundingClientRect();

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }
}

//Logs available fields to the console
function logAvailable() {
  for (let i = 0; i < available.length; i++) console.log(available[i]);
}

//Logs board data to the console
function logBoard() {
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      console.log(i, j, board[i][j]);
    }
  }
}

// New Game button event handler - reset the game
function restart(){
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  available = [];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }
  resultP.html("");
  document.getElementById("chkSmartPlay").disabled = false;
}

// Finds two symbols are in diagonal
// ch - symbol to find
// return true if found, false otherwise
 function isDiagonal(ch){
   return (board[0][0] === board[2][2] && board[0][0] === ch) || (board[2][0] === board[0][2] && board[2][0] === ch)
}

// Finds index of the symbol in diagonal corner
// ch - symbol to find
// return index if found, -1 otherwise
function FindDiagonal(ch){
   if(board[0][0] === ch) {
     return findAvailableIndex(2, 2);
   }
   else if (board[2][2] === ch){
     return findAvailableIndex(0, 0);       
   }
   else if (board[0][2] === ch){
     return findAvailableIndex(2, 0);       
   }
   else if (board[2][0] === ch){
     return findAvailableIndex(0, 2);       
   }  
   else
     return -1;
}


//Finds index in available array that match row and column index
//cor - column index
//row - row index
//Return found index or -1 if index is not found
function findAvailableIndex(col, row) {
  for (let i = 0; i < available.length; i++) {
    if (available[i][0] === col && available[i][1] === row) return i;
  }
  return -1;
}

//Finds index in available array that match row index
//row - row index
//Return found index or -1 if index is not found
function findAvailableIndexForRow(row) {
  for (let i = 0; i < available.length; i++) {
    if (available[i][1] === row) return i;
  }
  return -1;
}

//Finds index in available array that match column index
//cor - column index
//Return found index or -1 if index is not found
function findAvailableIndexForCol(col) {
  for (let i = 0; i < available.length; i++) {
    if (available[i][0] === col) return i;
  }
  return -1;
}

//Finds index in available array that match diagonal index
//d - diagonal index where number represent slope (-1 for main diagonal 1 for antidiagonal)
//Return found index, or -1 if index is not found or d is 0
function findAvailableIndexForDiagonal(d) {
  if (d === -1) {
    for (let i = 0; i < available.length; i++) {
      //indexes for x and y are the same on -1 slope diagonal
      if (available[i][0] === available[i][1]) return i;
    }
  } else if (d === 1) {
    for (let i = 0; i < available.length; i++)
      if (available[i][0] + available[i][1] === 2) return i;
  }
  return -1;
}

//Finds index of all corners in available array
//Return array of indexis of the cornenr elemants in available array
function findCornerElemnts() {
  var availableCorners = [];

  for (let i = 0; i < available.length; i++) {
    if (available[i][0] % 2 === 0 && available[i][1] % 2 === 0)
      availableCorners.push(i);
  }

  return availableCorners;
}

//Event handler for mouse click event
function mousePos(e) {
  //Get mouse position on the canvas
  posX = e.pageX - offset.left;
  posY = e.pageY - offset.top;

  //Get the box width and height
  let w = width / 3;
  let h = height / 3;

  //Get index of the clicked box
  let i = floor(posX / w);
  let j = floor(posY / h);

  //Find the box index in available box indexes
  let ix = findAvailableIndex(i, j);
  if (ix < 0) {
    //If not found try again
    resultP.html("Try again ...");
    return;
  }

  //Remove the box from available boxes
  available.splice(ix, 1);
  //Assign player symbol to the proper board indexes
  board[i][j] = players[currentPlayer];
  //Switch player
  currentPlayer = (currentPlayer + 1) % players.length;
  //Stop waiting for play
  wait = false;
  //Disable checkbox
  document.getElementById("chkSmartPlay").disabled = true;
}

//Checks if three elments are equal and none is empty
//Returns true if three elements are equal and none is empty, false otherwise
function equals3(a, b, c) {
  return a == b && b == c && a != "";
}

//Checks if two of three elments are equal and third is empty
//Returns true if two elements are equal and third is empty, false otherwise
function equals2(ch, a, b, c) {
  return (
    (a === ch && a === b && c === "") ||
    (a === ch && a === c && b === "") ||
    (b === ch && b === c && a === "")
  );
}

//Finds column index where there are two same characters in a column
//ch - character to search in a column
//Returns cloumn index if found, -1 otherwise
function hasTwoInColumn(ch) {
  for (let i = 0; i < 3; i++) {
    if (equals2(ch, board[i][0], board[i][1], board[i][2])) return i;
  }
  return -1;
}

//Finds row index where there are two same characters in a row
//ch - character to search in a row
//Returns row index if found, -1 otherwise
function hasTwoInRow(ch) {
  for (let j = 0; j < 3; j++) {
    if (equals2(ch, board[0][j], board[1][j], board[2][j])) return j;
  }
  return -1;
}

//Finds diagonal where there are two same characters in a diagonal
//ch - character to search in a diagonal
//Returns -1 if diagonal has falling slope, 1 if it has rising slope, 0 otherwise
function hasTwoInDiagonal(ch) {
  if (equals2(ch, board[0][0], board[1][1], board[2][2])) return -1;
  else if (equals2(ch, board[0][2], board[1][1], board[2][0])) return 1;
  else return 0;
}

//Checks for the winner
//Returns winning player sign or "tie"
function checkWinner() {
  let winner = null;

  //Horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) winner = board[i][0];
  }

  //Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) winner = board[0][i];
  }

  //Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) winner = board[0][0];

  if (equals3(board[2][0], board[1][1], board[0][2])) winner = board[2][0];

  if (winner == null && available.length == 0) return "tie";
  else return winner;
}

//Machine play next move randomly choosing position to play from available spots
function nextTurn() {
  //Get random index of all available in the array
  let index = floor(random(available.length));
  //Remove the element from the array
  let spot = available.splice(index, 1)[0];
  //Get box index from the spot variable
  let i = spot[0];
  let j = spot[1];
  //Assign the player symbol to the board index
  board[i][j] = players[currentPlayer];
  //Switch the player
  currentPlayer = (currentPlayer + 1) % players.length;
}

//Machine play next move strategicaly choosing position to play from available spots
function nextTurnSmart() {
  let spot; // coordinates of the played box
  let startIndexes = [0,2,4,6,8]; //position to choose for the game start
  
  // if start first choose the one of indexes
  if(available.length === 9){
    let startIx = floor(random(startIndexes.length));
    spot = available.splice(startIndexes[startIx], 1)[0];
  }
  else {
    //Try to win first, then try to block opponent win, the last try to play corner boxes if available else play side boxes.
    //Check if win is available for machine
    let ix_r = hasTwoInRow("O"); //index of posible three in a row
    let ix_c = hasTwoInColumn("O"); //index of posible three in a column
    let ix_d = hasTwoInDiagonal("O"); //index of posible three on a diagonal
    //Check if machine has to defend
    let ix_r_d = hasTwoInRow("X"); //index of posible three in a row for defense
    let ix_c_d = hasTwoInColumn("X"); //index of posible three in a column for defense
    let ix_d_d = hasTwoInDiagonal("X"); //index of posible three on a diagonal for defense

    if (ix_r >= 0) {
      //Find index of posible three in a row to win
      let index = findAvailableIndexForRow(ix_r);
      spot = available.splice(index, 1)[0];
    } else if (ix_c >= 0) {
      //Find index of posible three in a column to win
      let index = findAvailableIndexForCol(ix_c);
      spot = available.splice(index, 1)[0];
    } else if (ix_d != 0) {
      //Find index of posible three on a diagonal to win
      let index = findAvailableIndexForDiagonal(ix_d);
      spot = available.splice(index, 1)[0];
    } else if (ix_r_d >= 0) {
      //Find index of posible three in a row to block opponent
      let index = findAvailableIndexForRow(ix_r_d);
      spot = available.splice(index, 1)[0];
    } else if (ix_c_d >= 0) {
      //Find index of posible three in a column to block opponent
      let index = findAvailableIndexForCol(ix_c_d);
      spot = available.splice(index, 1)[0];
    } else if (ix_d_d != 0) {
      let index = findAvailableIndexForDiagonal(ix_d_d);
      spot = available.splice(index, 1)[0];
    } else {
      //Check if central box is available
      let ix = findAvailableIndex(1, 1);
      if (ix >= 0)
        //Take central box
        spot = available.splice(ix, 1)[0];
      else {
        if (available.length === 7 && board[1][1] === 'X'){
            let index = FindDiagonal('O');
            spot = available.splice(index, 1)[0];
        }
        else if (available.length === 6 && isDiagonal('X')){
          let index = findAvailableIndex(0, 1);
          spot = available.splice(index, 1)[0];
        }
        else{       
          //Second option is to play corner boxes
          var corners = findCornerElemnts();
          if (corners.length > 0) {
            //Play random corner if available
            let index = floor(random(corners.length));
            spot = available.splice(corners[index], 1)[0];
          } else {
            //Play random boxes that are available and are not corners
            let index = floor(random(available.length));
            spot = available.splice(index, 1)[0];
          }
        }
      }
    }
  }
  //Get x,y index from spot variable
  let i = spot[0];
  let j = spot[1];
  //Assign the player symbol to the board index
  board[i][j] = players[currentPlayer];
  //Switch the player
  currentPlayer = (currentPlayer + 1) % players.length;
}

//Redrowing the screen
function draw() {
  //Draw the board on canvas
  background(255);
  let w = width / 3;
  let h = height / 3;
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  //Fill out the board from board variable
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      if (spot == players[1]) {
        noFill();
        ellipse(x, y, w / 2);
      } else if (spot == players[0]) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }
    }
  }

  //No one has played yet
  if (available.length === 9) {
    if (currentPlayer === 0) {
      // player X
      //Prompt player X to start playing
      resultP.html("You start ...");
    } else {
      //Machine played no wait needed
      wait = false;
    }
  } else {
    //Prompt player X to play next move
    resultP.html("Your turn ...");
  }

  //Check for a winner
  let result = checkWinner();
  if (result != null) {
    //noLoop();

    if (result == "tie") {
      resultP.html("Tie!");
    } else {
      resultP.html(`${result} wins!`);
    }
  } else {
    //No wait an player is O
    if (wait === false && currentPlayer === 1) {
      //Checkbox is checked use smart algorithm
      if (document.getElementById("chkSmartPlay").checked === true)
        nextTurnSmart();
      //Otherwise use standard algorithm
      else nextTurn();

      //Wait for user to play
      wait = true;
    }
  }
}
