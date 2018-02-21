import React, { Component } from 'react';
import Celda from './celda';
import './board.css';

class Board extends Component {

  esLaPosicion(index, f, c){
    return this.props.ocupadas[index].f === f && this.props.ocupadas[index].c === c;
  }

  celdaOcupada(f,c){
    let res = false;
    let index = 0;
    let tope = this.props.ocupadas.length
    while (index < tope && !this.esLaPosicion(index,f,c)){
      index++;
    }
    if (index < tope) {
      res = true;
    }
    return res;
  }

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
    let filas = this.filas(this.props.height, this.props.width); 
    return ( <div className="board">
              {
                filas.map((fila, f) => {
                  return (
                    <div className="fila" key={f}> {fila}</div>
                  );
                })
              }
             </div>
            )
  }
}

export default Board;