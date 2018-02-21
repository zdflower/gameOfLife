import React, { Component } from 'react';
import './celda.css';

class Celda extends Component {
  render() {
    let content = (this.props.full) ? '*' : this.props.position;

    return (
      <button className="celda">
      {content}
      </button>
      )
  }
}

export default Celda;