import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BaseList extends Component {
  constructor(props) {
    super(props);
    this.makeRow = this.makeRow.bind(this);
  }

  makeRow() {
    const { pokemonList } = this.props;

    // TODO: temp
    if (!pokemonList || !pokemonList.map) {
      return null;
    }
    
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

BaseList.propTypes = {
  pokemonList: PropTypes.object,
  deletePokemon: PropTypes.func
};

export default BaseList;
