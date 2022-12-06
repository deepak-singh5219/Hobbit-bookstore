const User = require(".../models/userModel");
const asyncHandler = require(".../services/asyncHandler");
const CustomError = require(".../utils/customError");
const cookieOptions = require(".../utils/cookieOptions");
const mailHelper = require(".../utils/mailHelper");

/******************************************************
 * @FORGOT_PASSWORD
 * @route http://localhost:4000/api/auth/password/forgot
 * @description User will submit email and we will generate a token
 * @parameters  email
 * @returns success message - email send
 ******************************************************/

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new CustomError("Email not found", 404);

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("USer not found", 404);
  }

  const resetToken = user.generateForgotPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/password/reset/${resetToken}`;
  const text = `Url to reset your password:\n\n ${resetUrl}\n\n`;

  try {
    await mailHelper({
      email: user.email,
      subject: "Reset Password!",
      text: text,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (err) {
    // if mail is not sent - rollback
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save({ validateBeforeSave: false });
    throw new CustomError(err.message || "Email not sent", 500);
  }
});

module.exports = forgotPassword;
