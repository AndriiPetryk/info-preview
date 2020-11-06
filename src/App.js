import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import store from './reducers/store';

import Dashboard from './Info/components/Dashboard';

export const history = createBrowserHistory({});
function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Dashboard />
      </Router>
    </Provider>
  );
}

export default App;
