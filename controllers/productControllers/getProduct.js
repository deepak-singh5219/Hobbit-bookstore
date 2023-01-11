const Product = require('../../models/productModel');
const asyncHandler = require('../../services/asyncHandler');
const customError = require('../../utils/customError');


/**********************************************************
 * @GET_PRODUCT_BY_ID
 * @route https://localhost:5000/api/product/:id
 * @description Controller used for getting single product details
 * @description User and admin can get single product details
 * @returns Product Object
 *********************************************************/

const getProduct = asyncHandler( async(req,res) => {

    const {id : productId} = req.params;

    const product = await Product.findById(productId);
    if(!product){
        throw new customError("Product not found", 404);
    }

    res.status(200).json({
        success:true,
        product
    })

});

module.exports = getProduct;