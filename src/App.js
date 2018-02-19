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
      ocupadas: this.props.ocupadas
    }
  }

// Also the Board component uses methods celdaOfupada(f,c) and esLaPosicion()
// which are similar to those used here in App. The difference is in the use of this.state and this.props.
// If they take an array of occupied cells instead of looking into this.state.ocupadas or this.props.ocupadas,
// then maybe I can pass the methods used in App to Board as props...

  // f is the row number, c is the column number
  celdaOcupada(f,c){
    let res = false;
    let index = 0;
    let tope = this.state.ocupadas.length

    while (index < tope && !this.esLaPosicion(index,f,c)){
      index++;
    }
    if (index < tope) {
      // Found it
      res = true;
    }
    return res;
  }

  // f is the row number, c is the column number
  esLaPosicion(index, f, c){
    return this.state.ocupadas[index].f === f && this.state.ocupadas[index].c === c;
  }

  nextStage() {
    let newFull = [];
    for (let f = 0; f < this.state.boardHeight; f++){
      for (let c = 0; c < this.state.boardWidth; c++) {
        let neighbs = this.fullNeighbours(f,c);
        if (this.celdaOcupada(f,c)){
          if (neighbs === 2 || neighbs === 3){
             // remains full, include it in newFull
             newFull.push({f: f, c: c });
          }
        } else {
          // if the cell is empty then
          if (neighbs === 3){
            // mark it as full, a newborn cell will arrive
            newFull.push({f: f, c: c });  
          }
        }
      }
    }
    this.setState({ocupadas: newFull});
  }

  // f is the row number, c is the column number
  fullNeighbours(f,c) {
    // Count the number of full neighbours of (f,c)
    let count = 0;
    const ngbrs = this.vecinos(f,c);
    let tope = ngbrs.length;
    for (let i = 0; i < tope; i++){
      if (this.isOnTheBoard(ngbrs[i]) && this.celdaOcupada(ngbrs[i].f, ngbrs[i].c)){
        count++;
      }
    }
    return count;
  }

  vecinos(row,col){
    return [
            {f: row-1, c: col-1}, {f: row-1, c: col}, {f: row-1, c: col+1},
            {f: row, c: col-1}, {f: row, c: col+1},
            {f: row+1, c: col-1}, {f: row+1, c: col},{f: row+1, c: col+1}
           ]
  }

  // pos is of the form: {f: Number, c: Number}, where f represents row and c, column.
  isOnTheBoard(pos){
    let res = pos.c >= 0 && pos.c < this.state.boardWidth && pos.f >= 0 && pos.f < this.state.boardHeight;
    return res;
  }

  render() {
    return (
      <div className="App">
        <Board ocupadas={this.state.ocupadas} width={this.state.boardWidth} height={this.state.boardHeight} />
        <button onClick={() => {return this.nextStage()}}>Next stage</button>
      </div>
    );
  }
}

export default App;
