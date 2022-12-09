const User = require("../../models/userModel");
const asyncHandler = require("../../services/asyncHandler");
const CustomError = require("../../utils/customError");
const cookieOptions = require("../../utils/cookieOptions");
/******************************************************
 * @LOGOUT
 * @route http://localhost:4000/api/auth/logout
 * @description User logout bby clearing user cookies
 * @parameters  
 * @returns success message
 ******************************************************/

const logout = asyncHandler(async (req,res) => {
    
    res.cookie("token",null, {
       expires: new Date(Date.now()),
       httpOnly: true     
    })

    res.status(200).json({
        success: true,
        message:"Logged Out"
    })
})

module.exports = logout;