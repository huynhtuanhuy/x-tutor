import * as jwt from 'jsonwebtoken';
import config from '../../config';
import { type } from 'os';

class AuthMiddleware {
    validateToken(req, res, next) {
        // console.log(req.headers)
        //fomat of token
        // Authorization: Bearer <token>

        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== "undefined") {
            //split at the space and get token from array
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];

            //set the token
            req.token = bearerToken;

            jwt.verify(req.token, config.JWT_SECRET, (err, authData) => {
                if(err) {
                    res.status(403).json({
                        success: false, 
                        message: 'Failed to authenticate token! Authorization header is corrupted'
                    })
                } else {
                    // Let's pass back the decoded token to the request object
                    req.decoded = authData; 
                    //console.log(req.decoded)
                    next()
                }
            })
        } else {
            res.status(404).json({success: false, msg: 'Authenticate token is not supplied'})
        }


        // if(req.headers.token) {
        //     try {
        //         console.log(req.headers.token)
        //         // verify makes sure that the token hasn't expired and has been issued by us
        //         result = jwt.verify(req.headers.token, config.JWT_SECRET, {expiresIn: '2d'})

        //         // Let's pass back the decoded token to the request object
        //         req.decoded = result

        //         next()

        //     } catch(err){
        //         console.log(err)
        //         return res.sendStatus(401).json({
        //             success: false, 
        //             message: 'Failed to authenticate token!'
        //         })
        //     }
        // } else {
        //     return res.sendStatus(401).json({success: false, message: 'Authenticate token is not supplied'})
        // }   
    }
}


export default new AuthMiddleware()