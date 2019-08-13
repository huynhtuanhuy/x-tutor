import PaymentController from './paymentController';
import * as express from 'express';


export default express
    .Router()
    .get('/', PaymentController.getAllCard)
    .post('/', PaymentController.createNewCard)
    .get('/:cardId', PaymentController.getOneCard)
    .put('/:cardId', PaymentController.updateCardInfo)
    .delete('/:cardId', PaymentController.deleteCard)
