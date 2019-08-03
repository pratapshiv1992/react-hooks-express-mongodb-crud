import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PostListing from '../components/PostListing';
import CreatePost from '../components/CreatePost';
import UpdatePost from '../components/UpdatePost';
import ToolBar from '../common/ToolBar';

const AboutDeveloper = (props)=><>Repo link...</>

const App = (props) => (
    <>
    <ToolBar />
    <Switch>
        <Route path='/' exact component={PostListing} />
        <Route path='/post/create' exact component={CreatePost} />
        <Route path='/post/update/:id' exact component={UpdatePost} />
        <Route path='/about-developer' exact component={AboutDeveloper} />
        <Redirect to="/" />
    </Switch>
    </>
);

export default App;
