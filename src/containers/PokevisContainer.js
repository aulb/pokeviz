import { connect } from 'react-redux';
import { compose } from 'redux';
import { addToPokemonList, deleteFromPokemonList } from '../actions';
import BaseContainer from '../components/BaseContainer';

const mapStateToProps = state => ({
  pokemonList: state.pokemonList
});

const mapDispatchToProps = dispatch => {
  return {
    addToPokemonList: pokemonName => compose(dispatch, addToPokemonList)(pokemonName),
    deleteFromPokemonList: pokemonName => compose(dispatch, deleteFromPokemonList)(pokemonName)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseContainer);
