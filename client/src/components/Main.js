import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <h3>Select a category.</h3>
      <Link to='/questions/algorithms-and-data-structures'>Algorithms and Data Structures</Link>
      <br />
      <Link to='/questions/javascript'>JavaScript</Link>
    </div>
  );
};

export default Main;