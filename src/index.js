import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";

import Log from './components/auth/login';
import Dashboard from './components/layout/dash';

import NewYY from './components/fabyy/createnew';
import EditYY from './components/fabyy/edityy';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <Log />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/newyy">
            <NewYY />
          </Route>
          <Route path="/edityy/:id">
            <EditYY />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
