//used for 3d mode
//object orienting a cube rather than induvidual tiles allows for easier future expansion into higher dimensions
class cube {
  constructor (n) {
    this.space = [
      [
        [n, n, n],
        [n, n, n],
        [n, n, n],
      ],
      [
        [n, n, n],
        [n, n, n],
        [n, n, n],
      ],
      [
        [n, n, n],
        [n, n, n],
        [n, n, n],
      ],
    ];
  }
//function to check winner
  checkWinner() {
    //set winner to null
    let winner = null;

    //check all straight line possible win cases
    //Z cases
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          equals3(this.space[i][j][0], this.space[i][j][1], this.space[i][j][2])
        ) {
          winner = this.space[i][j][0];
        }
      }
    }
    //Y cases
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          equals3(this.space[i][0][j], this.space[i][1][j], this.space[i][2][j])
        ) {
          winner = this.space[i][0][j];
        }
      }
    }
    //X cases
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          equals3(this.space[0][i][j], this.space[1][i][j], this.space[2][i][j])
        ) {
          winner = this.space[0][i][j];
        }
      }
    }

    //2D diagonal win cases
    //pair 1 - top view going downwards
    for (let i = 0; i < 3; i++) {
      if (
        equals3(this.space[i][0][0], this.space[i][1][1], this.space[i][2][2])
      ) {
        winner = this.space[i][0][0];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        equals3(this.space[i][2][0], this.space[i][1][1], this.space[i][0][2])
      ) {
        winner = this.space[i][2][0];
      }
    }
    //pair 2 - front face going inwards
    for (let i = 0; i < 3; i++) {
      if (
        equals3(this.space[0][i][0], this.space[1][i][1], this.space[2][i][2])
      ) {
        winner = this.space[0][i][0];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        equals3(this.space[2][i][0], this.space[1][i][1], this.space[0][i][2])
      ) {
        winner = this.space[2][i][0];
      }
    }
    //pair 3 - side going left to right
    for (let i = 0; i < 3; i++) {
      if (
        equals3(this.space[0][0][i], this.space[1][1][i], this.space[2][2][i])
      ) {
        winner = this.space[0][0][i];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        equals3(this.space[0][2][i], this.space[1][1][i], this.space[2][0][i])
      ) {
        winner = this.space[0][2][i];
      }
    }
    //stupid 3D diagonal diagonals (i hate my life)
    if (
      equals3(this.space[0][0][0], this.space[1][1][1], this.space[2][2][2])
    ) {
      winner = this.space[0][0][0];
    }
    if (
      equals3(this.space[0][2][0], this.space[1][1][1], this.space[2][0][2])
    ) {
      winner = this.space[0][2][0];
    }
    if (
      equals3(this.space[2][0][0], this.space[1][1][1], this.space[0][2][2])
    ) {
      winner = this.space[2][0][0];
    }
    if (
      equals3(this.space[2][2][0], this.space[1][1][1], this.space[0][0][2])
    ) {
      winner = this.space[2][2][0];
    }
    //if a winner was detected, return the symbol of who won (or if tie)
    if (winner == null && available.length == 0) {
      return "tie";
    } else {
      return winner;
    }
  }
}
