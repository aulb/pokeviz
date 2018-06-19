import _ from 'lodash';
import {
  TIER_TO_VALUE,
  CATEGORIES,
  BASE_HIGHCHARTS_CONFIG
} from './constants/constants';
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

const extractFormatValues = (formats) => {
  return CATEGORIES.map(generation => {
    const currentGenerationTiers = formats[generation];
    if (currentGenerationTiers) {
      return getHighestTier(currentGenerationTiers);
    }

    return null;
  }).map(tier => tier in TIER_TO_VALUE ? TIER_TO_VALUE[tier] : null);
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

// TODO: const getLineColor = () => null;
