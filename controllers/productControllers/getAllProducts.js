const Product = require('../../models/productModel');
const asyncHandler = require('../../services/asyncHandler');
const customError = require('../../utils/customError');


/**********************************************************
 * @GET_ALL_PRODUCT
 * @route https://localhost:5000/api/allproducts
 * @description Controller used for getting all products details
 * @description User and admin can get all the prducts
 * @returns Products Object
 *********************************************************/


const getAllProducts = asyncHandler( async(req,res) => {
    const products = await Product.find({});
    if(!products){
        throw new customError("No Products found", 404);
    }

    res.status(200).json({
        success:true,
        products
    })
});

module.exports = getAllProducts;