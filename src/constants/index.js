import _ from 'lodash';
/* A collection of 802 Pokemon competitive metadata. */
import competitivePokemonMetadata from './competitive';

/*
 * Assign int value to a Pokemon competitive tier.
 */
export const valueToTier = {
  1: 'PU',
  1.5: 'PUBL',
  2: 'NU',
  2.5: 'NUBL',
  3: 'RU',
  3.5: 'RUBL',
  4: 'UU',
  4.5: 'UUBL',
  5: 'OU',
  6: 'Uber',
  7: 'AG',
  0: 'LC'
};

/*
 * Invert the key => value above to value => key.
 * The numbers are now strings.
 */
export const tierToValue = _.invert(valueToTier);

/*
 * Map int to main series Pokemon titles. One to seven, with partial generations in between.
 */
export const generations = {
  1: 'RGBY',
  2: 'GSC',
  3: 'RS',
  3.5: 'LGFR',
  4: 'DP',
  4.5: 'Pt/HGSS',
  5: 'BW',
  5.5: 'B2W2',
  6: 'XY',
  6.5: 'ORAS',
  7: 'SM',
  7.5: 'USUM'
};

/*
 * Map the main title game to Pokemon generation.
 */
export const generationsLong = {
  'RB': 'one',
  'GS': 'two',
  'RS': 'three',
  'DP': 'four',
  'BW': 'five',
  'XY': 'six',
  'SM': 'seven',
  'RGBY': 'one',
  'GSC': 'two',
  'RSE': 'three',
  'DPPt': 'four',
  'B2W2': 'five',
  'ORAS': 'six',
  'USUM': 'seven'
};

/*
 * Map tier name to unabbreviated tier name.
 */
export const tierNameLong = {
  'OU': 'over used',
  'UU': 'under used',
  'RU': 'rarely used',
  'NU': 'never used',
  'AG': 'anything goes',
  'PU': '"poo"',
  'Uber': 'uber',
  'PUBL': '"poo" banlist (never used)',
  'NUBL': 'never used banlist (rarely used)',
  'RUBL': 'rarely used banlist (under used)',
  'UUBL': 'under used banlist (over used)',
  'LC': 'little cup'
};

/*
 * Array of all Pokemon names.
 * ['Bulbasaur', 'Ivysaur', 'Venusaur', ...]
 */
export const allPokemonNamesList = Object.keys(competitivePokemonMetadata);

/*
 * A set of valid Pokemon names.
 * 'Pikachu' => true
 * 'pikachu' => true (Unimplemented, currently false)
 * 'GoroChu' => false
 */
export const allPokemonNamesSet = new Set(allPokemonNamesList.map(pokemonName => pokemonName));

/*
 * Generations as categories. Generation one is RG, for red green.
 */
export const categories = ['RB', 'GS', 'RS', 'DP', 'BW', 'XY', 'SM'];

/*
 * Base high chart configuration. Extendedable.
 */
export const baseHighchartsConfig = {
  chart: {
    renderTo: 'container',
    type: 'line'
  },
  title: {
    text: ''
  },
  xAxis: {
    categories,
  },
  yAxis: {
    title: {
      text: null
    },
    labels: {
      formatter: function highchartsLabel() {
        return valueToTier[this.value];
      }
    }
  },
   credits: {
      enabled: false
  },
  tooltip: {
    borderColor: 'black',
    borderRadius: 1,
    borderWidth: 2,
    useHTML: true,
    formatter: function() {
      const generation = generationsLong[this.x];
      const tier = tierNameLong[valueToTier[this.y]];
      return `${this.series.name} is <b>${tier}</b> in generation ${generation}`;
    }
  }
};

/*
 * The total amount of Pokemon species, as of Zeraora's reveal.
 */
export const maxNumberOfPokemonSpecies = 807;
