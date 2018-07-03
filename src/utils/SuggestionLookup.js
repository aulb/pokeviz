import PrefixTree from './PrefixTree';

const suggestionLookup = new PrefixTree();
/*
 * Given a string, find the closest match Pokemon names.
 */
export const getPokemonNameSuggestions = string => {
  if (!string) {
    return [];
  }

  return suggestionLookup.predictWord(string);
};
