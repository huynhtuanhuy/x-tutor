import PaymentService from '../../services/paymentService';
import * as body from 'body-parser';


class PaymentController {
    getAllCard(req, res) {
        PaymentService
            .getAllCard(req.decoded.ownerId)
            .then(cards => {
                res.status(200).json(cards)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }


    getOneCard(req, res) {
        PaymentService
            .getOneCard(req.params.cardId)
            .then(card => {
                if(!card) res.status(404).json({success: false, message: 'Not found!!'})
                else res.status(200).json(card)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }


    createNewCard(req, res) {
        req.body.userId = req.decoded.ownerId;
        const {card} = req.body
        console.log(card)
        PaymentService
            .createNewCard(card)
            .then(cardCreated => res.status(200).json({success: true, message: 'Created!!', cardCreated}))
            .catch(err => {
                console.log(err)
                res.status(500).json({success: false, err})
            })
    }


    deleteCard(req, res) {
        PaymentService
            .deleteCard(req.params.cardId)
            .then(res.status(200).json({success: true, message: "deleted!"}))
            .catch(err => {
                console.log(err)
                res.status(500).json({success: false, err})
            })
    }


    updateCardInfo( req, res) {
        PaymentService
            .getOneCard(req.params.cardId)
            .then(cardFound => {
                if(!cardFound) res.status(404).json({success: false, message: 'Not found!!'})
                else {
                    for(let key in req.body){
                        let value = req.body[key];
                        if(value !== null) {
                            cardFound[key] = value
                        }
                    }
                    return cardFound.save()
                }
            })            
            .then(cardUpdated => {
                res.status(200).json({success: true, cardUpdated})
            })
            .catch(err => {
                 console.log(err)
                 res.status(500).json(err)
            })
    }

}


export default new PaymentController()