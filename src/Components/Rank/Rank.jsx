import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Rank extends Component {
  render() {
    const { numEntries, name } = this.props;
    return (
      <div className="">
        <p className='f3'>Hi {name}! this is your current Rank</p>
        <p className='f1'>#{numEntries}</p>
      </div>
    );
  }
}

Rank.propTypes = {
  numEntries: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Rank;