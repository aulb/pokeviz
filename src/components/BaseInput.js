import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BaseInput extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    const { addPokemon } = this.props;
    const pokemonName = this.refs.speciesText.value;
    addPokemon(pokemonName);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input ref="speciesText" type="text" />
        <button><span role="img" aria-label="find">🔎</span></button>
      </form>
    );
  }
}

BaseInput.propTypes = {
  addPokemon: PropTypes.func
};

export default BaseInput;
