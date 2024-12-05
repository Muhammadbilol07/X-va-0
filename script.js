const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const modalMessage = document.getElementById('modal-message');
const modalRestartButton = document.getElementById('modal-restart');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// G'olibni aniqlash
function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'Draw';
}

// Modalni ko'rsatish
function showModal(winner) {
  modalMessage.textContent = winner === 'Draw' ? 'O\'yin Durang!' : `${winner} Yutdi!`;
  modal.classList.add('active');
  overlay.classList.add('active');
}

// Modalni yopish
function hideModal() {
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

// Hucreni bosish
function handleClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (board[index]) return; // Qayta bosishdan himoya

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('active');

  const winner = checkWinner();
  if (winner) {
    setTimeout(() => {
      showModal(winner);
    }, 300);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Navbatni o'zgartirish
}

// O'yinni qayta boshlash
function restartGame() {
  board.fill('');
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('active');
  });
  hideModal(); // Modalni yopish
}

// Event listenerlar
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
modalRestartButton.addEventListener('click', restartGame);
