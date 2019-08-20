import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const CommentModel = new Schema({
    comment: {type: Array},
    senderId: {type: Schema.Types.ObjectId, ref: 'user'},
    receiverId: {type: Schema.Types.ObjectId, ref: 'user'}
})


module.exports = mongoose.model('comment', CommentModel)