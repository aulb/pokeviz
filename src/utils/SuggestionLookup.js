import PrefixTree from './PrefixTree';
import { validPokemonNames } from '../constants';

/* Populate the lookup */
const suggestionLookup = new PrefixTree();
validPokemonNames.forEach(pokemonName => suggestionLookup.addWord(pokemonName.toLowerCase()));

/*
 * Given a string, find the closest match Pokemon names.
 */
export const getPokemonNameSuggestions = string => {
  if (!string) {
    return [];
  }

  return suggestionLookup.predictWord(string);
};
