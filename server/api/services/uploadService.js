import * as multer from 'multer';
import * as path from 'path';


class MulterService {
    checkAvatarFile(file, cb) {
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
}


export default new MulterService()