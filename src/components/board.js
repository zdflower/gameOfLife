import React, { Component } from 'react';
import Celda from './celda';
import './board.css';
/* 
Me gustaría hacer un ciclo en el que por cada fila entre 0 y width - 1 y por cada columna entre 0 y height - 1 se ubique una celda en el tablero
*/

/* ¿Qué celda marcar como full y cuál marcar como vacía?  Al tablero le tendría que llegar de algún modo la posición de las que están llenas y a la hora de renderear chequear si la celda (i,j) está llena o no y marcarla en consecuencia */

class Board extends Component {

  esLaPosicion(index, f, c){
    return this.props.ocupadas[index].f === f && this.props.ocupadas[index].c === c;
  }

  celdaOcupada(f,c){
    // Las celdas ocupadas están en this.props.ocupadas
    // Buscás si x,y está en this.props.ocupadas
    let res = false;
    let index = 0;
    let tope = this.props.ocupadas.length
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

/* Probar qué pasa si en vez de generar las filas todas juntas, voy generando de a 1 fila y que cada fila sea un div, que se muestre en bloque, que vaya una debajo de la otra */

/* Si la celda con posición x,y está en las celdas ocupadas del tablero entonces marcarla como full*/
  filas(f,c){
      let res = [];
      for (let i = 0; i < f; i++) {
        res.push(this.fila(i,c));
      }
      return res;
  }

  fila(i, c){
    let res = [];
    for (let j = 0; j < c; j++) {
      res.push(<Celda key={j + ', ' + c} full={this.celdaOcupada(i,j)} position={ "(" + i + ", " + j + ")"} />);
    } 
    return res;
  }

  render() {
    // Para que una fila vaya debajo de la otra.
    // Ver si creando un componente fila se hace más fácil o más engorroso que esto
    let filas = this.filas(this.props.height, this.props.width); 
    return ( <div className="board">
              {
                filas.map((fila, f) => {
                  return (
                    <div key={f}> {fila}</div>
                  );
                })
              }
             </div>
            )
  }
}

export default Board;