/* A collection of 802 Pokemon competitive metadata. */
import competitive from './competitive';
/* Pokemon sprite and species id lookup. Lookup based on name. */
import lookup from './lookup';

/*
 * Assign int value to a Pokemon competitive tier.
 */
const valueToTier = {
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
const tierToValue = _.invert(valueToTier);

/*
 * Map int to main series Pokemon titles. One to seven, with partial generations in between.
 */
const generations = {
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
const generationsLong = {
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
const tierNameLong = {
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
 * Array of 802 Pokemon names.
 * ['Bulbasaur', 'Ivysaur', 'Venusaur', ...]
 */
const competitiveData = Object.keys(competitive);

/*
 * A set of valid Pokemon names.
 * 'Pikachu' => true
 * 'pikachu' => true (Unimplemented, currently false)
 * 'GoroChu' => false
 */
const validPokemonNames = new Set(competitiveData.map(pokemonName => pokemonName));

/*
 * Generations as categories. Generation one is RG, for red green.
 */
const categories = ['RB', 'GS', 'RS', 'DP', 'BW', 'XY', 'SM'];

/*
 * Base high chart configuration. Extendedable.
 */
const baseHighchartsConfig = {
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

module.exports = {
  competitiveData,
  validPokemonNames,
  categories,
  baseHighchartsConfig,
  generations,
  tierToValue
};
