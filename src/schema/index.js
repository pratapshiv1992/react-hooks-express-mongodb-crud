import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Post = mongoose.model('Post', PostSchema);

module.exports = {
    Post,
}