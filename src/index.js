import React from 'react';+
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let initialBoardWidth = 30;
let initialBoardHeight = 20;

// eslint-disable-next-line
let oscilator = [{r: 1, c: 2}, {r: 2, c: 2}, { r: 3, c: 2}];

// eslint-disable-next-line
let glider = [{r: 2, c: 4}, {r: 3, c: 4}, { r: 4, c: 4}, { r: 4, c: 3}, { r: 3, c: 2}];

// eslint-disable-next-line
let glider_other = [{r: 3, c: 2}, {r: 1, c: 2}, { r: 2, c: 2}, { r: 3, c: 1}, { r: 2, c: 0}];

let something = [{r: 0, c: 2}, {r: 1, c: 2}, { r: 2, c: 2}, { r: 3, c: 1}, { r: 2, c: 0}];

/* glider evolves into a block at the right down corner,
  while something disappears...
*/

// Voy a escribir una función para generar una celda al azar, que esté dentro del tablero, para incluirla en un seed.
// Toma la cantidad de filas y columnas del tablero y devuelve un {r: Number, c: Number} donde 0 <= r < rows y 0 <= c < cols
function celdaAlAzar(rows, cols) {
  return {r: getRndmNbr(rows - 1, cols), c: getRndmNbr(rows - 1, cols)}
}

/* https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random */
function getRndmNbr(min, max) {
  // min incluido, max excluido
  return Math.floor(Math.random() * (max - min)) + min;
}

// Ideas para generar seeds al azar:
// ¿Cómo hago para generar las seeds a partir de esto? Por ejemplo decidir que cierto porcentaje del tablero va a estar lleno, y a partir de calcular cuántas celdas sería ese porcentaje obtener al azar las celdas llenas, (no hacer problema si se generara alguna celda repetida, resultando en menos celdas llenas)

// ¿Podría hacerlo de otra manera, por ejemplo recorrer cada posible celda del tablero y decidir al azar si está llena o no? ¿Toda celda tendrá la misma chance? ¿Hago que sea más probable que salga vacía a que salga llena?
// Se podría hacer al mismo tiempo que se genera el nuevo tablero, en vez de recibir seed, dentro de fila se decide al azar si va a estar llena o no


let seed = glider;
const board = newBoard(initialBoardHeight, initialBoardWidth, seed);

function newBoard(rows,cols,seed) {
  let board = [];
  // inicializar el tablero, todo false
  for (let i=0; i< rows; i++){
    board.push(fila(cols));
  }
  // Marcar las celdas ocupadas, podría ponerlo en otra función...
  for (let cell of seed){
    board[cell.r][cell.c] = true;
  }
  return board
}

function fila(cols){
  let fila = [];
  for (let c = 0; c < cols; c++){
    fila.push(false);
  }
  return fila;
}

ReactDOM.render(<App nmbrOfCols={initialBoardWidth} nmbrOfRows={initialBoardHeight} board={board.slice()}/>, document.getElementById('root'));
registerServiceWorker();
