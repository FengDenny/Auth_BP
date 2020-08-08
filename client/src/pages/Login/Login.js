import React, { Component } from 'react';
import '../../css/Login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  logEmail = (e) => this.setState({ email: e.target.value });
  logPassword = (e) => this.setState({ password: e.target.value });

  submitLogin = async (e) => {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);

    const url = 'https://localhost:3001/api/users/login';
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    const res = await axios.post(url, data);
    const token = res.data.token;
  };

  render() {
    return (
      <div className="login">
        <div className="login-content">
          <header>
            <h1>Sign in</h1>
          </header>
          <section>
            <form onSubmit={this.submitLogin}>
              <label htmlFor="email" className="secondary-heading">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                onChange={this.logEmail}
                value={this.state.email}
                placeholder="JohnDoe@example.com"
              />
              <label htmlFor="password" className="secondary-heading">
                Password
              </label>
              <Link to="/forgotPassword" className="login-forgot">
                Forgot password?
              </Link>
              <input
                type="password"
                id="password"
                onChange={this.logPassword}
                value={this.state.password}
                placeholder="*********"
              />
              <input type="submit" value="Sign in" />
              <p>
                Need an account? <Link to="/signup">Sign up now</Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    );
  }
}
export default Login;
