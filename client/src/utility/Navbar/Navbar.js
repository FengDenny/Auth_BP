import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/Navbar.css';

class Navbar extends Component {
  handleSignUpDelay = (e) => {
    e.preventDefault();
    setTimeout(function () {
      window.location.assign('/signup');
    }, 1500);
  };

  render() {
    return (
      <div className="navbar">
        <div>
          <Link to="/">
            <h1 className="Active">AuthBP</h1>
          </Link>
        </div>
        <nav>
          <ul>
            <div className="nav">
              <Link to="/">Home</Link>
              <Link
                to="/signup"
                onClick={this.handleSignUpDelay}
                className="signup-btn"
              >
                Sign up, For Free
              </Link>
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Navbar;
