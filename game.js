let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0 };

const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

function handleCellClick(cell, index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        
        if (checkWin()) {
            gameActive = false;
            updateScore();
            addToGameHistory(`Player ${currentPlayer} wins!`);
            document.getElementById('status').textContent = `PLAYER ${currentPlayer} WINS!`;
        } else if (gameBoard.every(cell => cell !== '')) {
            gameActive = false;
            addToGameHistory('Game ended in a draw!');
            document.getElementById('status').textContent = 'DRAW!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `PLAYER ${currentPlayer}'S TURN`;
        }
    }
}

function checkWin() {
    return winCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function updateScore() {
    scores[currentPlayer]++;
    document.getElementById(`score${currentPlayer}`).textContent = scores[currentPlayer];
}

function addToGameHistory(message) {
    const history = document.getElementById('gameHistory');
    const date = new Date().toLocaleTimeString();
    history.innerHTML = `[${date}] ${message}<br>${history.innerHTML}`;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    document.getElementById('status').textContent = `PLAYER ${currentPlayer}'S TURN`;
} 