import React, { Component } from 'react';
import './App.css';
import Board from './components/board';

/* The position of the occupied cells must belong to the board, must be between the limits of the board */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidth: this.props.nmbrOfCols,
      boardHeight: this.props.nmbrOfRows,
      board : this.props.board
    }
  }


  
/* 
¿Qué se mejora y qué se complica si represento el tablero como un array de filas, donde fila es un array de booleanos, cada uno indicando si la celda está ocupada o no?

No va a hacer falta "ocupadas", y para ver si la celda (x,y) está ocupada sólo tengo que ver tablero[x][y]

*/

/*
Problemas a partir de usar un array de filas como board:

- undefined si no uso slice() cuando paso el board de index.js a App
- cuando quiero modificar una celda en particular, modifica toda una columna, la misma columna en todas las filas.

 */


/* nextStage()

Revisar y comparar con cómo definía las reglas antes, ya que estaba bien, mientras que ahora está mal.

  Antes: 

-        if (this.celdaOcupada(f,c)){
-          if (neighbs === 2 || neighbs === 3){
-             // remains full, include it in newFull
-             newFull.push({f: f, c: c });
-          }

  Que sería equivalente a:

          if (board[f][c]){
          if (neighbs === 2 || neighbs === 3){
             board[f][c] = true;
          } 
  
  Ahora:

          if (board[f][c]){
          if (neighbs < 2 || neighbs > 3){
             board[f][c] = false;
          } 

  ¿Qué estoy perdiendo de vista? ¿Qué cambió?

 */ 
  nextStage() {
    console.error(this.state.board);
    let board = this.state.board.slice();
    for (let f = 0; f < this.state.boardHeight; f++){
      for (let c = 0; c < this.state.boardWidth; c++) {
        let neighbs = this.fullNeighbours(f,c);
        if (board[f][c]){
          if (neighbs < 2 || neighbs > 3){
             board[f][c] = false;// esto no hace lo que se supone que debería, que es sólo modificar la celda ubicada en la fila f y la columna c.
          /* Me parece que descubrí el problema: no está acá, si no en cómo creé el array de arrays, parece que todas las filas son la misma fila, todas apuntan a la misma memoria, entonces si modifico una fila, modifico también las otras. ¿A quién se le ocurre que esto funcione así? ¿En qué caso podría ser útil? */
          } 
        } else {
          // if the cell is empty then
          if (neighbs === 3){
            // mark it as full, a newborn cell will arrive
             board[f][c] = true;
          }
        }
      }
    }
    this.setState({board: board});
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

  render() {
    return (
      <div className="App">
        <Board board={this.state.board} />
        <button onClick={() => this.nextStage()}>Next stage</button>
      </div>
    );
  }
}

export default App;
