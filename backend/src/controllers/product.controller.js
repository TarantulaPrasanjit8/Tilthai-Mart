const {productItems} = require('../db/db');
const fs = require('fs').promises;
const path = require('path')

// controller function for uploading specific product infomations with image

const uploadProductController = async (req, res) =>{
    const {product_name, marchant_name, description, price, tax, discount, is_available, category } = req.body;
    try{
        if (!req.file) {
            return res.status(400).json({ error: 'Please select an image file to upload.' });
        }

        if(!product_name || !price || !category){
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                message: "soame mandetory fields are missing"
            })
        }

        //Construct the public URL path for the file
        const imageUrl = `${req.protocol}://${req.get('host')}/public/images/product-images/${req.file.filename}`;
        
        // product table sync in db from sequelize
        await productItems.sync();
        // insert product details
        const newProduct = await productItems.create({
            product_name: product_name,
            marchant_name: marchant_name,
            description: description,
            price: price,
            tax: tax,
            discount: discount,
            is_available: is_available,
            image_url: imageUrl,
            category: category
        })
        if(!newProduct){
            return res.status(400).json({
                message: "product upload failed"
            })
        }
        console.log("product uploaded successfully")
        res.status(200).json({
            message: 'Image and product uploaded successfully!',
            fileDetails: {
                originalName: req.file.originalname,
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size
            }
        });
    }catch(err){
        // Cleanup: Securely delete the file if the database operation fails
        console.log(err)  //for development only
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ err: 'Database error. Product could not be saved.' });
    }

}

// get all products controller
const getAllProductsController = async (req, res) =>{
    try{
        // find all products 
        const allProducts = await productItems.findAll({
            order: [['created_at', 'DESC']]
        });

        // check if sequelize return any record or not
        if(!allProducts){
            return res.status(404).json({
                message: "no product available"
            })
        }
        res.status(200).json({
            message: "all products",
            allProducts
        })
    }catch(err){
        console.log(err) // for development only
        return res.status(500).json({
            message: "server error, no products available"
        })
    }
}

// delete product by id
// const deleteProductController = async (req, res) =>{
//     try {
//         // 1. Extract the ID from the URL path (e.g., /product/:id -> req.params.id)
//         const { id } = req.params;

//         // 2. Find the product first to check if it exists
//         const product = await productItems.findByPk(id);

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found."
//             });
//         }

//         // Deleting image file from the server folder 
//         if(product.image_url){
//                 try{
//                     const parsedURL = new URL(product.image_url);
//                     // Remove leading '/public/' if present in the pathname
//                     const relativePath = parsedURL.pathname.replace(/^\/public\//, '');
                    
//                     const oldImagePath = path.join(process.cwd(), 'public' ,relativePath);
//                     console.log(oldImagePath)
//                     await fs.unlink(oldImagePath);
//                 }catch(err){
//                     console.warn('old file not replaced')
//                 }
//         }


//         // 4. Delete the product
//         const deletedRow = await productItems.destroy({
//             where: {
//                 id: id
//             }
//         })

//         if(!deletedRow > 0){
//             return res.status(404).json({
//                 message: 'Product Deletion Unsuccessful!'
//             })
//         }

//         // 5. Send successful response
//         return res.status(200).json({
//             success: true,
//             message: "Product deleted successfully."
//         });

//     } catch (error) {

//         // Log the error for internal debugging
//         console.error("Error in deleteProductController:", error);

//         // Catch-all server error
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error occurred while deleting the product."
//         });
//     }
// }

// update product by id

const updateProductController = async (req, res) =>{
     try {
        // 1. Extract the product ID from the URL link
        const { id } = req.params;
        
        
        // replacing old image
        const oldData = await productItems.findByPk(id)
        if(!oldData){
            return res.status(404).json({
                message: 'Product Not found'
            })
        }

        // 2. Destructure data from the request body and filters out blanks(undefined, empty and null)
        const updateData = Object.fromEntries(
            Object.entries(req.body).filter(([_, value]) => value !== undefined && value !== null && String(value).trim() !== '')
        )

        //Construct the public URL path for the file
    
        let imageUrl = '';
        if(req.file){
            imageUrl = `${req.protocol}://${req.get('host')}/public/images/product-images/${req.file.filename}`;
            // appending image url to the update object
            updateData.image_url = imageUrl;
            if(oldData.image_url){
                try{
                    const parsedURL = new URL(oldData.image_url);
                    // Remove leading '/public/' if present in the pathname
                    const relativePath = parsedURL.pathname.replace(/^\/public\//, '');
                    
                    const oldImagePath = path.join(process.cwd(), 'public' ,relativePath);
                    // console.log(oldImagePath)
                    await fs.unlink(oldImagePath);
                }catch(err){
                    console.warn('old file not replaced')
                }
            }
            
             
        }


        
        if(updateData === 0 ){
            return res.status(400).json({
                message: 'No  valid fields provided for update'
            })
        }
        // 3. Update the product where the ID matches
        const [updatedRows] =  await productItems.update(
            updateData, {
            where: { id }
            }
        );

        // 4. Check if the product actually existed and was updated
        if (updatedRows === 0) {
            fs.unlinkSync(req.file.path);
            return res.status(404).json({
                success: false,
                message: "Product not found or no changes made."
            });
        }

        // 5. Send success response
        return res.status(200).json({
            success: true,
            message: "Product updated successfully."
        });

    } catch (error) {
        console.error("Error in updateProductController:", error);
        if(req.file){
            await fs.unlink(req.file.path);
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error occurred while updating the product."
        });
    }
}

module.exports = {
    uploadProductController, 
    getAllProductsController,
    updateProductController
};