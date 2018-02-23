import React, { Component } from 'react';
import './celda.css';

class Celda extends Component {
  render() {
    //let content = (this.props.full) ? '*' : '';
    let style= (this.props.full) ? {'background-color': 'yellow'} : {};
    return (
      <button className="celda" style={style}>
      </button>
      )
  }
}

export default Celda;