import Collection from '../../models/collectionModel';
import asyncHandler from '../../services/asyncHandler';
import CustomError from '../../utils/customError';

const getAllCollections = asyncHandler(async(req,res) => {
    try {
        const collections = await Collection.find();
        
        if(!collections) {
            throw new CustomError("No Collection found", 400);
        }

        res.status(200).json({
            success:true,
            collections
        })
        
    } catch (err) {
       throw new CustomError(err.message || "Error getting all collections", 500);
    }

})

module.exports = getAllCollections;