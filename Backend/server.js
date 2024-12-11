const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config()


const app = express();

// All controller related imports are here.....
const {registerUser,loginUserByEmail, loginUserByUserName,} = require("./controller/user");

// Middlerware for urlenooded
app.use(bodyParser.json());
app.use(express.json());


app.post("/api/auth/register",async(req,res)=>{
    try {
        const {fullName, birthDate, userName, email, password } = req.body;
        console.log("Register data = ",data);
        res.json({status:"good"});
    } catch (error) {
        
    }
})

app.post("/api/auth/loginby-email",async(req,res)=>{
    try {
        const {email, password} = req.body;
        console.log("login data = ",data);
        res.json({status:"good"});
    } catch (error) {
        
    }
})

app.post("/api/auth/loginby-username",async(req,res)=>{
    try {
        const {userName, password} = req.body;
        console.log("login data = ",data);
        res.json({status:"good"});
    } catch (error) {
        
    }
})


const PORT = 3500;
app.listen(PORT,() => 
    {console.log("Server started at ",PORT)
});

