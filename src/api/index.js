import express from 'express';
import createPost from './post/create';
import getAllPost from './post/listing';

const router = express.Router();
router.route('/create').post(createPost);
router.route('/listing').get(getAllPost);

export default app => {
    app.use('/post', router);
};
