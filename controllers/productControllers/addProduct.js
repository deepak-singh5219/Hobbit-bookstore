const Product = require('../../models/productModel');
const formidable = require('formidable');
const fs = require('fs');
const {s3FileUpload,s3FileDelete} = require('../../services/imageUpload')
const Mongoose = require('mongoose');
const asyncHandler = require('../../services/asyncHandler');
const customError = require('../../utils/customError');
const config = require('../../config/index');


/**********************************************************
 * @ADD_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for creating a new product
 * @description Only admin can create the coupon
 * @description Uses AWS S3 Bucket for image upload
 * @returns Product Object
 *********************************************************/

const addProduct = asyncHandler(async(req,res) => {
    const form = formidable({
        multiples: true,
        keepExtensions: true
    });

    form.parse(req, async (err, fields, files) => {
          try {
            if(err) {
                throw new customError(err.message || "Something went wrong", 500);
            }
            let productId = new Mongoose.Types.ObjectId().toHexString();

            //check for fields
            if(!fields.name || !fields.price || !fields.description || !fields.collectionId)
            {
                throw new customError("Please fill all details", 500)
            }
            
            // handling images
            let imgArrayResp = Promise.all(
                Object.keys(files).map( async (filekey, index) => {
                    const element = files[filekey];
                    const data = fs.readFileSync(element.filepath)

                    const upload = await s3FileUpload({
                        bucketName: config.S3_BUCKET_NAME,
                        key:`products/${productId}/photo_${index + 1}.png`,
                        body:data,
                        contentType: element.mimetype
                    })
                    return {
                        secure_url: upload.Location
                    }
                })
            )

            let imgArray = await imgArrayResp;
            const product = await Product.create({
                _id: productId,
                photos: imgArray,
                ...fields
            });

            if(!product) {
                throw new customError("Product was not created", 400);
                // we need to remove image from s3 in this case
            }

            res.status(200).json({
                success:true,
                product
            })
          } catch (err) {
            return res.status(500).json({
                success:false,
                message: err.message || "Something went wrong"
            })
          }
    })
})


module.exports = addProduct;
