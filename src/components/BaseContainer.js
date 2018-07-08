import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchRow from './SearchRow';
import GraphRow from './GraphRow';
import Header from './Header';
import { makeHighchartsConfig, isValidPokemonName } from '../utils/';

class BaseContainer extends Component {
  constructor(props) {
    super(props);
    this.addPokemon = this.addPokemon.bind(this);
    this.deletePokemon = this.deletePokemon.bind(this);
    this.setNewPokemon = this.setNewPokemon.bind(this);
    this.state = {
      pokemonList: this.props.pokemonList
    };
  }

  setNewPokemon() {
    this.setState({
      pokemonList: this.props.pokemonList
    });
  }

  addPokemon(pokemonName) {
    const { addToPokemonList } = this.props;
    if (isValidPokemonName(pokemonName)) {
      console.log(pokemonName)
      addToPokemonList(pokemonName);
    }
    this.setNewPokemon();
  }

  deletePokemon(pokemonName) {
    const { deleteFromPokemonList } = this.props;
    deleteFromPokemonList(pokemonName);
    this.setNewPokemon();
  }

  render() {
  	const { pokemonList } = this.state;
  	const highChartsConfig = makeHighchartsConfig(pokemonList);
    return <div className="container">
      <Header title={'Meta Snapshot'} />
      <SearchRow
        addPokemon={this.addPokemon}
      />
      <GraphRow
        pokemonList={pokemonList}
        deletePokemon={this.deletePokemon}
        graphConfig={highChartsConfig}
      />        
    </div>;
  }
}

BaseContainer.propTypes = {
  pokemonList: PropTypes.object,
  addToPokemonList: PropTypes.func,
  deleteFromPokemonList: PropTypes.func
};

export default BaseContainer;
