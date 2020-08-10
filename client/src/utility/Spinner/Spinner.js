import React, { Component } from 'react';
import './Spinner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faSync);

class Spinner extends Component {
  render() {
    return (
      <div className="spinner-wrapper">
        <FontAwesomeIcon icon="sync" size="6x" spin />
      </div>
    );
  }
}

export default Spinner;
