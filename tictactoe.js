$(document).ready(function() {
    var grid = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; //tictactoe grid
    var computerGame; //set true if one player, false if two player
    var computerGridChoice; //one player only, random grid choice by computer player
    var xTurn = true; // false on O turn
    function disableBoth() {
        $('#onePlayer').hide();
        $('#twoPlayer').hide();
        $("#message1").hide();
    }

    function createButtonCallsOnePlayer() {
        $(".main").click(onClickOnePlayer);
    }

    function createButtonCallsTwoPlayer() {
        $(".main").click(onClickTwoPlayer);
    }
    // begins a ONE PLAYER game
    $("#onePlayer").click(function() {
        computerGame = true;
        console.log("this is a computer game");
        disableBoth();
        createButtonCallsOnePlayer();
    });
    // begins a TWO PLAYER game
    $("#twoPlayer").click(function() {
        computerGame = false;
        disableBoth();
        createButtonCallsTwoPlayer();
    });
    // ONE and TWO PLAYER onClick Functions
    function gridSwitch(item, assignment) {
        var index = parseInt(String.fromCharCode(item.charCodeAt(0) - 17));
        grid[index] = assignment;
    }

    function switchPiece() {
        xTurn = !xTurn;
    }

    function assignMove(computerGridChoice) { // ONE PLAYER ONLY
        $("#" + computerGridChoice).text("O");
        $("#" + computerGridChoice).prop("disabled", true);
        var index = parseInt(String.fromCharCode(computerGridChoice.charCodeAt(0) - 17));
        grid[index] = "O";
    }

    function getRandom() { // ONE PLAYER ONLY
        computerGridChoice = grid[Math.floor(Math.random() * grid.length)];
        if (computerGridChoice === "X" || computerGridChoice === "O") {
            getRandom();
        }
        assignMove(computerGridChoice);
    }

        function drawCheck() {
            for (i = 0; i < grid.length; i++) {
                if (grid[i] !== "X" && grid[i] !== "O") {
                    return false;
                }
            }
            return true;
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
        //ONE PLAYER sets X or O in box, disables box, creates next turn
        function onClickOnePlayer() {
            console.log("running on Click One Player" + xTurn);
            if (xTurn === true) {
                $(this).text("X");
                gridSwitch(this.id, "X");
                $(this).prop("disabled", true);
                winCheck();
                getRandom();
                winCheck();
            }
        }
        //TWO PLAYER sets X or O in box, disables box, creates next turn
        function onClickTwoPlayer() {
            console.log("running on Click Two Player" + xTurn);
            if (xTurn === true) {
                $(this).text("X");
                gridSwitch(this.id, "X");
                winCheck();
                $(this).prop("disabled", true);
                switchPiece();
            } else {
                $(this).text("O");
                gridSwitch(this.id, "O");
                winCheck();
                $(this).prop("disabled", true);
                switchPiece();
            }
        }
        //disables all buttons
        function disableAll() {
            $(".main").prop("disabled", true);
        }
    });