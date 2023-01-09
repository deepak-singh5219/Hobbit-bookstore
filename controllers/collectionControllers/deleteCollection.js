import Collection from '../../models/collectionModel';
import asyncHandler from '../../services/asyncHandler';
import CustomError from '../../utils/customError';

/******************************************************
 * @delete_Collection
 * @route http://localhost:5000/api/deleteCollection
 * @description controller for deleting a collection
 * @parameters collection Id
 * @returns success response
 ******************************************************/

const deleteCollection = asyncHandler( async(req,res) => {
    const { id:collectionId } = req.params;

    const collectionToDelete = await Collection.findByIdAndDelete(collectionId);

    if(!collectionToDelete) {
        throw new CustomError("Collection not found", 400);
    }

    collectionToDelete.remove()
    // sending response

    res.status(200).json({
       success:true,
       message: "Collection deleted successfully",
    })

})

module.exports = deleteCollection;