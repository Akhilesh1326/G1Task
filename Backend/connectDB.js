const mongoose = require("mongoose");


function connectToDB(){
    mongoose.connect("mongodb+srv://akhileshpimple3:HYkM1yuRxy3rf0YK@parikshamitra.cxbkb.mongodb.net/?retryWrites=true&w=majority&appName=ParikshaMitra")
    .then(()=>{
        console.log("Connected to DB");
    });
}

module.exports = {connectToDB}