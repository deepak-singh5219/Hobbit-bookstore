const mongoose = require('mongoose');
const AuthRoles = require('../utils/authRoles');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
    {
    name:{
        type: String,
        required: [true,"Name is required"],
        maxLength: [50, "Name max limit exceeded"],
        trim: true
    },
    email:{
        type: String,
        required: [true,"email is required"],
        unique:true,
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        minLength: [8, "Password must be minimum of 8 charactors"],
        select: false
    },
    role:{
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,

    },
    {
        timestamps: true
    }
);

// encrypting the password before saving in the database
userSchema.pre("save", async function(next){

    // if the password is not modified, just move to next(),but if it is modified then encrypt, update it and move to next.

    if(!this.modified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

module.exports = mongoose.model("user",userSchema);