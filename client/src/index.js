import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './AppRouter';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
