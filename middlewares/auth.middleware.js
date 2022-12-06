const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");
const config = require("../config/index");

const isLoggedIn = asyncHandler(async (req, _res, next) => {
  let token;
  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new CustomError("Not Authorized to access", 401);
  }

  try {
    const decodeJwtPayload = JWT.verify(token, config.JWT_SECRET);
    // we received _id and role from the payload
    // find user based on _id, set this in req.user

    req.user = await User.findById(decodeJwtPayload._id, "name email role");
    next();
  } catch (err) {
    throw new CustomError("Not Authorized to access", 401);
  }
});

module.exports = isLoggedIn;
