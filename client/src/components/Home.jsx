import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Home = ({ loggedIn }) => (
  <div className="Home">
    <p className="App-intro">Welcome to the main page.</p>
    {!loggedIn && (
      <div>
        Please <Link to="/users/login">Login</Link> or <Link to="/users/register">Register</Link>.
      </div>
    )}
    {loggedIn && <div>You are logged in.</div>}
  </div>
);

Home.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Home;
