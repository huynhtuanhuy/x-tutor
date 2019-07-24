import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const paymentCardModel = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    cardType: {type: String, enum: ['Master Card', 'Visa']},
    nameOnCard:{type: String, required: true},
    cardNumber: {type: Number, required: true},
    expiredDate: {type: Date, required: true},
    remarks: {type: String},

    //billing address
    residentialAddress:{type: String, required: true},
    cityAddress:{type: String, required: true},
    province:{type: String, required: true},
    country:{type: String, required: true},
    postalCode:{type: String}
},{
    timestamps: true
})


module.exports = mongoose.model('paymentCard', paymentCardModel);