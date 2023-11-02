const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
let circleTurn
const board = document.getElementById("board");
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const winningMsgTextEle = document.querySelector('[data-winning-msg-text]')
const restartButton = document.getElementById("restart");
const winningMsgEle = document.getElementById("winningMsg")
const cellElements = document.querySelectorAll('[data-cell]');

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick,{once:true})
    });
    setBoardHoverClass()
    winningMsgEle.classList.remove('show')
}

function handleClick(e){
    //console.log("clicked");
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell,currentClass)
    //place mark

    //check for win
    if(checkWin(currentClass)){
        //console.log("winner")
        endGame(false)
    }
    else if(isDraw()) {
        endGame(true)
    }

    else{
        swapTurns()
        setBoardHoverClass()
    }
    //check for draw
    
    //switch turns
};

function endGame(draw) {
    if(draw){
        winningMsgTextEle.innerText = "DRAW!"
    }
    else {
        const text1 = "O WINS, IN YOUR FACE X!" 
        const text2 = "X WINS, IN YOUR FACE O!"
        const text = circleTurn ? text1 : text2
        winningMsgTextEle.innerText = text;
    }
    winningMsgEle.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell,currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}