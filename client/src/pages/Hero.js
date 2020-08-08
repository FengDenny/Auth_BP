import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Signup from '../images/Sign up.png';
import Signin from '../images/Sign in.png';
import Login from '../images/Log in.png';
import Reset from '../images/Password Reset.png';
import SendGrid from '../images/sendgrid.png';
import SendGridReset from '../images/sendgridReset.png';
import MailTrap from '../images/mailtrap.png';
import MailTrapReset from '../images/mailtrapReset.png';

import '../css/Hero.css';

class Hero extends Component {
  handleLogInDelay = (e) => {
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
  handleForgotDelay = (e) => {
    e.preventDefault();
    setTimeout(function () {
      window.location.assign('/forgotPassword');
    }, 1500);
  };

  render() {
    return (
      <>
        <header>
          <div className="hero">
            <div className="hero-content">
              <h1>Authentication Boiler Plate </h1>
              <Link
                to="/login"
                onClick={this.handleLogInDelay}
                className="login-btn"
              >
                Login
              </Link>
            </div>
          </div>
        </header>
        <section>
          <h1>The Functionalities</h1>
          <div>
            {/* Login */}
            <div className="section-content-1">
              <img src={Signin} alt="Sign up" />
              <div className="section-p secondary-heading ">
                <h1>Sign in</h1>
                <p>
                  You have the ability to see how the sign in system works.
                  <span>
                    To start, logging in, create an account:
                    <Link
                      to="/signup"
                      onClick={this.handleSignUpDelay}
                      className="p-link-1"
                    >
                      Sign up now
                    </Link>
                  </span>
                  <span> to see the protected route!</span>
                </p>
              </div>
            </div>
            {/* Sign up */}
            <div className="section-content-2">
              <div className="section-p-2 secondary-heading">
                <h1>Sign up</h1>
                <p>
                  To see, how this functionality works:
                  <span>
                    <Link
                      to="/signup"
                      onClick={this.handleSignUpDelay}
                      className="p-link-1"
                    >
                      Sign up now
                    </Link>
                    to get started.
                  </span>
                  <span>
                    Already have an account?
                    <Link
                      to="/login"
                      onClick={this.handleSignUpDelay}
                      className="p-link-1"
                    >
                      Login
                    </Link>
                  </span>
                </p>
              </div>

              <img src={Signup} alt="Sign up" />
            </div>
            {/* Forgot password */}
            <div className="section-content-3">
              <img src={Reset} alt="Sign up" />
              <div className="section-p-2 secondary-heading ">
                <h1>Password Reset</h1>
                <p>
                  Already have an account, but have forgotten your password?
                  <span>Authentication Boiler Plate got you covered!</span>
                  <span>
                    Simply, click on
                    <Link
                      to="/forgotPassword"
                      onClick={this.handleForgotDelay}
                      className="p-link-1"
                    >
                      Forgot password
                    </Link>
                    to reset your password!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="section-content-4">
            <div className="section-p secondary-heading">
              <h1>Pug Production Template</h1>
              <p>
                There are different variety of template engines out there for
                you to choose from, but, I happened to have chosen pug for mine.
                <span>
                  Start implementing your own email functionality with pug using
                  <a href="https://sendgrid.com/">SendGrid.</a> It's so simple
                  and easy to do! Trust me!
                </span>
              </p>
            </div>

            <div className="img-1">
              <img src={SendGrid} alt="Email Confirmation" />
            </div>
            <div className="img-2">
              <img src={SendGridReset} alt="Reset Token" />
            </div>
          </div>
          <div className="section-content-5">
            <div className="section-p secondary-heading">
              <h1>Pug Development Template</h1>
              <p>
                If you're not ready for production, you can always use
                <a href="https://mailtrap.io/">Mailtrap</a>to test before
                deployment! It's that easy!
              </p>
            </div>
            <div className="img-3">
              <img src={MailTrapReset} alt="Reset Token" />
            </div>
            <div className="img-4">
              <img src={MailTrap} alt="Email Confirmation" />
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default Hero;
