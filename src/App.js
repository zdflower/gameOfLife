import React, { Component } from 'react';
import './App.css';
import Board from './components/board';

/* Hay una relación entre alto, ancho y las celdas ocupadas, la cantidad de celdas ocupadas y las posiciones de las mismas deben estar dentro del tablero, deben respetar las dimensiones dadas del tablero */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidth: this.props.nmbrOfCols,
      boardHeight: this.props.nmbrOfRows,
      ocupadas: this.props.ocupadas
    }
  }

// necesitaría usar algo como celdaOcupada que está en board, la tendría que subir a Apps y pasarla como props para que la use board...
// cuando aprenda cómo hacerlo bien, ok, por ahora, horror, repito el código

celdaOcupada(f,c){
    // Las celdas ocupadas están en this.props.ocupadas
    // Buscás si x,y está en this.props.ocupadas
    let res = false;
    let index = 0;
    let tope = this.state.ocupadas.length
      // es decir, mientras index sea menor que tope y la actual no sea la x,y, seguí
    while (index < tope && !this.esLaPosicion(index,f,c)){
      index++;
    }
    if (index < tope) {
      // La encontró
      res = true;
    }
    return res;
  }

 esLaPosicion(index, f, c){
    return this.state.ocupadas[index].f === f && this.state.ocupadas[index].c === c;
  }

// Acá, según las reglas, se van a ir actualizando las celdas ocupadas.

  nextStage() {
    let newFull = [];
    for (let f = 0; f < this.state.boardHeight; f++){
      for (let c = 0; c < this.state.boardWidth; c++) {
        let neighbs = this.fullNeighbours(f,c);
        if (this.celdaOcupada(f,c)){
          if (neighbs === 2 || neighbs === 3){
             // queda llena, la incluyo en newFull
             newFull.push({f: f, c: c });
          }
        } else {
          // celda vacía
          if (neighbs === 3){
            newFull.push({f: f, c: c });  
          }
        }
      }
    }
    this.setState({ocupadas: newFull});
  }

// Está calculando mal esto:
  fullNeighbours(f,c) {
    // Para cada vecino, si está dentro del tablero, si está lleno sumar uno
    let count = 0;
    const ngbrs = this.vecinos(f,c);
    // No funcionó usar: for (let n in ngbrs), tuve que usar la forma larga del for loop
    let tope = ngbrs.length;
    for (let i = 0; i < tope; i++){
      // alert(ngbrs[i].f + ', ' + ngbrs[i].c)
      if (this.isOnTheBoard(ngbrs[i]) && this.celdaOcupada(ngbrs[i].f, ngbrs[i].c)){
        count++;
      }
    }
    // alert('Vecinos ocupados de ' + f + ', ' + c + ': ' + count);
    return count;
  }

  vecinos(row,col){
    return [
            {f: row-1, c: col-1}, {f: row-1, c: col}, {f: row-1, c: col+1},
            {f: row, c: col-1}, {f: row, c: col+1},
            {f: row+1, c: col-1}, {f: row+1, c: col},{f: row+1, c: col+1}
           ]
  }

  isOnTheBoard(pos){
    // alert('Viendo si ' + pos.f + ', ' + pos.c + ' está en el tablero');
    let res = pos.c >= 0 && pos.c < this.state.boardWidth && pos.f >= 0 && pos.f < this.state.boardHeight;
    // alert(res);
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
