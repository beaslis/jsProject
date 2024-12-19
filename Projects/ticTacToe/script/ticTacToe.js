const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let option = ["","","","","","","","",""];
let player = "X";
let runGame = false;

function initializeGame (){      //includes all functions
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${player}'s turn`;
    runGame = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    
    if (option[cellIndex] !="" || !runGame){
        return;
    }
        updateCell(this,cellIndex);
        checkWinner();
}

function updateCell(cell, index) {
    option[index] = player;
    cell.textContent = player
}

function changePlayer () {
    player = (player == "X") ? "O" : "X";
    statusText.textContent = `${player}'s turn`;
}

function checkWinner() {
    let wonRound = false;

    for(let i = 0; i < winConditions.length; i++){ 
        const condition = winConditions[i];
        const cell1 = option[condition[0]];
        const cell2 = option[condition[1]];
        const cell3 = option[condition[2]];

        if(cell1 == "" || cell2 == "" || cell3 == ""){
            continue;
        }
        if(cell1 == cell2 && cell2 == cell3){
            wonRound = true;
            break;
        }
    }
    if(wonRound){
        statusText.textContent = `${player} wins!<3`;
        runGame = false;
    }else if(!option.includes("")){
        statusText.textContent = `draw :D`;
        runGame = false
    }else{
        changePlayer();
    }
}

function restartGame (){
    player = "X";
    option = ["","","","","","","","",""];
    statusText.textContent = `${player}'s turn!`;
    cells.forEach(cell => cell.textContent = "");
    runGame = true;
}

initializeGame();


