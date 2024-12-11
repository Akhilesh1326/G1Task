const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: true,
    },
    birthDate:{
        type:String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        required: true,
    }
}, {timestamps: true})

const userSchema = mongoose.model("userSchema", UserSchema);

module.exports = {userSchema};