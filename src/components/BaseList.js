import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const clickable = <div 
      key={pokemonName} 
      data-name={pokemonName} 
      onClick={this.onClick}>
        {pokemonName}
    </div>;
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
    const pokemonList = this.makeRow();
    return (
      <ul>
        {pokemonList}
      </ul>
    );
  }
}

BaseList.propTypes = {
  pokemonList: PropTypes.object,
  deletePokemon: PropTypes.func
};

export default BaseList;
