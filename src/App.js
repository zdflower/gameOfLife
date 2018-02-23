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
      history: []
    }
  }

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

  ¿Podría ser que el problema es que board se va modificando mientras lo vas recorriendo? Debe ser eso. Eso es algo que hay que evitar siempre

 */ 

/* 

Otro problema con el tema de los arrays y lo que se copia y lo que se modifica y lo que se referencia y la #~@!

los boards no se están copiando, cuando modifico uno el otro también se modifica, incluso si agrego uno a history, es como si todos fueran el mismo y estuvieran manejando referencias y cuando cambio el tablero se cambian para todas las referencias también.

Es de locos!

Es así como funciona, también pasa en otros lenguajes, como c++, el problema está en los arrays de arrays, 
en este caso copia las filas, pero los elementos de cada fila, sólo tiene una referencia, no los copia realmente.

No es lo mismo copiar un array unidimensional que uno de dos.

*/

/* Parece que ya está arreglado el tema de la copia del tablero, pero todavía no entiendo por qué calcula mal los estados, cuando antes los calculaba bien.

Por ejemplo calcula mal que a partir del seed something, en la siguiente etapa el (1,1) aparece lleno cuando no debería porque tiene más de 3 llenos alrededor.
También calcula mal el (2,0) que como tiene un solo vecino lleno debe vaciarse.

 */

  nextStage() {
    // Listo. Ese era el problema, que no hacía bien la copia del tablero. Un error típico, básico, de primer año...
    let board = copyBoard(this.state.board)//this.state.board.slice(); // acá también tengo que hacer una copia profunda y no simple
    let history = this.state.history.slice();
    history.push(copyBoard(board));
    for (let f = 0; f < this.state.boardHeight; f++){
      for (let c = 0; c < this.state.boardWidth; c++) {
        console.error("(" + f + ", " + c + ")");
        let neighbs = this.fullNeighbours(f,c);
        // voy a recorrer el this.state.board, copia del cual es board. El de state no va a cambiar, mientras que el otro sí. 
        // ¿por qué no cambió nada?
        console.error("full: " + this.state.board[f][c] +"\nFull neighbours: " + neighbs);
        if (this.state.board[f][c]){
          if (neighbs < 2 || neighbs > 3){
             board[f][c] = false;
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
    this.setState({board: board, history: history});
  }

  // f is the row number, c is the column number
  /* ¡Está calculando mal la cantidad de vecinos llenos! 

No entiendo por qué no da true que (0,2) esté lleno, si está en el tablero y está lleno.

Sigue habiendo algo raro con la modificación del tablero mientras se están marcando las próximas celdas...

Tendría que crear un tablero completamente distinto.

  */
  fullNeighbours(f,c) {
    // Count the number of full neighbours of (f,c)
    let count = 0;
    const ngbrs = this.vecinos(f,c);
    console.error("Vecinos de (" + f + ", " + c + "): ");
    console.error(ngbrs);
    let tope = ngbrs.length;
    for (let i = 0; i < tope; i++){
      console.error(ngbrs[i].r + ", " + ngbrs[i].c + " está en el tablero?: " + this.isOnTheBoard(ngbrs[i]));
      if (ngbrs[i].r === 0 && ngbrs[i].c === 2){ console.error(ngbrs[i].r + ", " + ngbrs[i].c + " está lleno?: " + this.state.board[ngbrs[i].r][ngbrs[i].c]);}

      if (this.isOnTheBoard(ngbrs[i]) && this.state.board[ngbrs[i].r][ngbrs[i].c]){
        console.error(ngbrs[i].r + ", " + ngbrs[i].c + " está lleno?: " + this.state.board[ngbrs[i].r][ngbrs[i].c]);
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
        <Board board={this.state.board} previous={this.state.history[this.state.history.length - 1]}/>
        <button onClick={() => this.nextStage()}>Next stage</button>
      </div>
    );
  }
}

export default App;


/* Hay que tener cuidado con la copia de arrays, mucho más si sus elementos no son tipos básicos, si no objetos que contienen otros tipos u otros arrays */
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