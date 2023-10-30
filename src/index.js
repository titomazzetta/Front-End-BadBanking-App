// index.js
import 'bootstrap/dist/js/bootstrap.min.js';




import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './components/context';

ReactDOM.render(
    <UserProvider>
        <App />
    </UserProvider>,
    document.getElementById('root')
);
