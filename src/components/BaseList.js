/*
 * __UNUSED_COMPONENT__
 * List of Pokemon.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSprite } from '../utils/';

const BaseRow = (pokemonName, onClickHandler) => {
  const spriteSource = getSprite(pokemonName);
  return <div
    key={pokemonName}
    data-name={pokemonName}
    onClick={onClickHandler}>
      <img className="spritePic" src={spriteSource}/>
      {pokemonName}
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
