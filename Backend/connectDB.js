const mongoose = require("mongoose");


function connectToDB(){
    mongoose.connect("mongodb://127.0.0.1:27017/GOneTask")
    .then(()=>{
        console.log("Connected to DB");
    });
}

module.exports = {connectToDB}