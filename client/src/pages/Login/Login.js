import React, { Component } from 'react';
import '../../css/Login.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import regAction from '../../actions/regAction';
import { Link } from 'react-router-dom';
import '../../css/sweetAlert.css';
import Helmet from 'react-helmet';
import swal from 'sweetalert';

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
    try {
      const url = 'https://localhost:3001/api/users/login';
      const data = {
        email: this.state.email,
        password: this.state.password,
      };
      const res = await axios.post(url, data, { withCredentials: true });
      const token = res.data.token;
      if (res.data.status === 'success') {
        swal({
          title: 'Success!',
          icon: 'success',
        });
        this.props.regAction(res.data);
      }
    } catch (err) {
      swal({
        title: err.response.data.message,
        icon: 'error',
      });
    }
  };

  render() {
    const title = `${window.title}`;
    return (
      <>
        <Helmet>
          <title>
            {title} |{' '}
            {this.props.auth.firstName + ' ' + this.props.auth.lastName}
          </title>
          <meta
            name="description"
            content={this.props.auth.firstName + ' ' + this.props.auth.lastName}
          />
        </Helmet>
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
      </>
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
      regAction: regAction,
    },
    dispatcher
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
