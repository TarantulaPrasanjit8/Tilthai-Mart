const express = require('express');
const {uploadProductController, getAllProductsController, updateProductController, deleteProductController} = require('../controllers/product.controller');
const { handleImageUpload } = require('../middlewares/handleProductsUpload.middleware');
const verifyLoginToken = require('../middlewares/usersAccess.validation.middleware');
const verifyAdminLoginToken = require('../middlewares/adminUserAccess.validation.middleware');
const router = express.Router();



/**
 * 1. upload products details
 * 2. geting all products
 * 3. updating products
 * 4. deleting products
 */

// uploading products
router.post("/upload-product", verifyAdminLoginToken, handleImageUpload, uploadProductController);

// getting all products by user panel and admin panel
// 1.user
router.get("/all-products", getAllProductsController);
// 2.admin
router.get("/products-all", verifyAdminLoginToken, getAllProductsController);
// updating product specifics
router.put("/update-product/:id", verifyAdminLoginToken, handleImageUpload, updateProductController);

// deleting a specific product
// router.delete("/delete-product/:id", verifyAdminLoginToken, deleteProductController);

module.exports = router