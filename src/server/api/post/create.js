import Q from 'q';
import {Post} from '../../schema/index';

const createPost = (text)=> {
    const deferred = Q.defer();
    const post = new Post({ text });
    post.save((err, savedPost) => {
        if (err) deferred.reject(err);
        deferred.resolve(savedPost);
    });
    return deferred.promise;
}

export default (req, res)=> {
    const { text } = req.body;
    createPost(text).then(savedPost => res.status(200).json(savedPost)).catch(() => res.sendStatus(422));
}