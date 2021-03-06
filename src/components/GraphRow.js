import React from 'react';
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts';

const renderHighcharts = (pokemonList, graphConfig) => {
  if (!pokemonList || !pokemonList.size) {
    return <h2>No Pokemon added</h2>;
  }

  return <div className="chart">
    <ReactHighcharts config={graphConfig}></ReactHighcharts>
  </div>;
};

const GraphRow = ({ pokemonList, deletePokemon, graphConfig }) => {
  return <div className="row">
    { renderHighcharts(pokemonList, graphConfig) }
  </div>;
};

GraphRow.propTypes = {
  graphConfig: PropTypes.object,
  deletePokemon: PropTypes.func
};

export default GraphRow;
