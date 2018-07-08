import PrefixTree from './PrefixTree';
import { allPokemonNamesList } from '../constants';
import { transformPokemonNamesToProperCase } from '../utils';

/* Populate the lookup using only valid Pokemon names */
const suggestionLookup = new PrefixTree();
allPokemonNamesList.forEach(pokemonName => suggestionLookup.addWord(pokemonName.toLowerCase()));

/*
 * Given a string, find the closest match Pokemon names.
 */
export const getPokemonNameSuggestions = string => {
  if (!string) {
    return [];
  }

  const rawPredictions = suggestionLookup.predictWord(string.toLowerCase());
  return transformPokemonNamesToProperCase(rawPredictions) ;
};
