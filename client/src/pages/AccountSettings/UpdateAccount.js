import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import regAction from '../../actions/regAction';
import axios from 'axios';
import swal from 'sweetalert';
import Helmet from 'react-helmet';
import '../../css/AccountSettings.css';

class UpdateAccount extends Component {
  state = {
    email: this.props.auth.email,
    firstName: this.props.auth.firstName,
    lastName: this.props.auth.lastName,
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  };

  fname = (e) => this.setState({ firstName: e.target.value });
  lname = (e) => this.setState({ lastName: e.target.value });
  email = (e) => this.setState({ email: e.target.value });
  passwordCurrent = (e) => this.setState({ passwordCurrent: e.target.value });
  password = (e) => this.setState({ password: e.target.value });
  passwordConfirm = (e) => this.setState({ passwordConfirm: e.target.value });

  submitAccountDataChange = async (e) => {
    e.preventDefault();
    try {
      const url = 'https://localhost:3001/api/users/update_information';

      const data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      };

      const res = await axios.patch(url, data, { withCredentials: true });

      if (res.data.status === 'success') {
        swal({
          title: 'Success',
          icon: 'success',
        });
      }
      setTimeout(function () {
        window.location.reload(1);
      }, 2300);
      this.props.regAction(res.data);
    } catch (err) {
      swal({
        title: err.response.data.message,
        icon: 'error',
      });
    }
  };

  submitAccountPasswordChange = async (e) => {
    e.preventDefault();
    try {
      const url = 'https://localhost:3001/api/users//update_password';
      const data = {
        passwordCurrent: this.state.passwordCurrent,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
      };

      const res = await axios.patch(url, data, { withCredentials: true });
      if (res.data.status === 'success') {
        swal({
          title: 'Success',
          icon: 'success',
        });
      }
      setTimeout(function () {
        window.location.reload(1);
      }, 2300);
      this.props.regAction(res.data);
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
            {title} | Account Settings: {this.props.auth.email}{' '}
          </title>
        </Helmet>
        <div className="account">
          <div className="account-content">
            <header>
              <h1>Account Settings</h1>
            </header>
            <section>
              <form onSubmit={this.submitAccountDataChange}>
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
                  <label
                    htmlFor="password current"
                    className="secondary-heading"
                  >
                    Current Password
                  </label>
                  <label htmlFor="password " className="secondary-heading">
                    Password
                  </label>
                  <label
                    htmlFor="password"
                    className=" password-verification    secondary-heading"
                  >
                    - Between 6 to 20 characters
                  </label>
                  <label
                    htmlFor="password"
                    className=" password-verification   secondary-heading"
                  >
                    - Containing at least one numeric digit
                  </label>
                  <label
                    htmlFor="password"
                    className=" password-verification   secondary-heading"
                  >
                    - One uppercase and one lowercase letter
                  </label>

                  <label
                    htmlFor="password confirm"
                    className="secondary-heading"
                  >
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
                <input type="submit" value="Save Changes" />
              </form>
              <form onSubmit={this.submitAccountPasswordChange}>
                <input
                  type="Password"
                  id="Password Current"
                  onChange={this.passwordCurrent}
                  value={this.state.passwordCurrent}
                  placeholder="*******"
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
                <input type="submit" value="Change Password" />
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccount);
