import * as types from '../constants/PokevisActions';

const createAction = (pokemonName, type) => ({
  pokemonName,
  type
});

export const addToPokemonList = pokemonName => {
	return dispatch => dispatch(createAction(pokemonName, types.ADD_TO_POKEMON_LIST));
};

export const deleteFromPokemonList = pokemonName => {
	return dispatch => dispatch(createAction(pokemonName, types.DELETE_FROM_POKEMON_LIST));
};
