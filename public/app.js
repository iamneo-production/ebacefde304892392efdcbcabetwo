// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check for a win or draw
function checkResult() {
    for (let condition of conditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            result.textContent = `Player ${currentPlayer} wins!`;
            btns.forEach(btn => btn.removeEventListener('click', handleClick));
            document.getElementById('reset').removeAttribute('disabled');
            return;
        }
    }

    if (!cells.includes('')) {
        result.textContent = "It's a draw!";
        document.getElementById('reset').removeAttribute('disabled');
    }
}

// Function to handle a player's move
function ticTacToe(btn, index) {
    if (cells[index] === '' && !result.textContent) {
        cells[index] = currentPlayer;
        btn.value = currentPlayer;
        btn.readOnly = false;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        result.textContent = `Player ${currentPlayer}'s turn`;
        checkResult();
    }
}

// Function to reset the game
function resetGame() {
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    result.textContent = `Player ${currentPlayer}'s turn`;
    btns.forEach(btn => {
        btn.value = '';
        btn.readOnly = false;
    });
    document.getElementById('reset').setAttribute('disabled', 'true');
    btns.forEach(btn => btn.addEventListener('click', handleClick));
}

// Event listener for handling clicks on the game cells
btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});

// Event listener for the Reset button
document.getElementById('reset').addEventListener('click', resetGame);
