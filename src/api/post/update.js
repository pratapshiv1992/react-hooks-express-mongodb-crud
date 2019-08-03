import Q from 'q';
import {Post} from '../../schema';

const updatePost = ({id, text, like})=> {
    const deferred = Q.defer();
    const query = {};
    if (text) query.text = text;
    if (like) query.like = like;
    if (Object.keys(query).length) {
        Post.update({ _id: id }, { $set: query }, (err, updatedPost) => {
            if (err) deferred.reject(err);

            deferred.resolve(updatedPost);
        });
    } else {
        deferred.reject({});
    }
    return deferred.promise;
}

export default (req,res)=>{
    const { id } = req.params;
    const { text, like } = req.body;
    updatePost({id, text, like}).then((updatedPost) => res.status(200).json(updatedPost)).catch(() => res.sendStatus(422));
}