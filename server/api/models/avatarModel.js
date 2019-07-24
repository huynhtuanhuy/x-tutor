import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const avatarModel = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    photo: {type: Buffer}
});


module.exports = mongoose.model('avatar', avatarModel);