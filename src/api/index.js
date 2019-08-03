import express from 'express';
import createPost from './post/create';

const router = express.Router();
router.route('/create').post(createPost);

export default app => {
    app.use('/post', router);
};
