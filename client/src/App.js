import { createStore, compose, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunkMiddlware from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';

import lerndorfApp from './reducers';
import Router from './Router';

import './App.css';

const store = createStore(
  lerndorfApp,
  undefined,
  compose(
    applyMiddleware(thunkMiddlware),
  ),
);

const App = () => (
  <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  </Provider>
);

export default App;
