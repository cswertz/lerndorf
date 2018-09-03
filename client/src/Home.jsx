import React from 'react';

import Appbar from './Appbar'
import logo from './logo.svg';

const Home = () => (
  <div className="Home">
    <Appbar />
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit
      <code>src/App.js</code>
      and save to reload.
    </p>
  </div>
);

export default Home;
