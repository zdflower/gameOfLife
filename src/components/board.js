import React, { Component } from 'react';
import Celda from './celda';
import './board.css';

class Board extends Component {

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
      res.push(<Celda key={j + ', ' + c} full={board[i][j]} position={ "(" + i + ", " + j + ")"} />);
    } 
    return res;
  }

  render() {
    // this.props.board.length es la cantidad de filas en el tablero.
    // this.props.board[0].length es la cantidad de columnas de una fila 
    let filasActual = this.filas(this.props.board);
    let filasPrev = [];
    let prev = <div></div>;
    if (this.props.previous){
      filasPrev = this.filas(this.props.previous);
      prev =     ( <div className="board">
        <h3>Previous board </h3>
              {
                filasPrev.map((fila, f) => {
                  return (
                    <div className="fila" key={f}> {fila}</div>
                  );
                })
              }
             </div>);
    }
    return (<div>
     <div className="board">
     <h3>Actual board </h3>
              {
                filasActual.map((fila, f) => {
                  return (
                    <div className="fila" key={f}> {fila}</div>
                  );
                })
              }
             </div>
         {prev}
             </div>
            )
  }
}

export default Board;