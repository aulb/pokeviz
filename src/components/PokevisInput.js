import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PokevisInput extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    if (event) event.preventDefault();
    console.log(this.refs.speciesText.value);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input ref="speciesText" type="text" />
        <button>🔎</button>
      </form>
    );
  }
}

PokevisInput.propTypes = {
  onPokemonAdd: PropTypes.func
};

export default PokevisInput;
