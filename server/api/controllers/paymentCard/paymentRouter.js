import PaymentController from './paymentController';
import * as express from 'express';


export default express
    .Router()
    .get('/', PaymentController.getAllCard)
    .get('/:cardId', PaymentController.getOneCard)
    .post('/', PaymentController.createNewCard)
    .put('/:cardId', PaymentController.updateCardInfo)
    .delete('/:cardId', PaymentController.deleteCard)
