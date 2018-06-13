import { TIER_TO_VALUE, CATEGORIES, BASE_HIGHCHARTS_CONFIG } from './constants/constants';
import competitive from './constants/competitive';

const validPokemonNames = new Set(Object.keys(competitive));

export const isValidPokemonName = pokemonName => validPokemonNames.has(pokemonName);

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

export const makeHighchartsConfig = (pokemon_list) => {
  let series = [];

  for (let i = 0; i < pokemon_list.length; i++) {
    let pokemon = pokemon_list[i];
    if (pokemon in competitive) {
      series.push(...getPokemonSeries(pokemon));
    }
  }

  BASE_HIGHCHARTS_CONFIG['series'] = series;
  return BASE_HIGHCHARTS_CONFIG;
};

const getLineColor = () => null;
