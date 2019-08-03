import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PostListing from '../components/PostListing';

const Test = (props)=><>Hello Test</>
const App = (props) => (
    <>
    <Switch>
        <Route path='/' exact component={PostListing} />
        <Route path='/post/create' exact component={Test} />
        <Redirect to="/" />
    </Switch>
    </>
);

export default App;
