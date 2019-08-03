import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PostListing from '../components/PostListing';
import CreatePost from '../components/CreatePost';
import UpdatePost from '../components/UpdatePost';

const Test = (props)=><>Hello Test</>
const App = (props) => (
    <>
    <Switch>
        <Route path='/' exact component={PostListing} />
        <Route path='/post/create' exact component={CreatePost} />
        <Route path='/post/update/:id' exact component={UpdatePost} />
        <Redirect to="/" />
    </Switch>
    </>
);

export default App;
