import React, { Component } from 'react';
import axios from 'axios';
import '../../css/ResetPassword.css';

class ResetPassword extends Component {
  state = {
    password: '',
    passwordConfirm: '',
    token: '',
    // firstName: '',
  };

  passwordReset = (e) => this.setState({ password: e.target.value });
  passwordConfirmReset = (e) =>
    this.setState({ passwordConfirm: e.target.value });

  ResetPassword = async (e) => {
    e.preventDefault();
    console.log(this.state.firstName);
    console.log(this.state.password);
    console.log(this.state.passwordConfirm);

    const url = `https://localhost:3001/api/users/resetPassword/${token}`;

    const data = {
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      token: this.state.token,
    };

    const res = await axios.patch(url, data);
    const token = res.data.token;
    console.log(token);
  };

  render() {
    return (
      <div className="reset-password">
        <div className="reset-password-content">
          <h1>Reset Your Password</h1>
        </div>
      </div>
    );
  }
}
export default ResetPassword;
