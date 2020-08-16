import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import regAction from '../../actions/regAction';
import axios from 'axios';
import swal from 'sweetalert';
import Helmet from 'react-helmet';

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

  submitAccountPasswordChange = (e) => {
    e.preventDefault();
    const url = 'https://localhost:3001/api/users//update_password';
    const data = {
      passwordCurrent: this.state.passwordCurrent,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };
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
              <h1>Account Settings: {this.props.auth.firstName}</h1>
            </header>
            <section>
              <form onSubmit={this.submitAccountDataChange}>
                <div className="form-grid">
                  <input
                    type="text"
                    id="fname"
                    onChange={this.fname}
                    value={this.state.firstName}
                    placeholder={this.props.auth.firstName}
                    required
                  />
                  <input
                    type="text"
                    id="lname"
                    onChange={this.lname}
                    value={this.state.lastName}
                    placeholder={this.props.auth.lastName}
                    required
                  />
                  <input
                    type="text"
                    id="email"
                    onChange={this.email}
                    value={this.state.email}
                    placeholder={this.props.auth.email}
                  />
                  {/* <input
                    type="Password"
                    id="PasswordCurrent"
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
                  /> */}
                  <input type="submit" value="Update" />
                </div>
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
