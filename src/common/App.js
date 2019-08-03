import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

const App = (props) => (
    <>
    <Switch>
        <Route path='/' exact component={(props)=> <>Home page</>} />
        <Route path='/test' component={(props)=> <>Test route</>}  />
        <Redirect to="/" />
    </Switch>
    </>
);

export default App;
