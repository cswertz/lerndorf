import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Router from './Router';
import lerndorfApp from './reducers';

import './App.css';

const store = createStore(lerndorfApp);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
