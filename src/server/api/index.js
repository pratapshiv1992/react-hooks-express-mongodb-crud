import express from 'express';
import createPost from './post/create';
import getAllPost from './post/listing';
import updatePost from './post/update';
import deletePost from './post/delete';

const router = express.Router();
router.route('/create').post(createPost);
router.route('/listing').get(getAllPost);
router.route('/update/:id').put(updatePost).delete(deletePost);


export default app => {
    app.use(router);
};
