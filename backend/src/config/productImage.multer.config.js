const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

// configuring the disk storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/images/product-images')
    },
    filename: (req, file, cb) =>{
        crypto.randomBytes(12, function (err, bytes){
            const f_name = bytes.toString("hex") + path.extname(file.originalname);
            cb(null, f_name)
        })
    }
})

// configure file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|webp|png/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        const error = new Error('Only image files (jpeg, jpg, webp, png) are allowed!');
        error.code = 'INVALID_FILE_TYPE'; // Custom code attached here
        cb(error, false);
    }
};


const productImage_upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: fileFilter
})

module.exports = productImage_upload;
