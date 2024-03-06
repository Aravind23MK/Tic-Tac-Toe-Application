document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let cells = [];

    // Initialize game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
        cells.push('');
    }

    // Function to handle cell clicks
    function handleCellClick() {
        const index = this.dataset.index;
        if (cells[index] === '' && !checkWinner()) {
            cells[index] = currentPlayer;
            this.textContent = currentPlayer;
            if (checkWinner()) {
                status.textContent = `Player ${currentPlayer} wins!`;
            } else if (cells.every(cell => cell !== '')) {
                status.textContent = 'It\'s a tie!';
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Function to check winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
        });
    }

    // Function to reset game
    function resetGame() {
        cells = cells.map(() => '');
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        status.textContent = 'Player X\'s turn';
    }

    // reset button
    resetBtn.addEventListener('click', resetGame);
});
