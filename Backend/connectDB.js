const mongoose = require("mongoose");


function connectToDB(){
    mongoose.connect("mongodb://127.0.0.1:27017/G1Task")
    .then(()=>{
        console.log("Connected to DB");
    });
}

module.exports = {connectToDB}