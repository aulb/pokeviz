import React from 'react';
import PropTypes from 'prop-types';
import BaseList from './BaseList';
import ReactHighcharts from 'react-highcharts';

const GraphRow = ({ pokemonList, deletePokemon, graphConfig }) => {
  return <div className="row">
    <div className="chart">
    	<ReactHighcharts config={graphConfig}></ReactHighcharts>
    </div>
  	<div className="list">
    	<BaseList deletePokemon={deletePokemon} pokemonList={pokemonList} />
    </div>
  </div>;
}

GraphRow.propTypes = {
  graphConfig: PropTypes.object,
  deletePokemon: PropTypes.func
};

export default GraphRow;
