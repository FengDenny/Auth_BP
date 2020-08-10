import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logoutAction from '../../actions/logoutAction';
import { bindActionCreators } from 'redux';
import '../../css/Navbar.css';

class Navbar extends Component {
  handleSignInDelay = (e) => {
    e.preventDefault();
    setTimeout(function () {
      window.location.assign('/login');
    }, 1500);
  };

  handleSignUpDelay = (e) => {
    e.preventDefault();
    setTimeout(function () {
      window.location.assign('/signup');
    }, 1500);
  };

  render() {
    console.log(this.props.auth.email);
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
              {this.props.auth.email ? (
                <>
                  <li>hello,{this.props.auth.email}</li>
                  <Link
                    to="/login"
                    onClick={this.handleSignInDelay}
                    className="signin-btn"
                  >
                    Sign out
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={this.handleSignInDelay}
                    className="signin-btn"
                  >
                    Sign in
                  </Link>
                  <Link to="/signup" className="signup-btn">
                    Sign up, For Free
                  </Link>
                </>
              )}
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatcher) {
  return bindActionCreators(
    {
      logoutAction: logoutAction,
    },
    dispatcher
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
