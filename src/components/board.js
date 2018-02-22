import React, { Component } from 'react';
import Celda from './celda';
import './board.css';

class Board extends Component {

  filas(){
    let res = [];
    for (let i = 0; i < this.props.board.length; i++) {
      res.push(this.fila(i,this.props.board[0].length));
    }
    return res;
  }

  fila(i, c){
    let res = [];
    for (let j = 0; j < c; j++) {
      res.push(<Celda key={j + ', ' + c} full={this.props.board[i][j]} position={ "(" + i + ", " + j + ")"} />);
    } 
    return res;
  }

  render() {
    // this.props.board.length es la cantidad de filas en el tablero.
    // this.props.board[0].length es la cantidad de columnas de una fila 
    let filas = this.filas(); 
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