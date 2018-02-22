import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let initialBoardWidth = 8;
let initialBoardHeight = 8;

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

let seed = something;
/*
function initializeBoard(rows, cols, seed){
  let board = Array(rows).fill(Array(cols).fill(false));// esto es lo que hace que lo demás falle.
  // para cada celda indicada en this.props.ocupadas la marco como true en board
  for (let cell of seed){
  //  console.error(cell);
    board[cell.r][cell.c] = true;
  }
  return board;
}


const board = initializeBoard(initialBoardHeight, initialBoardWidth, seed);
*/

// El problema de modificar una celda y que se modifique en todas las filas la correspondiente a la misma columna está en la siguiente línea, aparentemente
// let board = Array(initialBoardHeight).fill(Array(initialBoardWidth).fill(false));

function fila(cols){
  let fila = [];
  for (let c = 0; c < cols; c++){
    fila.push(false);
  }
  return fila;
}


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

const board = newBoard(initialBoardHeight, initialBoardWidth, seed);

ReactDOM.render(<App nmbrOfCols={initialBoardWidth} nmbrOfRows={initialBoardHeight} board={board.slice()}/>, document.getElementById('root'));
registerServiceWorker();
