import _ from 'lodash';
import {
  VALUE_TO_TIER,
  CATEGORIES,
  BASE_HIGHCHARTS_CONFIG
} from './constants';
import lookup from './constants/lookup';
import competitive from './constants/competitive';

export const getSprite = (pokemonName) => {
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
export const isValidPokemonName = pokemonName => {
  return validPokemonNames.has(pokemonName);
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

const tierToValue = _.invert(VALUE_TO_TIER);

const extractFormatValues = (formats) => {
  return CATEGORIES.map(generation => {
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
  let uniqueConfig = _.cloneDeep(BASE_HIGHCHARTS_CONFIG);
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

export const getLineColor = (primaryType, secondaryType) => null;
