import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import regAction from '../../actions/regAction';
import swal from 'sweetalert';
import '../../css/Signup.css';

class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  fname = (e) => this.setState({ firstName: e.target.value });
  lname = (e) => this.setState({ lastName: e.target.value });
  email = (e) => this.setState({ email: e.target.value });
  password = (e) => this.setState({ password: e.target.value });
  passwordConfirm = (e) => this.setState({ passwordConfirm: e.target.value });

  submitSignup = async (e) => {
    e.preventDefault();
    console.log(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.password,
      this.state.passwordConfirm
    );
    const url = 'https://localhost:3001/api/users/signup';
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };
    const res = await axios.post(url, data);
    if (res.data.status === 'success') {
      swal({
        title: 'Signed up Successfully!',
        icon: 'success',
      });
      this.props.regAction(res.data);
    }
  };

  render() {
    console.log(this.props.auth.newUser);
    return (
      <div className="signup">
        <div className="signup-content">
          <header>
            <h1> Sign up</h1>
          </header>
          <section>
            <form onSubmit={this.submitSignup}>
              <div className="form-grid">
                <label htmlFor="fname" className="secondary-heading">
                  First Name
                </label>
                <label htmlFor="lname" className="secondary-heading">
                  Last Name
                </label>
                <label htmlFor="email" className="secondary-heading">
                  Email
                </label>
                <label htmlFor="password" className="secondary-heading">
                  Password (between 6 to 20 characters which contain at least
                  one numeric digit, one uppercase and one lowercase letter)
                </label>
                <label htmlFor="password confirm" className="secondary-heading">
                  Confirm Your Password
                </label>
                <input
                  type="text"
                  id="fname"
                  onChange={this.fname}
                  value={this.state.firstName}
                  placeholder="John"
                />
                <input
                  type="text"
                  id="lname"
                  onChange={this.lname}
                  value={this.state.lastName}
                  placeholder="Doe"
                />
              </div>
              <input
                type="text"
                id="email"
                onChange={this.email}
                value={this.state.email}
                placeholder="JohnDoe@example.com"
              />
              <input
                type="Password"
                id="Password"
                onChange={this.password}
                value={this.state.password}
                placeholder="*******"
              />
              <input
                type="Password"
                id="Password Confirm"
                placeholder="*******"
                onChange={this.passwordConfirm}
                value={this.state.passwordConfirm}
              />
              <input type="submit" value="Sign up" />
              <p>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </form>
          </section>
        </div>
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
      regAction: regAction,
    },
    dispatcher
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
