
const Gameboard = document.getElementById("board");
const squares = document.getElementsByClassName("square");
const players = ['X', 'O'];
let currentPlayer = players[0];
const playerNames = document.createElement('h2')
playerNames.textContent = `Player 1: X | Player 2: O`
playerNames.style.marginTop = '30px'
playerNames.style.textAlign='center'
Gameboard.before(playerNames)
const endMessage = document.createElement('h2')
endMessage.textContent = `X's turn!`
endMessage.style.marginTop = '30px'
endMessage.style.textAlign='center'
Gameboard.after(endMessage)

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', () => {
        if(squares[i].textContent !== ''){
            return
        }
        squares[i].textContent = currentPlayer
        if(checkWin(currentPlayer)) {
            endMessage.textContent=`Game over! ${currentPlayer} wins!`
            return
        }
        if(checkTie()) {
            endMessage.textContent= `Game is tied!`
            return
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0] 
        if(currentPlayer == players[0]) {
            endMessage.textContent= `X's turn!`
        } else {
            endMessage.textContent= `O's turn!`
        }     
    })   
}

function addNmaeInput() {
    const nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.placeholder = 'Enter player names'
    nameInput.style.marginTop = '20px'
    nameInput.style.textAlign='center'
    Gameboard.before(nameInput)
    const submitButton = document.createElement('button')
    submitButton.textContent = 'Submit'
    submitButton.style.marginTop = '10px'
    submitButton.style.textAlign='center'
    Gameboard.before(submitButton)
    submitButton.addEventListener('click', () => {
        const names = nameInput.value.split(',')
        if(names.length === 2) {
            playerNames.textContent = `Player 1: ${names[0].trim()} | Player 2: ${names[1].trim()}`
        }
    })
}
function checkWin(currentPlayer) {
    for(let i = 0; i < winning_combinations.length; i++){
        const [a, b, c] = winning_combinations[i]
        if(squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer){
            return true
        }
    }
    return false
}

function checkTie(){
    for(let i = 0; i < squares.length; i++) {
        if(squares[i].textContent === '') {
            return false;
        }
    }
    return true
}

function restartButton() {
    for(let i = 0; i < squares.length; i++) {
        squares[i].textContent = ""
    }
    endMessage.textContent=`Begin playing, X's turn!`
    currentPlayer = players[0]

}
