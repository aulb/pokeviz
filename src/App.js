import React, { Component } from 'react';
import './App.css';
import ReactHighcharts from 'react-highcharts';
import { makeHighchartsConfig, isValidPokemonName } from './utils';
import PokevisList from './components/PokevisList';
import PokevisInput from './components/PokevisInput';

// TODO: ReactHighcharts wrapper -> RENAME
class App extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      pokemonList: [],
    };
  }

  onSubmit(event) {
    if (event) event.preventDefault();

    const pokemonName = this.refs.speciesText.value;
    if (!isValidPokemonName(pokemonName)) return;

    const { pokemonList } = this.state;
    pokemonList.push(pokemonName);
    this.setState({ pokemonList });
  }

  render() {
    const { pokemonList } = this.state;
    return (<div>
      <form onSubmit={this.onSubmit}>
        <input ref="speciesText" type="text" />
        <button><span role="img">🔎</span></button>
      </form>
      <PokevisList pokemonList={pokemonList} />
      <div className="App">
        <ReactHighcharts config={makeHighchartsConfig(this.state.pokemonList)}></ReactHighcharts>
      </div>
    </div>);
  }
}

export default App;
