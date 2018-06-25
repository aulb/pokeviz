export const VALUE_TO_TIER = {
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

export const GENERATIONS = {
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

const GENERATIONS_LONG = {
  'RB': 'one',
  'GS': 'two',
  'RS': 'three',
  'DP': 'four',
  'BW': 'five',
  'XY': 'six',
  'SM': 'seven'
};

const TIER_NAME_LONG = {
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

function highchartsLabel() {
  return VALUE_TO_TIER[this.value];
}

function highchartsTooltip() {
  const generation = GENERATIONS_LONG[this.x];
  const tier = TIER_NAME_LONG[VALUE_TO_TIER[this.y]];
  return `${this.series.name} is <b>${tier}</b> in generation ${generation}`;
}

export const CATEGORIES = ['RB', 'GS', 'RS', 'DP', 'BW', 'XY', 'SM'];
export const BASE_HIGHCHARTS_CONFIG = {
  chart: {
    renderTo: 'container',
    type: 'line'
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: CATEGORIES,
  },
  yAxis: {
    title: {
      text: null
    },
    labels: {
      formatter: highchartsLabel
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
    formatter: highchartsTooltip
  }
};

export const DEFAULT_POKEMON = 'Starmie';
