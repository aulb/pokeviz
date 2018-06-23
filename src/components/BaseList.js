import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lookup from '../constants/lookup';

const BaseRow = (pokemonName, onClickHandler) => {
  const _pokemonName = pokemonName.toLowerCase();
  const { sprite } = lookup[_pokemonName];

  /* Old solution */
  // https://github.com/facebook/create-react-app/issues/585
  // const _spriteSource = require(`../assets/sprites/${sprite}.png`);

  // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#using-the-public-folder
  const spriteSource = `${process.env.PUBLIC_URL}/assets/sprites/${sprite}.png`;
  return <div
    key={pokemonName}
    data-name={pokemonName}
    onClick={onClickHandler}>
      <img src={spriteSource}/>{pokemonName}
  </div>;
};

class BaseList extends Component {
  constructor(props) {
    super(props);
    this.makeRow = this.makeRow.bind(this);
    this.makeRowElement = this.makeRowElement.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const pokemonName = event.target.dataset.name;
    this.props.deletePokemon(pokemonName);
  }

  makeRowElement(pokemonName) {
    const clickable = BaseRow(pokemonName, this.onClick);
    return <li>{clickable}</li>;
  }

  makeRow() {
    const { pokemonList } = this.props;
    if (!pokemonList || !pokemonList.forEach) {
      return null;
    }
    
    let listElements = [];
    pokemonList.forEach(pokemonName => {
      listElements.push(this.makeRowElement(pokemonName));
    });
    return listElements;
  }

  render() {
    return (
      <ul>
        { this.makeRow() }
      </ul>
    );
  }
}

BaseList.propTypes = {
  pokemonList: PropTypes.object,
  deletePokemon: PropTypes.func
};

export default BaseList;
