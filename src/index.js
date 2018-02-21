import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let initialBoardWidth = 8;
let initialBoardHeight = 8;

// eslint-disable-next-line
let oscilator = [{f: 1, c: 2}, {f: 2, c: 2}, { f: 3, c: 2}];

// eslint-disable-next-line
let glider = [{f: 2, c: 4}, {f: 3, c: 4}, { f: 4, c: 4}, { f: 4, c: 3}, { f: 3, c: 2}];

// eslint-disable-next-line
let glider_other = [{f: 3, c: 2}, {f: 1, c: 2}, { f: 2, c: 2}, { f: 3, c: 1}, { f: 2, c: 0}];

let something = [{f: 0, c: 2}, {f: 1, c: 2}, { f: 2, c: 2}, { f: 3, c: 1}, { f: 2, c: 0}];

/* glider evolves into a block at the right down corner,
  while something disappears...
*/

let seed = something;

ReactDOM.render(<App nmbrOfCols={initialBoardWidth} nmbrOfRows={initialBoardHeight} ocupadas={seed}/>, document.getElementById('root'));
registerServiceWorker();
