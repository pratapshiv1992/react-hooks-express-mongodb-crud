import Q from 'q';
import {Post} from '../../schema';

const deletePost = ({id})=>{
    const deferred = Q.defer();
    Post.remove({ _id: id }, (err, todo) => {
        if (err) deferred.reject(err);
        deferred.resolve(todo);
    });
    return deferred.promise;
}


export default (req, res)=>{
    deletePost(req.params).then(() => res.sendStatus(200)).catch(() => res.sendStatus(422));
}
