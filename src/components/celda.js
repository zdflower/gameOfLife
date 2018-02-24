import React from 'react';
import './celda.css';

function Celda(props) {
    let style= (props.full) ? {'backgroundColor': 'purple'} : {};
    return (
      <button onClick={props.onClick} className="celda" style={style}>
      </button>
      )
}

export default Celda;