import AuthService from '../../services/authService';
import UserService from '../../services/userService'
import * as body from 'body-parser';
import * as bcrypt from 'bcryptjs';

class AuthController {
    registerUser(req, res) {
        const {username, password, email, rolesId} = req.body;
        UserService
            .createNewUser({username, password, email, rolesId})
            .then(userCreated => res.status(200).json({success:true, userCreated}))
            .catch(err => {
                console.log(err)
                res.send(500).json({err})
            })
    }


    logIn(req, res) {
        UserService
        .checkUsername(req.body.username)
        .then(userFound =>{
            if(!userFound) res.status(401).json({success: false, message: 'Incorrect username'});
            else {
                bcrypt
                    .compare(req.body.password, userFound.password)
                    .then(match =>{
                        if(match) {
                            const token = AuthService.signToken(userFound.username, userFound._id, userFound.rolesId)
                            res.json({success: true, userFound, token})
                        } 
                        else res.status(401).json({success: false, message: 'Incorrect password'})
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({err})
        })
    }

    
}


export default new AuthController()