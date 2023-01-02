import s3 from '../config/s3.config.js';
import asyncHandler from './asyncHandler.js';

const s3FileUpload = asyncHandler(async({bucketName, key, body, contentType}) => {
    return await s3.upload({
        Bucket: bucketName,
        Key:key,
        Body:body,
        ContentType: contentType
    })
    .promise()
})


module.exports = {s3FileUpload,s3DeleteFile};