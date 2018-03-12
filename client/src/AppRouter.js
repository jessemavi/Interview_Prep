import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import Questions from './components/Questions';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/questions' component={Questions} />
      </div>
    </Router>
  );
};

export default AppRouter;