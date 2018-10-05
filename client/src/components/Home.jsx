import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const Home = ({
  loggedIn,
}) => (
  <div className="Home">
    <p className="App-intro">
      Welcome to the main page.
    </p>
    {!loggedIn && (
      <div>
        Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link>.
      </div>
    )}
  </div>
);

Home.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Home;
