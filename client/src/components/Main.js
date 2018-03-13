import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <h3>Main Page</h3>
      <Link to='/questions'>Start Game</Link>
    </div>
  );
};

export default Main;