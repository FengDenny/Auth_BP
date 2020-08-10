import React, { Component } from 'react';
import axios from 'axios';
import '../../css/ResetPassword.css';

class ResetPassword extends Component {
  state = {
    password: '',
    passwordConfirm: '',
  };

  passwordReset = (e) => this.setState({ password: e.target.value });
  passwordConfirmReset = (e) =>
    this.setState({ passwordConfirm: e.target.value });

  ResetPassword = async (e) => {
    e.preventDefault();
    console.log(this.state.password);
    console.log(this.state.passwordConfirm);
    console.log(this.props.match.params.token);

    const token = this.props.match.params.token;

    const url = `https://localhost:3001/api/users/resetPassword/${token}`;

    const data = {
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    const res = await axios.patch(url, data);
    console.log(res);
  };

  render() {
    return (
      <div className="reset-password">
        <div className="reset-password-content">
          <header>
            <h1>Reset Your Password</h1>
          </header>
          <section>
            <form onSubmit={this.ResetPassword}>
              <input
                type="Password"
                id="Password"
                onChange={this.passwordReset}
                value={this.state.password}
                placeholder="********"
              />
              <input
                type="Password"
                id="Password Confirm"
                onChange={this.passwordConfirmReset}
                value={this.state.passwordConfirm}
                placeholder="********"
              />
              <input type="submit" value="Reset" />
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
