import React, { Component } from 'react';
import axios from 'axios';
import '../../css/Reset.css';

class SendToken extends Component {
  state = {
    email: '',
  };

  resetAccount = (e) => this.setState({ email: e.target.value });

  submitReset = async (e) => {
    e.preventDefault();

    console.log(this.state.email);
    const url = 'https://localhost:3001/api/users/forgotPassword';
    const data = {
      email: this.state.email,
    };

    const res = await axios.post(url, data);
    setTimeout(function () {
      window.location.assign('/sent');
    }, 1500);
    // only use to store non sensitive data
    localStorage.setItem('value', data.email);
  };

  render() {
    return (
      <div className="reset">
        <div className="reset-content">
          <header>
            <h1>Forgot your password?</h1>
            <h2>
              Tell us your registered email, so we can start resetting
              <span> your password with AuthBP </span>
            </h2>
          </header>
          <section>
            <form onSubmit={this.submitReset}>
              <input
                type="email"
                id="email"
                onChange={this.resetAccount}
                value={this.state.email}
                placeholder="Email Address"
              />

              <input type="submit" value="Reset" />
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default SendToken;
