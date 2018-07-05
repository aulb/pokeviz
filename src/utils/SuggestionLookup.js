import PrefixTree from './PrefixTree';
import { allPokemonNamesList } from '../constants';
import { compareStrings } from '../utils';

/* Populate the lookup using only valid Pokemon names */
const suggestionLookup = new PrefixTree();
allPokemonNamesList.forEach(pokemonName => suggestionLookup.addWord(pokemonName.toLowerCase()));

/*
 * Transform lowercase Pokemon names into its proper case.
 * Avoid using filter for the time being and changing the data.
 */
const transformPokemonNamesToProperCase = pokemonNames => {
  let result = [];
  const maxResultLength = pokemonNames.length;

  let pokemonName, predictedPokemonName;
  for (let i = 0; i < allPokemonNamesList.length; i++) {
    pokemonName = allPokemonNamesList[i];
    
    for (let j = 0; j < pokemonNames.length; j++) {
      predictedPokemonName = pokemonNames[j];
      if (compareStrings(pokemonName, predictedPokemonName)) {
        // break immediately upon finding a match
        result.push(pokemonName);
        break;
      }
    }

    // return immediately the moment we reach the size
    if (result.length === maxResultLength) {
      return result;
    }
  }

  return result;
};

/*
 * Given a string, find the closest match Pokemon names.
 */
export const getPokemonNameSuggestions = string => {
  if (!string) {
    return [];
  }

  const rawPredictions = suggestionLookup.predictWord(string.toLowerCase());
  return transformPokemonNamesToProperCase(rawPredictions);
};
