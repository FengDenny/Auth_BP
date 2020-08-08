import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Redirect.css';

class Redirect extends Component {
  render() {
    let data = localStorage.getItem('value');
    return (
      <div className="redirect">
        <div className="redirect-content">
          <header>
            <h2>
              Your password reset link has been sent to <span>{data}.</span>
            </h2>
            <h2>
              Please click the reset password link to set your new password.
            </h2>
            <p>
              Didn't receive the email yet?
              <Link to="/forgotPassword">try again!</Link>
            </p>
          </header>
        </div>
      </div>
    );
  }
}
export default Redirect;
