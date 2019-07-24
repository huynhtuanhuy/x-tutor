import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const tutorCalendarModel = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    tutorCalendar: [{
        startDate: {type: Date},
        endDate: {type: Date},
        status: {type: String, enum:['pending', 'in progress', 'closed', 'cancelled', 'deffered']}
    }]
},{
    timestamps: true
})


module.exports = mongoose.model('tutorCalendar', tutorCalendarModel)