import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import pokemonReducer from '../reducers/pokemon';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Need the thunk for async actions
export default createStore(
  pokemonReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);
