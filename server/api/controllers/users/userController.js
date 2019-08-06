import userService from '../../services/userService';
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


    getUserById(req, res) {
        userService
            .getUserById(req.params.id)
            .then(userFound => {
                if(!userFound) res.status(404).json({success: false, message: 'Not Found!!'});
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
        userService
            .getUserById(req.params.id)
            .then(userFound =>{
                if(!userFound) res.status(404).json({success: false, message: 'Not Found!!'}).end()
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
                if(!userFound) res.status(403).json({success: false, message: 'Access not allowed!!'})
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
                            res.status(200).json({success: true, userUpdated})
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


    // updateAvatarPath(req, res) {
    //     //set the storage engine:
    //     var storage = multer.diskStorage({
    //         destination: function(req, file, cb) {
    //             console.log('storage here')
    //             cb(null, './public/uploads')
    //         },
    //         filename: function(req, file, cb) {
    //             console.log('file' + file)
    //             cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    //             // cb(null, file.originalname)
    //         }
    //     })

    //     //upload
    //     var upload = multer({
    //         storage: storage,
    //         fileFilter: function(req, file, cb) {
    //             //allowed ext
    //             var fileTypes = /jpeg|jpg|gif|png/;
    //             //check ext
    //             var extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    //             //check mime
    //             var mimeType = fileTypes.test(file.mimetype);

    //             if(mimeType && extName !== fileTypes) {
    //                 return cb(null, true)
    //             } else cb('ERR. Image only!!!')
    //         }
    //     }).single('avatar')

    //     upload(req, res, (err) => {
    //         if(err){
    //             res.status(500)
    //         } else {
    //             if(req.file == undefined){
    //                 res.status(403).json('No file seclected')
    //             } else {
    //                 console.log(req.file)
    //                 res.status(200).json({path: `/uploads/${req.file.filename}`})
    //             }
    //         }
    //     });
    // }


    deleteUser(req, res) {
        userService
            .deleteUser(req.params.id)
            .then(userActiveUpdated => {
                if(!userActiveUpdated) res.status(401).json({success: false, message: "Something went wrong"})
                else res.status(200).json({success: true, message: "Locked", userActiveUpdated})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }


    updateTutorIntro(req, res) {
        userService
        .checkIsTutor(req.params.id)
        .then(tutorFound => {
            if(!tutorFound) res.status(401).json({success: false, message: 'This tutor not exist!!!'})
            else return tutorFound.tutorData
        })
        .then(tutorData => {
            tutorData.aboutMe = req.body.aboutMe
            tutorData.hourlyRate = req.body.hourlyRate
            res.status(200).json({success: true, tutorData})
        })
        .catch(err => {
                console.log(err)
                res.status(500).json({err})
        })
    } 


    updateTutorReference(req, res) {
        userService
        .checkIsTutor(req.params.id)
        .then(tutorFound => {
            if(!tutorFound) res.status(401).json({success: false, message: 'This tutor not exist!!!'})
            else return tutorFound.tutorData
        })
        .then(turorData => {
            console.log(req.body)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({err})
        })
    }

 
    createTuitionSchedule(req, res) {
        //set senderId & tutorId
        req.body.senderId = req.decoded.ownerId
        req.body.tutorId = req.params.tutorId
        //set courseCode
        req.body.courseCode = req.decoded.username + req.body.academicLevel
        //

        const TuitionSchedule = req.body;
        TODO //calculator date time and total fee

    }

    
    
}


export default new UserController()