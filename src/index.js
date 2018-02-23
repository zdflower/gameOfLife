import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let initialBoardWidth = 30;
let initialBoardHeight = 20;

const board = newBoard(initialBoardHeight, initialBoardWidth);

ReactDOM.render(<App nmbrOfCols={initialBoardWidth} nmbrOfRows={initialBoardHeight} board={board.slice()}/>, document.getElementById('root'));
registerServiceWorker();

/* https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random */
function getRndmNbr(min, max) {
  // min incluido, max excluido
  return Math.floor(Math.random() * (max - min)) + min;
}

function newBoard(rows,cols) {
  let board = [];
  for (let i=0; i< rows; i++){
    board.push(fila(cols));
  }
  return board;
}

function fila(cols){
  let fila = [];
  for (let c = 0; c < cols; c++){
    (getRndmNbr(0, 2) === 1) ? fila.push(true) : fila.push(false);
  }
  return fila;
}
