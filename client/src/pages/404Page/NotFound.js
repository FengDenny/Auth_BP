import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Error from '../../images/Error.png';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <div className="not-found-content">
          <img src={Error} alt="Not found" />
          <h1 className="secondary-heading">We apologize!</h1>
          <p>
            The page you're trying to access does not exists or is no longer
            available.
          </p>
          <p>
            if you have any questions, let us know!
            <a href="mailto:fengdennyy@gmail.com">Email us</a>
          </p>
          <button>
            <Link to="/"> Homepage</Link>
          </button>
        </div>
      </div>
    );
  }
}
export default NotFound;
