const productImage_upload = require('../config/productImage.multer.config');

/**
 * This middleware handles all product uploads
 * 1. handles image uploads
 * 2. handles product infos
 */
const handleImageUpload = (req, res, next) =>{
    productImage_upload.single('image')(req, res, (err) => {
        if (err) {
            if(err.code === 'INVALID_FILE_TYPE'){
                return res.status(400).json({
                    error: 'Only image files (jpeg, jpg, webp, png) are allowed! Max File Size 2 MB.'
                })
            }
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File size too large. Max limit is 2MB.' });
            }
            return res.status(400).json({ error: err.message });
        }
        
        // Pass control to the next handler if no errors occurred
        next();
    });
}

module.exports = {handleImageUpload}