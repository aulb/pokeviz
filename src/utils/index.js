import _ from 'lodash';
import {
  tierToValue,
  categories,
  baseHighchartsConfig
} from '../constants/';
import lookup from '../constants/lookup';
import competitive from '../constants/competitive';
import PrefixTree from './PrefixTree';

/*
 * Get the sprite source given Pokemon name.
 * 'Pikachu' => '/usr/Pokevis/025.png'
 */
export const getSprite = pokemonName => {
  const _pokemonName = pokemonName.toLowerCase();
  const { sprite } = lookup[_pokemonName];

  /* Old solution */
  // https://github.com/facebook/create-react-app/issues/585
  // const _spriteSource = require(`../assets/sprites/${sprite}.png`);

  // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#using-the-public-folder
  const spriteSource = `${process.env.PUBLIC_URL}/assets/sprites/${sprite}.png`;
  return spriteSource;
}

// TODO: disabled lowercase pokemon names for now, only exact match
const competitiveData = Object.keys(competitive);
const validPokemonNames = new Set(competitiveData.map(pokemonName => pokemonName));
const suggestionLookup = new PrefixTree();
validPokemonNames.forEach(pokemonName => suggestionLookup.addWord(pokemonName.toLowerCase()));
export const isValidPokemonName = pokemonName => {
  return validPokemonNames.has(pokemonName);
};

/*
 * Given a string, find the closest match Pokemon names.
 */
export const getPokemonNameSuggestions = string => {
  if (!string) {
    return [];
  }

  return suggestionLookup.predictWord(string);
};

const getPokemonSeries = (name) => {
  const pokemon = competitive[name];
  return pokemon.map(form => makeSeries(name, form));
};

const getHighestTier = (tiers) => {
  for (let i = 0; i < tiers.length; i++) {
    if (tiers[i] !== 'LC') return tiers[i];
  }
  return 'LC';
};


const extractFormatValues = (formats) => {
  return categories.map(generation => {
    if (!formats) {
      return null;
    }
    
    const currentGenerationTiers = formats[generation];
    if (currentGenerationTiers) {
      return getHighestTier(currentGenerationTiers);
    }

    return null;
  }).map(tier => tier in tierToValue ? parseInt(tierToValue[tier], 10) : null);
};

const makeSeries = (name, form) => {
  const { suffix, formats } = form;
  const dash = suffix === '' ? '' : '-';
  const fullPokemonName = `${name}${dash}${suffix}`;
  const spriteName = getSprite(fullPokemonName);
  return {
    name: fullPokemonName,
    data: extractFormatValues(formats),
    marker: {
      symbol: `url(${spriteName})`
    }
    // TODO color: '#FF00FF'
  }
};

export const makeHighchartsConfig = (pokemonList) => {
  let uniqueConfig = _.cloneDeep(baseHighchartsConfig);
  let series = [];

  if (pokemonList) {
    pokemonList.forEach(pokemonName => {
      if (pokemonName in competitive) {
        series.push(...getPokemonSeries(pokemonName));
      }
    });
  }

  if (series.length) {
    uniqueConfig['series'] = series;
  }
  return uniqueConfig;
};

export const getRandomPokemonName = () => {
  const randomBetween1to802 = Math.floor(Math.random() * 802);
  return competitiveData[randomBetween1to802];
};

export const getLineColor = (primaryType, secondaryType) => null;
