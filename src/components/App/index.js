import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Dashboard from '../Dashboard';
import SignUp from '../SignUp';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import Layout from '../Layout';
import Calculator from '../Calculator';
import Vocabular from '../Vocabular';
import Library from '../Library';

import './style.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <PrivateRoute>
              <Layout>
                <Route path="/" exact>
                  <Dashboard />
                </Route>
                <Route path="/calculator" exact>
                  <Calculator />
                </Route>
                <Route path="/vocabular" exact>
                  <Vocabular />
                </Route>
                <Route path="/library" exact>
                  <Library />
                </Route>
              </Layout>
            </PrivateRoute>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
