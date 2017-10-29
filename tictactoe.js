$(document).ready(function() {
 var grid = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  var computerGame;
  var randomGrid;
  var gamePiece = true;
 
  // BOTH start up sets players and starting piece
  $("#onePlayer").click(function() {
    computerGame = true;
    console.log("this is a computer game");
    disableBoth();
    createButtonCallsOnePlayer();
  });
  $("#twoPlayer").click(function() {
    computerGame = false;
    disableBoth();
    createButtonCallsTwoPlayer();
  });
  
// button calls for main FOR two player   
  function createButtonCallsTwoPlayer() {
    $(".main").click(onClickTwoPlayer);
    //gamePiece = true;
  }
// button calls one player 
  function createButtonCallsOnePlayer() {
    $(".main").click(onClickOnePlayer);
  }

  // BOTH disables one player and two player buttons 
  function disableBoth() {
    $('#onePlayer').hide();
    $('#twoPlayer').hide();
    $("#message1").hide();
  }
  // BOTH switches boolean state for game piece
  function switchPiece() {
    gamePiece = !gamePiece;
    console.log("the game piece is set to " + gamePiece);
  }
   // BOTH  
  function gridSwitch(item, assignment) {
    console.log(item);
    var index = parseInt(String.fromCharCode(item.charCodeAt(0) - 17));
    grid[index] = assignment;
  }
  // ONE PLAYER ONLY 
  function assignMove(randomGrid) {
    console.log("#" + randomGrid);
    $("#" + randomGrid).text("O");
    $("#" + randomGrid).prop("disabled", true);
    var index = parseInt(String.fromCharCode(randomGrid.charCodeAt(0) - 17));
    grid[index] = "O";
  }

// ONE PLAYER ONLY 
  function getRandom() {
    randomGrid = grid[Math.floor(Math.random() * grid.length)];
    console.log("this is the randomGrid choice " + randomGrid);
    if (randomGrid === "X" || randomGrid === "O") {
      getRandom();
    }
    assignMove(randomGrid);
  }
 
  //BOTH sets X or O in box and calls f to switch pieces then disables used button 
  function onClickTwoPlayer() {
    console.log("running on Click Two Player" + gamePiece);
    if (gamePiece === true) {
      $(this).text("X");
      console.log(this.id);
      gridSwitch(this.id, "X");
      console.log("this is the current grid after X was called " + grid);
      winCheck();
      $(this).prop("disabled", true);
      switchPiece();
    } else {
      $(this).text("O");
      console.log(this.id);
      gridSwitch(this.id, "O");
      console.log("this is the current grid after O was called " + grid);
      winCheck();
      $(this).prop("disabled", true);
      switchPiece();
    }
 }
  function onClickOnePlayer() {
    console.log("running on Click One Player" + gamePiece);
    if (gamePiece === true) {
      $(this).text("X");
      console.log(this.id);
      gridSwitch(this.id, "X");
      console.log("this is the current grid after X was called " + grid);
      $(this).prop("disabled", true);
      winCheck();
      getRandom();
      winCheck();
    }
 }
  //disables all buttons 
  function disableAll() {
    $(".main").prop("disabled", true);
  }

  function winCheck() {
    for (i = 0; i < 9; i += 3) {
      if (grid[i] == grid[i + 1] && grid[i + 1] == grid[i + 2]) {
        alert("Game is over " + grid[i] + "has won!");
        disableAll();
        console.log("Game is Over");
      }
    }

    for (i = 0; i < 3; i++) {
      if (grid[i] == grid[i + 3] && grid[i + 3] == grid[i + 6]) {
        alert("Game is over " + grid[i] + " has won!");
        disableAll();
        console.log("Game is Over");
      }
    }

    if (grid[0] == grid[4] && grid[4] == grid[8]) {
      alert("Game is over " + grid[0] + " has won!");
      disableAll();
      console.log("Game is Over");

    }
    if (grid[2] == grid[4] && grid[4] == grid[6]) {
      alert("Game is over " + grid[2] + " has won!");
      disableAll();
      console.log("Game is Over");
    }
    if (drawCheck()) {
      alert("Draw");
    }
  }
  function drawCheck() {
    for (i = 0; i < grid.length; i++) {
      if (grid[i] !== "X" && grid[i] !== "O") {
       return false;
      }
    }
    return true;
  }
});
