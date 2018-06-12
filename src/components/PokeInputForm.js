import React, { Component } from 'react';

class PokeInputForm extends Component {
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

export default PokeInputForm;
