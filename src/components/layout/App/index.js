import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Dashboard from '../../pages/Dashboard';
import SignUp from '../../pages/SignUp';
import Login from '../../pages/Login';
import PrivateRoute from '../PrivateRoute';
import Layout from '../Layout';
import Calculator from '../../pages/Calculator';
import MathStat from '../../pages/Calculator/Stat';
import Vocabular from '../../pages/Vocabular';
import VocabularStat from '../../pages/Vocabular/Stat';
import Library from '../../pages/Library';
import LibraryStat from '../../pages/Library/Stat';


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
                <Route path="/math-stat" exact>
                  <MathStat />
                </Route>
                <Route path="/vocabular" exact>
                  <Vocabular />
                </Route>
                <Route path="/vocabular-stat" exact>
                  <VocabularStat />
                </Route>
                <Route path="/library" exact>
                  <Library />
                </Route>
                <Route path="/library-stat" exact>
                  <LibraryStat />
                </Route>
              </Layout>
            </PrivateRoute>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
