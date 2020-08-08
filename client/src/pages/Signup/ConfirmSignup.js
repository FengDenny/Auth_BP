import React, { Component } from 'react';
// npm i @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faUserCheck);

class ConfirmSignup extends Component {
  state = { redirect: null };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ redirect: window.location.assign('/login') });
    }, 4000);
  }
  render() {
    return (
      <div className="confirmed">
        <div className="confirmed-content">
          <header>
            <FontAwesomeIcon
              style={{ color: '#c86e5f' }}
              icon={faUserCheck}
              size="2x"
            />
            <h1 style={{ color: '#c86e5f', marginTop: '1rem' }}>
              Your email has been verified, Login now!
            </h1>
          </header>
        </div>
      </div>
    );
  }
}
export default ConfirmSignup;
