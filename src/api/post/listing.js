import Q from 'q';
import {Post} from '../../schema';

const listing = ()=> {
    const deferred = Q.defer();
    Post.find({}, (err, posts) => {
        if (err) deferred.reject(err);
        deferred.resolve(posts);
    });
    return deferred.promise;
}

export default (req, res)=> {
    listing().then(posts => res.status(200).json(posts)).catch(() => res.sendStatus(422));
}