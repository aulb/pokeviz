import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PokevisList extends Component {
  constructor(props) {
    super(props);

    this.makeRow = this.makeRow.bind(this);
  }

  makeRow() {
    const { pokemonList } = this.props;
    return pokemonList.map(pokemonName => <td key={pokemonName}>{pokemonName}</td>);
  }

  render() {
    const pokemonList = this.makeRow();

    return (
      <table>
        <tbody>
          <tr>
            {pokemonList}
          </tr>
        </tbody>
      </table>
    );
  }
}

PokevisList.propTypes = {
  pokemonList: PropTypes.array,
  onPokemonDelete: PropTypes.func
};

export default PokevisList;
