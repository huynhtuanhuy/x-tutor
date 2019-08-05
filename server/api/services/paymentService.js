import PaymentModel from '../models/paymentModel';



class PaymentService {
    getAllCard(id) {
        return PaymentModel
            .find({userId: id})
    }


    getOneCard(id) {
        return PaymentModel
            .find({
                _id: id
            })
    }

    createNewCard(card){
        return PaymentModel
            .create(card)
    }

    deleteCard(id){
        return PaymentModel
            .remove({
                _id: id
            })
    }

    findByIdAndUpdate(id, card) {
        return PaymentModel
            .findByIdAndUpdate(id, card, {new: true})
    }

}


export default new PaymentService()