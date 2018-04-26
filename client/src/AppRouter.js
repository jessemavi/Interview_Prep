import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';
import Questions from './components/Questions';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/main' component={Main} />
        <Route path='/questions/:category' component={Questions} />
      </div>
    </Router>
  );
};

export default AppRouter;