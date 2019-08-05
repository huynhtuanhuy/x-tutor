import UserController from './userController';
import * as express from 'express';
import multer from 'multer';
import * as path from 'path';


//set the storage engine:
const storage = multer.diskStorage({
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
const upload = multer({
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
})


export default express
    .Router()
    .get('/', UserController.getAllUser)
    .get('/:id', UserController.getUserById)
    .put('/:id', UserController.updateInfoUser)
    .patch('/:id/password', UserController.updatePassword)
    // .get('/:id/avatar', UserController.getAvatar)
    .patch('/:id/avatar', upload.single('avatar'), UserController.updateAvatar)
    .patch('/:id/tutor-intro', UserController.updateTutorIntro)
    .patch('/:id/tutor-reference', UserController.updateTutorReference)
    .post('/:id/add-tuition-schedule', UserController.createTuitionSchedule)