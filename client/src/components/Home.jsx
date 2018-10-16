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
        Please <Link to="/users/login">Login</Link> or <Link to="/users/register">Register</Link>.
      </div>
    )}
    {loggedIn && (
      <div>
        <ul>
          <li><Link to="/languages">Languages</Link></li>
          <li><Link to="/taxonomies">Taxonomies</Link></li>
          <li><Link to="/users/roles">Roles</Link></li>
        </ul>
      </div>
    )}
  </div>
);

Home.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Home;
