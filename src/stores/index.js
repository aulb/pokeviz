import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import pokemonReducer from '../reducers/pokemon';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  pokemonReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);
