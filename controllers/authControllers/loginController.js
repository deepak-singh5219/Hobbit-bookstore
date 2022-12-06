const User = require('.../models/userModel');
const asyncHandler = require('.../services/asyncHandler');
const CustomError = require('.../utils/customError');
const cookieOptions = require('.../utils/cookieOptions');

/******************************************************
 * @LOGIN
 * @route http://localhost:4000/api/auth/login
 * @description User signIn Controller for login new user
 * @parameters  email, password
 * @returns User Object
 ******************************************************/

const login = asyncHandler(async (req,res) => {
    // login Controller
    const { email,password } = req.body;
    // valildate if email and password are present
     
    if(!(email && password)) {
        throw new CustomError('Email and Password are required', 400);
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        throw new CustomError('Invalid Credentials', 400);
    }

    const isPasswordMatched = await user.comparePassword(password);
    
    if(isPasswordMatched){
        const token = user.genJwtToken();
        user.password = undefined;
        res.cookie("token",token, cookieOptions);
        return res.status(200).json({
            success:true,
            token,
            user
        })
    }

    throw new CustomError('Invalid crendentials',400);
})

module.exports = login;