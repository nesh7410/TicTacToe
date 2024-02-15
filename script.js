const gameInfo = document.querySelector('.gameInfo');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function initialize() {

    currentPlayer = 'X';
    gameInfo.textContent = `Current Player: ${currentPlayer}`;


    // Make Boxes Empty
    boxes.forEach((b) => {
        b.textContent = "";
        b.style.pointerEvents = "all";
        b.classList.remove("win");
    });


    newGameBtn.classList.remove("active");
}

initialize();


// Handle Click Game 
function handleClick(index) {
    if (boxes[index].textContent === "") {
        boxes[index].style.pointerEvents = "none";
        boxes[index].textContent = currentPlayer;
        // gameGrid[index] = currentPlayer;
        swapTurns();
        gameInfo.textContent = `Current Player : ${currentPlayer}`;
        checkGameOver();
    }
}


function checkGameOver() {
    let winner = "";
    winningPositions.forEach((position) => {
        if ((boxes[position[0]].textContent !== "" || boxes[position[1]].textContent !== "" || boxes[position[2]].textContent !== "") && (boxes[position[0]].textContent === boxes[position[1]].textContent) && (boxes[position[1]].textContent === boxes[position[2]].textContent)) {
            //Came here since winnner if found
            //so make all other as unclickable
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            winner = boxes[position[0]].textContent === "X" ? "X" : "O";

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (winner !== "") {
        gameInfo.textContent = `Winner is - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }


    //Check for tie
    let fillCount = 0;
    boxes.forEach((box) => {
        if (box.textContent !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        gameInfo.textContent = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}


function swapTurns() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}


// Add Event Listener to all Boxes to Get Player Input
boxes.forEach((box, ix) => {
    box.addEventListener('click', () => {
        handleClick(ix);
    });
});


newGameBtn.addEventListener('click', initialize);