// import * as multer from 'multer';
// import * as path from 'path';
// import MulterService from '../services/uploadService'


// class MulterMiddleware {
//     uploadAvatar(req, res, next) {
//         //set storage
//         const storage = multer.diskStorage({
//             destination: './images/uploads',
//             filename: function(req, file, cb) {
//                 cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//             }
//         })

//         multer({
//             storage: storage,
//             fileFilter: function(req, file, cb) {
//                 MulterService.checkAvatarFile(file, cb)
//             }
//         })
//         .single('avatar')
//     }
// }


// export default new MulterMiddleware()
