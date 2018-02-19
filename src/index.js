import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let initialBoardWidth = 5;
let initialBoardHeight = 5;
let seed = [{f: 1, c: 2}, {f: 2, c: 2}, { f: 3, c: 2}];

ReactDOM.render(<App nmbrOfCols={initialBoardWidth} nmbrOfRows={initialBoardHeight} ocupadas={seed}/>, document.getElementById('root'));
registerServiceWorker();
