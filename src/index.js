import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const handleSubmit = (event)=> {
    fetch(`/post/listing`)
    .then(response =>{
            const result = response.json();
            console.log('---result---',result);
    })
    .catch(e => console.log('Oops! something went wrong',e));
}

handleSubmit()

const App = ({message})=><>{message}</>

ReactDOM.render(<App message="Hello, this is a basic react app.." />, document.getElementById("root"));
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
