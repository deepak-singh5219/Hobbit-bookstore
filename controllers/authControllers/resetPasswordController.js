const User = require(".../models/userModel");
const asyncHandler = require(".../services/asyncHandler");
const CustomError = require(".../utils/customError");
const cookieOptions = require(".../utils/cookieOptions");
const crypto = require('crypto');



/******************************************************
 * @RESET_PASSWORD
 * @route http://localhost:4000/api/auth/password/reset/:resetToken
 * @description User will be able to reset password based on url token
 * @parameters  token from url, password and confirmpass
 * @returns User object
 ******************************************************/

const resetPassword = asyncHandler(async (req, res) => {
  const { token: resetToken } = req.params;
  const { newPassword, confirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if(!user) {
    throw new CustomError("Password token doesn't matched", 400);
  }

  if(newPassword != confirmPassword) {
    throw new CustomError("New password and confirm password should match",400);
  }

  user.password = newPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  // send the token as response
  const token = await user.getJwtToken();
  user.password = undefined;

  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    user
  })

});

module.exports = resetPassword;
