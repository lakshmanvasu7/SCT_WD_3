// Select elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('gameStatus');
const restartBtn = document.getElementById('restartBtn');
const playComputerBtn = document.getElementById('playComputer');

// Game state variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let isComputerOpponent = false;

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Function to handle user click on a cell
const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Check if the cell is already taken or if the game is inactive
    if (board[clickedIndex] !== '' || !isGameActive) return;

    updateCell(clickedCell, clickedIndex);
    checkResult();

    if (isComputerOpponent && currentPlayer === 'O') {
        setTimeout(handleComputerMove, 500);  // Let computer take its turn
    }
};

// Function to update cell with current player's symbol and color
const updateCell = (cell, index) => {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Add class for color based on player
    if (currentPlayer === 'X') {
        cell.classList.add('x');
    } else {
        cell.classList.add('o');
    }

    cell.style.pointerEvents = 'none';
};

// Function to switch the player
const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `${currentPlayer}'s turn`;
};

// Function to check for win or draw
const checkResult = () => {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = `It's a draw!`;
        isGameActive = false;
        return;
    }

    switchPlayer();
};

// Function for computer's move
const handleComputerMove = () => {
    if (!isGameActive) return;

    let availableCells = board.map((value, index) => value === '' ? index : null).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
    updateCell(cell, randomIndex);
    checkResult();
};

// Function to restart the game
const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusDisplay.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o'); // Remove color classes
        cell.style.pointerEvents = 'auto';
    });
};

// Function to switch between modes
const playAgainstComputer = () => {
    isComputerOpponent = true;
    restartGame();
};

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
playComputerBtn.addEventListener('click', playAgainstComputer);
