const User = require(".../models/userModel");
const asyncHandler = require(".../services/asyncHandler");
const CustomError = require(".../utils/customError");
const cookieOptions = require(".../utils/cookieOptions");

/******************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

const signUp = asyncHandler(async (req, res) => {
  // signup Controller
  const { name, email, password } = req.body;
  // validate if all entries are present
  if (!(name && email && password)) {
    throw new CustomError("All fields are required", 400);
  }
  // check if user exists
  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new CustomError("User already exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.genJwtToken();
  user.password = undefined;

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

module.exports = signUp;
