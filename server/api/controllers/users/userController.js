import userService from '../../services/userService';
import scheduleService from '../../services/scheduleService';
import * as body from 'body-parser';
import multer from 'multer';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';


class UserController {
    getAllUser(req, res) {
        userService
            .getAllUser()
            .then(allUser => {
                res.status(200).json({success: true, allUser})
            })
            .catch(err => res.status(500).json({success: false, err}))
    }


    getAllTutors(req, res) {
        userService
            .getAllTutor()
            .then(allTutor => {
                res.status(200).json({success: true, allTutor})
            })
            .catch(err => res.status(500).json({success: false, err}))
    }

    getUserById(req, res) {
        userService
            .getUserById(req.params.id)
            .then(userFound => {
                if(!userFound) res.status(404).json({success: false, message: 'User is not exist!!'});
                else {
                    res.status(200).json({success: true, userFound})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({err})
            })
    }


    updateInfoUser(req, res) {
        console.log(req.decoded.ownerId)
        userService
            .getUserById(req.decoded.ownerId)
            .then(userFound =>{
                if(!userFound) res.status(403).json({success: false, message: 'Access is not allow'}).end()
                else {
                    for(let key in req.body){
                        let value = req.body[key];
                        if(value !== null) {
                            userFound[key] = value
                        }
                    }          
                    return userFound.save();
                }
            })
            .then(userUpdated =>{
                res.status(200).json({success: true, userUpdated});
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({err})
            });
    }


    updatePassword(req, res) {
        userService
            .getUserById(req.decoded.ownerId)
            .then(userFound =>{
                if(!userFound) res.status(403).json({success: false, message: 'Access is not allowed!!'})
                else {
                    console.log('oldPassword ' + req.body.oldPassword)
                    console.log('hashOldPassword ' + userFound.password)
                    bcrypt
                        .compare(req.body.oldPassword, userFound.password)
                        .then(match => {
                            if(match) {
                                console.log('newPass ' + req.body.newPassword);
                                userFound.password = req.body.newPassword;
                                return userFound.save()
                            } else res.status(401).json({success: false, message: 'Incorrect password!!!'})
                        })
                        .then(userUpdated => {
                            console.log(userUpdated)
                            res.status(200).json({success: true, message: 'Updated!!'})
                        })
                }
            })
            .catch(err =>{
                console.log(err)
                res.status(500).json(err)
            })
    }


    updateAvatar(req, res) {
        console.log(req.headers)
        console.log('updateAvatar ' + req.file)
        if(req.file){
            try {
                const path = `/uploads/${req.file.filename}`
                userService
                    .updateAvatarPath(req.params.id, path)
                    .then(userUpdated => {
                        return res.status(200).json({userUpdated, path})
                    })

            } catch(err) {
                return res.status(500).json({err})
            }
        } else {
            return res.status(403).json({success: false, message: 'No file seclected!!'})
        }
    }


    updateAvatarPath(req, res) {
        //set the storage engine:
        var storage = multer.diskStorage({
            destination: function(req, file, cb) {
                console.log('storage here')
                cb(null, './public/uploads')
            },
            filename: function(req, file, cb) {
                console.log('file' + file)
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
                // cb(null, file.originalname)
            }
        })

        //upload
        var upload = multer({
            storage: storage,
            fileFilter: function(req, file, cb) {
                //allowed ext
                var fileTypes = /jpeg|jpg|gif|png/;
                //check ext
                var extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
                //check mime
                var mimeType = fileTypes.test(file.mimetype);

                if(mimeType && extName !== fileTypes) {
                    return cb(null, true)
                } else cb('ERR. Image only!!!')
            }
        }).single('avatar')

        upload(req, res, (err) => {
            if(err){
                res.status(500)
            } else {
                if(req.file == undefined){
                    res.status(403).json('No file seclected')
                } else {
                    console.log(req.file)
                    res.status(200).json({path: `/uploads/${req.file.filename}`})
                }
            }
        });
    }


    deleteUser(req, res) {
        userService
            .deleteUser(req.decoded.ownerId)
            .then(userActiveUpdated => {
                if(!userActiveUpdated) res.status(403).json({success: false, message: "Something went wrong"})
                else res.status(200).json({success: true, message: "Locked", userActiveUpdated})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }


    updateTutorIntro(req, res) {
        userService
        .checkIsTutor(req.decoded.ownerId)
        .then(tutorFound => {
            if(!tutorFound) res.status(403).json({success: false, message: 'Access is not allowed!!!'})
            else {
                tutorFound.tutorData.aboutMe = req.body.aboutMe
                tutorFound.tutorData.hourlyRate = req.body.hourlyRate
                return tutorFound.save()
            }
        })
        .then(tutorUpdated => {            
            res.status(200).json({success: true, tutorUpdated})
        })
        .catch(err => {
                console.log(err)
                res.status(500).json({err})
        })
    } 


    updateTutorRef(req, res) {
        console.log('ownerId '+ req.decoded.ownerId)
        userService
        .checkTutor(req.decoded.ownerId)
        .then(tutorFound => {
            if(!tutorFound) res.status(403).json({success: false, message: 'Access is not allowed!!!'})
            else {
                var education = req.body.education
                education.forEach(element => {
                    console.log(element)
                    var tutorEdu =  tutorFound.tutorData.education
                    tutorEdu.push(element)
                });                
                return tutorFound.save()
            }
        })
        .then(tutorUpdated =>{
            res.status(200).json({success: true, message: 'Updated', tutorUpdated})
        } )
        .catch(err => {
            console.log(err)
            res.status(500).json({err})
        })
    }


    updateTutorExp(req, res) {
        //Tutor Working Experience
        console.log('ownerId '+ req.decoded.ownerId)
        userService
        .checkTutor(req.decoded.ownerId)
        .then(tutorFound => {
            if(!tutorFound) res.status(403).json({success: false, message: 'Access is not allowed!!!'})
            else {
                var workingExperience = req.body.workingExperience
                workingExperience.forEach(element => {
                    console.log(element)
                    var tutorExp =  tutorFound.tutorData.workingExperience
                    tutorExp.push(element)
                });                
                return tutorFound.save()
            }
        })
        .then(tutorUpdated =>{
            res.status(200).json({success: true, message: 'Updated', tutorUpdated})
        } )
        .catch(err => {
            console.log(err)
            res.status(500).json({err})
        })
    }


    updateTutorCourse(req, res) {
        //Tutor teaching subject
        console.log('ownerId '+ req.decoded.ownerId)
        userService
        .checkTutor(req.decoded.ownerId)
        .then(tutorFound => {
            if(!tutorFound) res.status(403).json({success: false, message: 'Access is not allowed!!!'})
            else {
                tutorFound.tutorData.basedIn = req.body.basedIn
                var teachingSubject= req.body.teachingSubject
                teachingSubject.forEach(element => {
                    console.log(element)
                    var tutorSbj =  tutorFound.tutorData.teachingSubject
                    tutorSbj.push(element)
                });                
                return tutorFound.save()
            }
        })
        .then(tutorUpdated =>{
            res.status(200).json({success: true, message: 'Updated', tutorUpdated})
        } )
        .catch(err => {
            console.log(err)
            res.status(500).json({err})
        })

    }



    createTuitionSchedule(req, res) {
        const tuiSchedule = req.body;
        userService
            .checkTutor(req.params.id)
            .then(tutorFound => {
                if(!tutorFound) res.status(403).json({success: false, message: 'This tutor is not exist!!'})
                else {
                    //calculator total fee
                    tuiSchedule.feePerHour = tutorFound.tutorData.hourlyRate
                    console.log(typeof tuiSchedule.feePerHour)
                    console.log(typeof tuiSchedule.hoursPerLession)
                    console.log(typeof tuiSchedule.lessionsPerCourse)
                    tuiSchedule.feeTotal = tuiSchedule.feePerHour*tuiSchedule.hoursPerLession*tuiSchedule.lessionsPerCourse
                    //set senderId & tutorId
                    tuiSchedule.senderId = req.decoded.ownerId
                    tuiSchedule.tutorId = req.params.id
                    //set courseCode
                    tuiSchedule.courseCode = req.body.academicLevel +'-' + req.decoded.username
                    //calculator date time
                    tuiSchedule.hourEnd = req.body.hourStart + req.body.hoursPerLession
                    //set periodeEnd
                    tuiSchedule.periodeEnd = '2019-10-10'
                    console.log(tuiSchedule)
                    return scheduleService.createNewSchedule(tuiSchedule)
                }
            })
            .then(scheduleCreated => {
                console.log(scheduleCreated)
                res.status(200).json({success: true, scheduleCreated})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: "Something went wrong!!!", err})
            })
    }
    
}


export default new UserController()