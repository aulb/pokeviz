import React from 'react';
import { Provider } from 'react-redux';
import store from './stores'
import PokevisContainer from './containers/PokevisContainer';

const Pokevis = () => (
  <Provider store={store}>
    <PokevisContainer />
  </Provider>
);

export default Pokevis;
