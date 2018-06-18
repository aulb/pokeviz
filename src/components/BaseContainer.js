import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts';
import BaseList from './BaseList';
import BaseInput from './BaseInput';
import { makeHighchartsConfig, isValidPokemonName } from '../utils';

class BaseContainer extends Component {
  constructor(props) {
    super(props);
    this.addPokemon = this.addPokemon.bind(this);
    this.deletePokemon = this.deletePokemon.bind(this);
  }

  addPokemon(pokemonName) {
    const { addToPokemonList } = this.props;
    if (isValidPokemonName(pokemonName)) {
      addToPokemonList(pokemonName);
    }
  }

  deletePokemon(pokemonName) {
    const { deleteFromPokemonList } = this.props;
    deleteFromPokemonList(pokemonName);
  }

  render() {
  	const { pokemonList } = this.props;
  	const highChartsConfig = makeHighchartsConfig(pokemonList);
    return <div>
      <BaseInput addPokemon={this.addPokemon} />
      <BaseList deletePokemon={this.deletePokemon} pokemonList={pokemonList} />
      <ReactHighcharts config={highChartsConfig}></ReactHighcharts>
    </div>;
  }
}

BaseContainer.propTypes = {
  pokemonList: PropTypes.object,
  addToPokemonList: PropTypes.func,
  addToPokemonList: PropTypes.func
};

export default BaseContainer;
