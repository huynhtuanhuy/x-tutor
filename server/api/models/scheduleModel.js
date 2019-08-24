import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const scheduleModel = new Schema({
    preferDay: {type: Array, required: [true, 'Prefer day is required, choose at least one day']},
    periodeStart: {type: Date, required: true},
    periodeEnd: {type: Date},
    lessionsPerCourse: {type: Number},
    feePerHour: {type: Number},
    feeTotal: {type: Number},
    senderId: {type: Schema.Types.ObjectId, ref: 'user'},
    tutorId: {type: Schema.Types.ObjectId, ref: 'user'},
    country: {type: String},
    academicLevel: {type: String, enum: ['Beginner', 'Intensive', 'Advanced', 'Master']},
    courseCode: {type: String, required: true},
    paymentType: {type: String, enum: ['Credit Card', 'Paypal']},
    paymentAmount: {type: Number},
    paymentStatus: {type: String, enum:['Pending', 'In progress', 'Completed', 'Cancelled', 'Refunded'], default:'Pending'},
    paymentDate: {type: Date,default: null},
    hoursPerLession: {type: Number, required: true},
    hourStart: {type: Number, required: true},
    hourEnd: {type: Number},
    tuitionStatus: {type: String, enum: ['Pending', 'In Progress', 'Cancelled', 'Deferred'], default: 'Pending'}
}, {
    timestamps: true
})


// scheduleModel.pre('findByIdAndUpdate', function(next){
//     if(!this.isModified('hourStart')){
//         return next()
//     } else {
//         console.log(this.feeTotal)
//         //calculator total fee
//         this.feeTotal = this.feePerHour*this.hoursPerLession*this.lessionsPerCourse
//         //calculator date time
//         this.hourEnd = this.hourStart + this.hoursPerLession
//         //set periodeEnd
//         this.periodeEnd = '2019-10-10'

//         next()        
//     }
// })


module.exports = mongoose.model('schedule', scheduleModel);