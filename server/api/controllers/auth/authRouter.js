import AuthController from './authController';
import * as express from 'express';
import AuthMiddleware from '../../middlewares/auth';


export default express
    .Router()
    .post('/register', AuthController.registerUser)
    .post('/', AuthController.logIn)
    .get('/', AuthMiddleware.validateToken)