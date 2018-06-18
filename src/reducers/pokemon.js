import {
  ADD_TO_POKEMON_LIST,
  DELETE_FROM_POKEMON_LIST
} from '../constants/PokevisActionTypes';

const initialState = {
  pokemonList: new Set()
};

const pokemon = (state = initialState, action) => {
  const { pokemonList } = state;
  switch (action.type) {
    case ADD_TO_POKEMON_LIST:
      pokemonList.add(action.pokemonName);      
      return { pokemonList };
    case DELETE_FROM_POKEMON_LIST:
      pokemonList.delete(action.pokemonName);
      return { pokemonList };
    default:
      return state;
  }
}

export default pokemon;
