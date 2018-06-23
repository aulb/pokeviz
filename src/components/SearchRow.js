import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput';

const SearchRow = ({ addPokemon }) => {
  return <div className="row">
    <BaseInput addPokemon={addPokemon} />
  </div>;
}

SearchRow.propTypes = {
  addPokemon: PropTypes.func,
};

export default SearchRow;
