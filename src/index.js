import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './common/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <HashRouter>
        <App message="Hello, this is a basic react app.." />
    </HashRouter>,
    document.getElementById("root")
);
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
