import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';
import Questions from './components/Questions';
import UserDashboard from './components/UserDashboard';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/main' component={Main} />
        <Route path='/questions/:category' component={Questions} />
        <Route path='/user-dashboard' component={UserDashboard} />
      </div>
    </Router>
  );
};

export default AppRouter;