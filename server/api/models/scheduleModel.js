import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const scheduleModel = new Schema({
    preferDay: {type: Array, required: [true, 'Prefer day is required, choose at least one day']},
    startDate: {type: Date, required: true},
    periodeEnd: {type: Date, required: true},
    lessionPerCourse: {type: Number},
    feePerHour: {type: Number, required: true},
    feeTotal: {type: Number},
    senderId: {type: Schema.Types.ObjectId, ref: 'user'},
    tutorId: {type: Schema.Types.ObjectId, ref: 'user'},
    country: {type: String},
    academicLevel: {tpye: String, enum: ['Beginer', 'Intensive', 'Advanced', 'Master']},
    courseCode: {type: String, required: true},
    paymentType: {type: String, required: true},
    paymentAmount: {type: Number, required: true},
    paymentStatus: {type: String, enum:['Pending', 'In progress', 'Completed', 'Cancelled', 'Refunded'], default:'Pending'},
    paymentDate: {type: Date},
    hourPerLession: {type: Number, required: true},
    tuitonStatus: {type: String, enum: ['Pending', 'In Progress', 'Cancelled', 'Deferred'], default: 'Pending'}
}, {
    timestamps: true
})


module.exports = mongoose.model('schedule', scheduleModel);