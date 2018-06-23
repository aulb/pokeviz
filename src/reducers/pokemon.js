import {
  ADD_TO_POKEMON_LIST,
  DELETE_FROM_POKEMON_LIST
} from '../constants/PokevisActions';
import { DEFAULT_POKEMON } from '../constants'

const initialState = {
  pokemonList: new Set([DEFAULT_POKEMON])
};

const pokemon = (state = initialState, action) => {
  const { pokemonList } = state;
  const { type, pokemonName } = action;
  switch (type) {
    case ADD_TO_POKEMON_LIST:
      pokemonList.add(pokemonName);      
      break;
    case DELETE_FROM_POKEMON_LIST:
      pokemonList.delete(pokemonName);
      break;
    default:
      break;
  }
  state.pokemonList = pokemonList;
  return state;
}

export default pokemon;
