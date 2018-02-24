import React, { Component } from 'react';
import './App.css';
import Board from './components/board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidth: this.props.nmbrOfCols,
      boardHeight: this.props.nmbrOfRows,
      board : this.props.board,
      history: [],
      stage: 0
    }
  }

  /* A partir de representar el tablero como un array de arrays aparecieron problemas con cómo copiaba
  y modificaba el tablero.

  Fue bueno que esta no fue la primera representación, que antes lo hubiera hecho de otra manera y que funcionara, para que pudiera darme cuenta de dónde estaba el problema después del cambio.

  En un comienzo hacía una copia superficial. Usar slice para copiar un array de elementos básicos como números o caracteres o booleanos no es problema porque se copian esos elementos, pero cuando el array es de objetos compuestos lo que se copian son referencias no los objetos en sí. Ahí estaba el problema.

  Y board se iba modificando mientras lo recorría, porque se modificaba la copia y el original.

  Es así como funciona, también pasa en otros lenguajes, como c++.
  */

  nextStage() {
    let board = copyBoard(this.state.board); // Copia profunda del board.
    let history = this.state.history.slice(); // En este caso no necesito una copia profunda.
    history.push(copyBoard(board)); // Necesito guardar una copia que quede intacta, por eso hago otra copia profunda.
    for (let f = 0; f < this.state.boardHeight; f++){
      for (let c = 0; c < this.state.boardWidth; c++) {
        // console.error("(" + f + ", " + c + ")");
        let neighbs = this.fullNeighbours(f,c);
        // console.error("full: " + this.state.board[f][c] +"\nFull neighbours: " + neighbs);
        if (this.state.board[f][c]){
          // the cell is full
          if (neighbs < 2 || neighbs > 3){
             board[f][c] = false;
          }
        } else {
          // the cell is empty 
          if (neighbs === 3){
            // a newborn cell will arrive
             board[f][c] = true;
          }
        }
      }
    }
    this.setState({board: board, history: history, stage: this.state.stage + 1});
  }

  // f is the row number, c is the column number
  fullNeighbours(f,c) {
    // Count the number of full neighbours of (f,c)
    let count = 0;
    const ngbrs = this.vecinos(f,c);
    let tope = ngbrs.length;
    for (let i = 0; i < tope; i++){
      if (this.isOnTheBoard(ngbrs[i]) && this.state.board[ngbrs[i].r][ngbrs[i].c]){
        count++;
      }
    }
    return count;
  }

  vecinos(row,col){
    return [
            {r: row-1, c: col-1}, {r: row-1, c: col}, {r: row-1, c: col+1},
            {r: row, c: col-1}, {r: row, c: col+1},
            {r: row+1, c: col-1}, {r: row+1, c: col},{r: row+1, c: col+1}
           ]
  }

  // pos is of the form: {r: Number, c: Number}, where r represents row and c, column.
  isOnTheBoard(pos){
    let res = pos.c >= 0 && pos.c < this.state.boardWidth && pos.r >= 0 && pos.r < this.state.boardHeight;
    return res;
  }

  handleClickCell(r,c) {
    let board = this.state.board.slice();
    board[r][c] = !board[r][c];
    this.setState({board: board});
  }

  render() {
    let prev = [];
    if (this.state.history.length > 0) {
      // le paso un onClick que no hace nada porque el prev no se debe modificar.
      prev = <Board onClick={() => {return}} board={this.state.history[this.state.history.length - 1]}/>;
    }
    return (
      <div className="App">
        <h3>Actual Board</h3>
        <h4>Stage {this.state.stage}</h4>
        <Board onClick={(r,c) => this.handleClickCell(r,c)} board={this.state.board}/>
        <button onClick={() => this.nextStage()}>Next stage</button>
        <h3>Previous Board</h3>
        {prev}
      </div>
    );
  }
}

export default App;


/* Copia profunda de un array de arrays de booleanos */
function copyBoard(board){
  let copy = [];
  for (let r = 0; r < board.length; r++){
     copy.push(copyRow(board,r,board[0].length));
  }
  return copy;
}

function copyRow(board, r, cols) {
  let row = [];
    for (let c = 0; c < cols; c++) {
      row.push(board[r][c]); // Se supone que el elemento ya no es un array si no un tipo básico, en este caso va a ser un booleano
    }  
  return row;
}