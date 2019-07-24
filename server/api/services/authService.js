import * as jwt from 'jsonwebtoken';
import config from '../../config';
import * as bcypt from 'bcryptjs';


class AuthService {
    signToken(username, ownerId, rolesId) {
        const payload = {
                            username: username,
                            ownerId: ownerId,
                            rolesId: rolesId
                        }
        const secret = config.JWT_SECRET
        const options = {expiresIn: '2d'}

        return jwt.sign(payload, secret, options)
    }

    
    comparePassword(passwordNeedCheck, hashPassword) {
        return bcypt.compare(passwordNeedCheck, hashPassword)
    }

    
}


export default new AuthService()