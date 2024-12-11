const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config()


const app = express();

// All controller related imports are here.....
const { registerUser, loginUserByEmail, loginUserByUserName, } = require("./controller/user");

// Middlerware for urlenooded
app.use(bodyParser.json());
app.use(express.json());

const accessCheck = (allowedRoles) => {
    return (req, res, next) => {

        try {
            const token = req.cookie.userCookie;
            if (!token) {
                return res.json({ status: "Unauthorized Access" });
            }

            const token_decode = token.varify(token, process.env.JWT_SECRET);
            req.user = token_decode;
            if (!allowedRoles.includes(token_decode.role)) {
                return res.json({ status: "Access Denied" });
            }

            next();

        } catch (error) {
            console.log("Error in role varification middleware");   
        }
    }
}


app.post("/api/auth/register", async (req, res) => {
    try {
        const { fullName, birthDate, userName, email, password, role } = req.body;
        console.log("Register data = ", fullName, birthDate, userName, email, password, role);

        const result = await registerUser(fullName, birthDate, userName, email, password);
        const Id = result._id;
        const UId = Id.toString();


        if (result.userName === userName) {
            const token = jwt.sign({
                UserId: UId,
                role: role
            }, process.env.JWT_SECRET);
        }

        res.cookie("userCookie", token, { httpOnly: true, secure: true })
        res.json({ status: "good" });
    } catch (error) {

    }
})

app.post("/api/auth/loginby-email", async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log("login data of email log = ", email, password)

        const result = await loginUserByEmail(email, password);
        const UId = result._id.toString();

        if (result.email == email && result.password === password) {
            const token = jwt.sign({
                UserId: UId,
                role: role
            }, process.env.JWT_SECRET);
            res.cookie("userCookie", token, { httpOnly: true, secure: true });
            res.json({ status: "good" });
        }
        else {
            res.json({ status: "bad" });
        }
        console.log("login data = ", data);
    } catch (error) {

    }
})

app.post("/api/auth/loginby-username", async (req, res) => {
    try {
        const { userName, password, role } = req.body;
        console.log("user login data by username = ", userName, password);
        const result = await loginUserByUserName(userName, password);
        const UId = result._id.toString();
        if (result.userName === userName) {
            const token = jwt.sign({
                UserId: UId,
                role: role
            }, process.env.JWT_SECRET);

            res.cookie("userCookie", token, { httpOnly: true, secure: true });
            res.json({ msg: "good" });
        } else {
            res.json({ msg: "bad" });
        }
    } catch (error) {

    }
})


app.get("/api/admin-page", accessCheck(["admin"]), async(req,res)=>{
    try {
        res.json({status:"good"});
    } catch (error) {
        
    }
})

app.get("/api/staff-page",accessCheck(["staff","admin"]),async(req,res)=>{
    try {
        res.json({status:"good"});
    } catch (error) {
        
    }
})

app.get("/api/user-page", accessCheck(["staff","admin","user"]), async(req,res)=>{
    try {
        res.json({status:"good"});
    } catch (error) {
        
    }  
})

const PORT = 3500;
app.listen(PORT, () => {
    console.log("Server started at ", PORT)
});

