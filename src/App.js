import React, { Component } from 'react';
import './App.css';
import ReactHighcharts from 'react-highcharts';
import { makeHighchartsConfig } from './utils';
import PokeInputForm from './components/PokeInputForm';

// TODO: ReactHighcharts wrapper -> RENAME
class App extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      pokemon: [],
    };
  }

  onSubmit(event) {
    if (event) event.preventDefault();
    const { pokemon } = this.state;

    pokemon.push(this.refs.speciesText.value);
    this.setState({ pokemon });
  }

  render() {
    return (<div>
      <form onSubmit={this.onSubmit}>
        <input ref="speciesText" type="text" />
        <button>🔎</button>
      </form>
      <div className="App">
        <ReactHighcharts config={makeHighchartsConfig(this.state.pokemon)}></ReactHighcharts>
      </div>
    </div>);
  }
}

export default App;
