import mongoose from "mongoose";
const Schema = mongoose.Schema;


const sessionModel = new Schema({
    scheduleId: {type: Schema.Types.ObjectId, ref: 'schedule'},
    studentId: {type: Schema.Types.ObjectId, ref: 'user'},
    tutorId: {type: Schema.Types.ObjectId, ref: 'user'},
    status: {type: String, enum: ['Not Started', 'Ended', 'Cancelled']},
    rateStar: {type: Number, enum: [0, 1, 2, 3, 4, 5], default: 0},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
    documents: {type: Array},
    reportIssue: {type: String, enum: ['Late', 'Absent', 'Left early', 'Technical Dificultly', 'Others']},
    reportComment: {Type: String},
    reported: {type: Boolean, default: 'false'}
})


module.exports = mongoose.model('session', sessionModel)