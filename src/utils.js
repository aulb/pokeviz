import _ from 'lodash';
import {
  VALUE_TO_TIER,
  CATEGORIES,
  BASE_HIGHCHARTS_CONFIG
} from './constants';
import competitive from './constants/competitive';

// TODO: revamp
const competitiveData = Object.keys(competitive);
const validPokemonNames = new Set(competitiveData.map(pokemonName => pokemonName.toLowerCase()));
export const isValidPokemonName = pokemonName => {
  return validPokemonNames.has(pokemonName.toLowerCase());
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
  return {
    name: `${name}${dash}${suffix}`,
    data: extractFormatValues(formats)
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
