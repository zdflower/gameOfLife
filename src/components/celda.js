import React, { Component } from 'react';
import './celda.css';

class Celda extends Component {
  render() {
    let style= (this.props.full) ? {'background-color': 'purple'} : {};
    return (
      <button className="celda" style={style}>
      </button>
      )
  }
}

export default Celda;