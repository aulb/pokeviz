import React from 'react';
import ReactDOM from 'react-dom';
import Pokevis from './Pokevis';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Pokevis />, document.getElementById('root'));
registerServiceWorker();
