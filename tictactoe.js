$(document).ready(function() {

    var grid = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    var computerGame = true;
    var turnX = true;           // O turn when false

    // disable grid at start
    $(".colButton").prop("disabled", true);

    // hide one player and two player buttons
    function disableBoth() {
        $('#onePlayer').hide();
        $('#twoPlayer').hide();
    }

    // one and two player "onClick"
    $("#onePlayer").click(function () {
        computerGame = true;
        disableBoth();
        $(".colButton").prop("disabled", false);
        $(".colButton").click(onClickOnePlayer);
    });
    $("#twoPlayer").click(function () {
        computerGame = false;
        disableBoth();
        $(".colButton").prop("disabled", false);
        $(".colButton").click(onClickTwoPlayer)
    });


    function gridSwitch(item, assignment) {
        var index = parseInt(String.fromCharCode(item.charCodeAt(0) - 17));
        grid[index] = assignment;
    }

    //picks computers move randomly
    function assignComputerMove() {
        // find an empty grid location
        var randomGrid = "O";
        while (true) {
            randomGrid = grid[Math.floor(Math.random() * grid.length)];
            console.log("this is the randomGrid choice " + randomGrid);
            if (randomGrid !== "X" && randomGrid !== "O") {
                break;
            }
        }

        $("#" + randomGrid).text("O");
        $("#" + randomGrid).prop("disabled", true);
        $("#" + randomGrid).css("color", "black");
        var index = parseInt(String.fromCharCode(randomGrid.charCodeAt(0) - 17));
        grid[index] = "O";
    }


    //BOTH sets X or O in the grid position, switches turns and disables used button
    function onClickTwoPlayer() {
        console.log("running on Click Two Player" + turnX);
        if (turnX === true) {
            $(this).text("X");
            $(this).css("color", "black"); // make visible
            console.log(this.id);
            gridSwitch(this.id, "X");
            console.log("this is the current grid after X was called " + grid);
            $(this).prop("disabled", true);
            winCheck();
            turnX = !turnX;
        } else {
            $(this).text("O");
            $(this).css("color", "black");
            console.log(this.id);
            gridSwitch(this.id, "O");
            console.log("this is the current grid after O was called " + grid);
            winCheck();
            $(this).prop("disabled", true);
            turnX = !turnX;
        }
    }

    function onClickOnePlayer() {
        console.log("running on Click One Player" + turnX);
        if (turnX === true) {
            $(this).text("X");
            $(this).css("color", "black");
            console.log(this.id);
            gridSwitch(this.id, "X");
            console.log("this is the current grid after X was called " + grid);
            $(this).prop("disabled", true);
            // did we win? or draw?
            if (winCheck()) { return; }
            // make computer move now
            assignComputerMove();
            winCheck();
        }
    }


    function winCheck() {
        for (i = 0; i < 9; i += 3) {
            if (grid[i] == grid[i + 1] && grid[i + 1] == grid[i + 2]) {
                announceWinner(grid[i]);
                return true;            
            }
        }

        for (i = 0; i < 3; i++) {
            if (grid[i] == grid[i + 3] && grid[i + 3] == grid[i + 6]) {
                announceWinner(grid[i]);
                return true;
            }
        }
        if (grid[0] == grid[4] && grid[4] == grid[8]) {
            announceWinner(grid[0]);
            return true;
        } else if (grid[2] == grid[4] && grid[4] == grid[6]) {
            announceWinner(grid[2]);
            return true;
        } else if (drawCheck()) {
            alert("Draw");
            return true;
        }
    }

    function announceWinner(winner) {
        alert("Game is over " + winner + " has won!");
        $(".colButton").prop("disabled", true);
        console.log("Game is Over");
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
