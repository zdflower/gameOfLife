import React, { Component } from 'react';
import Celda from './celda';
import './board.css';

class Board extends Component {

  // this.props.board.length es la cantidad de filas en el tablero.
  // this.props.board[0].length es la cantidad de columnas de una fila 

  filas(board){
    let res = [];
    for (let i = 0; i < board.length; i++) {
      res.push(this.fila(board, i,board[0].length));
    }
    return res;
  }

  fila(board, i, c){
    let res = [];
    for (let j = 0; j < c; j++) {
      res.push(<Celda onClick={() => this.props.onClick(i,j)} key={j + ', ' + c} full={board[i][j]} position={ "(" + i + ", " + j + ")"} />);
    } 
    return res;
  }

  render() {
    let filas = this.filas(this.props.board);
    return (
      <div className="board">
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