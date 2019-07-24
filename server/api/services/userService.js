import UserModel from '../models/userModel';
import * as path from 'path';
import ScheduleModel from '../models/scheduleModel';
import userRouter from '../controllers/users/userRouter';


class UserService {
	getAllUser() {
        return UserModel
            .find({})
    }
    

    getAllTutor() {
        return UserModel
            .find({},{
                rolsesId: 'Tutor'
            })
    }

    getUserById(id){
        return UserModel
            .findOne({
                _id: id
            })
    }


    findOneUser(){
        return UserModel
            .findOne({})
    }

    
    checkIsTutor(id){
        return UserModel
            .findOne({
                _id: id,                
                rolesId: 'Tutor'
            })
    }


    //to register new User
    createNewUser({username, password, email, rolesId}) {
        return UserModel
        .create({username, password, email, rolesId})
    }


    checkUsername(usernameNeedCheck) {
        return UserModel
            .findOne({
                username: usernameNeedCheck
            })
    }

    
    deleteUser(id) {
        return UserModel
            .update(
                {_id: id},
                {active: false}
            )
            .exec()
    }


    //avatar
    updateAvatarPath(id, path) {
        return UserModel
            .update(
                {_id: id},
                {avatar: path}
            )
    }


    createNewSchedules(TuitionSchedules){
        ScheduleModel
            .create(TuitionSchedules)
    }


    findByKeyWord(value) {
        return UserModel
            .find(
                {value}
            )
    }


}

export default new UserService()