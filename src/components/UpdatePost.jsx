import React from 'react';
import CreatePost from '../components/CreatePost';

const UpdatePost = (props)=><CreatePost {...props} editMode={true} />;

export default UpdatePost;