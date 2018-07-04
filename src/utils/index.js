import _ from 'lodash';
import lookup from '../constants/lookup';
import competitive from '../constants/competitive';
import { tierToValue, categories, baseHighchartsConfig, competitiveData, validPokemonNames, maxNumberOfPokemonSpecies } from '../constants';

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

/*
 * Given a Pokemon name, determine if its valid.
 * 'Pikachu' => true
 * 'pikachu' => true # __NOT_YET__
 * TODO: disabled lowercase pokemon names for now, only exact match
 */
export const isValidPokemonName = pokemonName => validPokemonNames.has(pokemonName);

/*
 * Convert a Pokemon name into a high charts series object. All forms will be included.
 * 'Gengar' => {'Gengar' => ..., 'Mega-Gengar': ...}
 */
export const getPokemonSeries = (pokemonName) => {
  const pokemon = competitive[pokemonName];
  return pokemon.map(form => makeSeries(pokemonName, form));
};

/*
 * Given a tier list, return a tier that is not LC (little cup).
 * Pikachu can exist in underused and little cup for example.
 */
export const getHighestTier = (tiers) => {
  for (let i = 0; i < tiers.length; i++) {
    if (tiers[i] !== 'LC') return tiers[i];
  }
  return 'LC';
};

/*
 * Convert a generation => tiers map to array of integers and/or nulls.
 * { XY: ['LC', 'OU'], SM: ['OU'] } => [null, null, null, null, null, 5, 5]
 */
export const extractFormatValues = (formats) => {
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

/*
 * Make a high chart series corresponding to a Pokemon's name and form.
 */
export const makeSeries = (pokemonName, form) => {
  const { suffix, formats } = form;
  const dash = suffix === '' ? '' : '-';
  const fullPokemonName = `${pokemonName}${dash}${suffix}`;
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

/*
 * Make the high charts configuration object given a list of Pokemon names.
 */
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

/*
 * Get a random Pokemon's competitive data.
 */
export const getRandomPokemonName = () => {
  const randomIntBetween = Math.floor(Math.random() * maxNumberOfPokemonSpecies);
  return competitiveData[randomIntBetween];
};

/*
 * Get a corresponding color given a primary and secondary Pokemon types.
 */
export const getLineColor = (primaryType, secondaryType) => null;
