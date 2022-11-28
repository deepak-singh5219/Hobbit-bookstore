const mongoose = require('mongoose');
const AuthRoles = require('../utils/authRoles');

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

module.exports = mongoose.model("user",userSchema);