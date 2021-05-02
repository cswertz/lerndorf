import { createStore, compose, applyMiddleware } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';
import storage from 'redux-persist/lib/storage';
import thunkMiddlware from 'redux-thunk';
import { Provider } from 'react-redux';

import lerndorfApp from './reducers';
import Router from './Router';

import './App.css';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, lerndorfApp);

const store = createStore(persistedReducer, undefined, compose(applyMiddleware(thunkMiddlware)));

const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div className="App">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </PersistGate>
  </Provider>
);

export default App;
