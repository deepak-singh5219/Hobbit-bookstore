const User = require("../../models/userModel");
const asyncHandler = require("../../services/asyncHandler");
const CustomError = require("../../utils/customError");
const cookieOptions = require("../../utils/cookieOptions");

/******************************************************
 * @GET_PROFILE
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/auth/profile
 * @description check for token and populate req.user
 * @parameters
 * @returns User Object
 ******************************************************/

const getProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = getProfile;
