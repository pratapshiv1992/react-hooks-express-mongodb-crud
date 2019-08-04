import Q from 'q';
import {Post} from '../../schema/index';

const listing = (data)=> {
    const deferred = Q.defer();
    Post.find(data, (err, posts) => {
        if (err) deferred.reject(err);
        deferred.resolve(posts);
    });
    return deferred.promise;
}

export default (req, res)=> {
    let {id} = req.query, data = {};
    if(id){
        data['_id'] = id;
    }
    listing(data).then(posts => res.status(200).json(posts)).catch(() => res.sendStatus(422));
}