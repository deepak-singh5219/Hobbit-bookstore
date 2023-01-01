import { Collection } from "mongoose";
import collectionModel from "../../models/collectionModel";
import asyncHandler from "../../services/asyncHandler"
import CustomError from "../../utils/customError";
import customError from "../../utils/customError";

/******************************************************
 * @Create_COLLECTION
 * @route http://localhost:5000/api/collection
 * @description controller for creating new collection
 * @parameters name
 * @returns collection model
 ******************************************************/

const createCollection = asyncHandler( async(req,res) => {

    try {
    // fetching name from front
    const {name} = req.body

    if(!name) {
        throw new CustomError("Collection name is required",400);
    }

    // add this name to database
    const collection = await Collection.create({
        name
    })

    // collection created......sending success response

    res.status(200).json({
       success:true,
       message: "Collection created with success",
       collection 
    })
        
    } catch (err) {
        throw new customError(err.message || "collection not created", 500);
    }
   

})

module.exports = createCollection;

