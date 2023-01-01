import Collection from '../../models/collectionModel';
import asyncHandler from '../../services/asyncHandler';
import CustomError from '../../utils/customError';

/******************************************************
 * @Update_Collection
 * @route http://localhost:5000/api/updateCollection
 * @description controller for updating a collection
 * @parameters collection Id and name
 * @returns collection
 ******************************************************/

const updateCollection = asyncHandler(async(req,res) => {

    try {

         // existing collection in database to be updated
    const {id:collectionId} = req.params;
    // new value to be updated
    const {name} = req.body;

    if(!name){
        throw new CustomError("Collection name is required",400);
    }

    let updatedCollection = await Collection.findByIdAndUpdate(
        collectionId,
        {
            name,
        },
        {
            new:true,
            runValidators:true
        }
    )

    if(!updatedCollection) {
        throw new CustomError("Collection not found", 400);
    }

    //send success response

    res.status(200).json({
        success:true,
        message:"Collection Updated Successfully",
        updateCollection
    })
        
    } catch (err) {

        throw new CustomError(err.message || "Collection not updated", 500);    
    }
   

})

module.exports = updateCollection;