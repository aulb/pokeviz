import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPokemonNameSuggestions } from '../utils';

class BaseInput extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderSuggestionDropdown = this.renderSuggestionDropdown.bind(this);
    this.state = {
      query: '',
      result: []
    };
  }

  onChange() {
    this.setState({
      query: this.input.value,
      result: getPokemonNameSuggestions(this.input.value)
    });
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    const { addPokemon } = this.props;
    const pokemonName = this.input.value;
    this.form.reset();
    addPokemon(pokemonName);
  }

  renderSuggestionDropdown() {
    return null;
  }

  render() {
    return (<form ref={el => this.form = el} onSubmit={this.onSubmit}>
      <input id="input" ref={el => this.input = el} type="text" onChange={this.onChange}/>
      <button id="search"><span role="img" aria-label="find">🔎</span></button>
      { this.renderSuggestionDropdown() }
    </form>);
  }
}

BaseInput.propTypes = {
  addPokemon: PropTypes.func
};

export default BaseInput;
