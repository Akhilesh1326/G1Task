const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require: true,
    },
    birthDate:{
        type:String,
        require: true,
    },
    userName:{
        type: String,
        require: true,
        unique: true,
    },
    email:{
        type:String,
        require: true,
        unique: true,
    },
    password:{
        type:String,
        require: true,
    },
}, {timestamps: true})

const userSchema = mongoose.model("userSchema", UserSchema);

module.exports = {userSchema};