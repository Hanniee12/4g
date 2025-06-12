// Khởi tạo bàn cờ cơ bản
const boardElement = document.getElementById("board");
const suggestionEl = document.getElementById("suggestion");
const analyzeBtn = document.getElementById("analyzeBtn");

const pieces = {
  r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟',
  R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙'
};


let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/
function parseFEN(fen) {
  const rows = fen.split(' ')[0].split('/');
  let squares = [];

  for (let row of rows) {
    for (let ch of row) {
      if (!isNaN(ch)) {
        for (let i = 0; i < parseInt(ch); i++) {
          squares.push('');
        }
      } else {
        squares.push(ch);
      }
    }
  }

  return squares;
}


function renderBoard(fen) {
  boardElement.innerHTML = "";
  const squares = parseFEN(fen);
  squares.forEach((piece, i) => {
    const square = document.createElement("div");
    square.classList.add("square");

    const x = Math.floor(i / 8);
    const y = i % 8;
    square.classList.add((x + y) % 2 === 0 ? "white" : "black");

    square.dataset.index = i;
    square.textContent = pieces[piece] || "";
    boardElement.appendChild(square);
  });
}

renderBoard(fen);


const stockfish = new Worker('stockfish.js');


function getBestMove(fen, callback) {
  stockfish.postMessage("uci");
  stockfish.postMessage("ucinewgame");
  stockfish.postMessage("position fen " + fen);
  stockfish.postMessage("go depth 15");

  stockfish.onmessage = function (event) {
    if (event.data.startsWith("bestmove")) {
      const move = event.data.split(" ")[1];
      callback(move);
    }
  };
}


function formatMove(move) {
  if (move.length < 4) return move;
  return move.slice(0, 2) + " → " + move.slice(2, 4);
}

// Nhấn nút để phân tích
analyzeBtn.addEventListener("click", () => {
  suggestionEl.textContent = "🧠 Đang phân tích...";
  getBestMove(fen, (move) => {
    suggestionEl.textContent = "💡 Gợi ý nước đi: " + formatMove(move);
    highlightMove(move);
  });
});

// Highlight nước đi
function highlightMove(move) {
  const from = move.slice(0, 2);
  const to = move.slice(2, 4);

  const indexFrom = squareIndex(from);
  const indexTo = squareIndex(to);

  const allSquares = document.querySelectorAll(".square");
  if (allSquares[indexFrom]) allSquares[indexFrom].style.background = "#ff0";
  if (allSquares[indexTo]) allSquares[indexTo].style.background = "#0f0";
}

// Chuyển "e2" thành chỉ số index
function squareIndex(pos) {
  const file = pos.charCodeAt(0) - 'a'.charCodeAt(0);
  const rank = 8 - parseInt(pos[1]);
  return rank * 8 + file;
}

// (Tùy chọn) thay đổi FEN thủ công
window.setFEN = (newFEN) => {
  fen = newFEN;
  renderBoard(fen);
}
