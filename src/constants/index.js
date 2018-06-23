export const VALUE_TO_TIER = {
  0: 'PU',
  0.5: 'PUBL',
  1: 'NU',
  1.5: 'NUBL',
  2: 'RU',
  2.5: 'RUBL',
  3: 'UU',
  3.5: 'UUBL',
  4: 'OU',
  5: 'Uber',
  6: 'AG'
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

export const CATEGORIES = ['RB', 'GS', 'RS', 'DP', 'BW', 'XY', 'SM'];
export const BASE_HIGHCHARTS_CONFIG = {
  chart: {
    renderTo: 'container',
    type: 'line'
  },
  title: {
    text: 'Meta Snapshot'
  },
  xAxis: {
    categories: CATEGORIES,
  },
  yAxis: {
    title: {
      text: null
    },
    labels: {
      formatter: function() {
        return VALUE_TO_TIER[this.value];
      }
    }
  },
   credits: {
      enabled: false
  }
};

export const DEFAULT_POKEMON = 'Starmie';
