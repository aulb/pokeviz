import * as types from '../constants/PokevisActionTypes';

const createAction = (pokemonName, type) => ({
  pokemonName,
  type
});

export const addToPokemonList = pokemonName => ({
  dispatch(createAction(pokemonName, types.ADD_TO_POKEMON_LIST));
});

export const deleteFromPokemonList = pokemonName => ({
  dispatch(createAction(pokemonName, types.DELETE_FROM_POKEMON_LST));
});
