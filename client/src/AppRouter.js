import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Main from './components/Main';
import Questions from './components/Questions';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path='/signup' component={Signup} />
        <Route path='/main' component={Main} />
        <Route path='/questions/:category' component={Questions} />
      </div>
    </Router>
  );
};

export default AppRouter;