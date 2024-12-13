const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
require("dotenv").config()
const cors = require('cors');
const connectDB = require("./connectDB")




connectDB.connectToDB();

const app = express();

// All controller related imports are here.....
const { registerUser, loginUserByEmail, loginUserByUserName, getProfileData} = require("./controller/user");

// Middlerware for urlenooded
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    // methods: ['GET', 'POST'],
    credentials: true
}));

const accessCheck = (allowedRoles) => {
    return (req, res, next) => {
        // console.log("hello meddiler")

        try {
            // console.log("cookeeiii = ",req.cookies)
            const token = req.cookies.userCookie;
            if (!token) {
                return res.json({ status: "Unauthorized Access, Token not Found" });
            }

            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = token_decode;
            if (!allowedRoles.includes(token_decode.role)) {
                return res.json({ status: `Access Denied, Your role as being a ${token_decode.role} don't have access`});
            }

            next();

        } catch (error) {
            console.log("Error in role varification middleware", error);
        }
    }
}


app.post("/api/auth/register", async (req, res) => {
    try {
        const { fullName, birthDate, userName, email, password, role } = req.body;
        console.log("Register data = ", fullName, birthDate, userName, email, password, role);

        const result = await registerUser(fullName, birthDate, userName, email, password, role);
        if (result == "repeat") {
            return res.json({ status: "repeat" })
        }

        const Id = result._id;
        const UId = Id.toString();

        console.log("data = ", result)

        if (result.userName == userName) {
            const token = jwt.sign(
                { UserId: UId, role: role },
                process.env.JWT_SECRET
            );
        
            res.cookie("userCookie", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure only in production
                sameSite: 'Lax', // Helps mitigate CSRF attacks
                path: '/',
            });
        
            console.log("JWT created and cookie set.");
            return res.json({ status: "good" });
        }
        

        return res.json({ status: "bad" });

    } catch (error) {
        console.error("Error during registration:", error);
        res.json({ status: "error", message: "Internal server error." });
    }
})

app.post("/api/auth/loginby-email", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("login data of email log = ", email, password)

        const result = await loginUserByEmail(email, password);
        console.log("Result of username check in db = ", result);

        if (result.status == "Not Found") {
            return res.json({ status: "Not Found" });
        }
        else if (result.status == "Password Invalid") {
            return res.json({ status: "Password Mismatch" });
        }
        const Id = result._id;
        const UId = Id.toString();
        const role = result.role;
        if (result.email == email) {
            const token = jwt.sign(
                { UserId: UId, role: role },
                process.env.JWT_SECRET
            );

            res.cookie("userCookie", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure only in production
                sameSite: 'Lax', // Helps mitigate CSRF attacks
                path: '/',
            });

            console.log("JWT created and cookie set.");
            return res.json({ status: "good" });
        }

        return res.json({ status: "bad" });

    } catch (error) {
        console.log("Error occured whilte getting email login ", error)

    }
})

app.post("/api/auth/loginby-username", async (req, res) => {
    try {
        const { userName, password } = req.body;
        console.log("user login data by username = ", userName, password);
        const result = await loginUserByUserName(userName, password);
        console.log("Result of username check in db = ", result);
        if (result.status == "Not Found") {

            return res.json({ status: "Not Found" });
        }
        else if (result.status == "Password Invalid") {
            console.log("result stat s -= ", result.status)
            return res.json({ status: "Password Mismatch" });
        }

        const Id = result._id;
        const UId = Id.toString();
        const role = result.role;
        console.log("userName", userName, result.userName);
        console.log("uid", UId);
        console.log("roel = ",role);
        if (result.userName == userName) {
            const token = jwt.sign(
                { UserId: UId, role: role },
                process.env.JWT_SECRET
            );
        
            res.cookie("userCookie", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure only in production
                sameSite: 'Lax', // Helps mitigate CSRF attacks
                path: '/',
            });
        
            console.log("JWT created and cookie set.");
            return res.json({ status: "good" });
        }
        
        return res.json({ status: "bad" });
    } catch (error) {
        console.log("Error occured whilte getting username login ", error)
    }
})


app.get("/api/admin-page", accessCheck(["admin"]), async (req, res) => {
    try {
        console.log("admin here");
        res.json({ status: "good" });
    } catch (error) {
        console.log("Error in access check api call of admin", error)
    }
})

app.get("/api/staff-page", accessCheck(["staff", "admin"]), async (req, res) => {
    try {
        res.json({ status: "good" });
    } catch (error) {
        console.log("Error in access check api call of staff", error)
    }
})

app.get("/api/user-page", accessCheck(["staff", "admin", "user"]), async (req, res) => {
    try {
        res.json({ status: "good" });
    } catch (error) {
        console.log("Error in access check api call of user", error)
    }
})

app.get("/api/profile-data", async(req,res)=>{
    try {
        const token = req.cookies.userCookie;
        if(!token){
            return res.json({status: "Unauthorized Access, Token not Found"})
        }

        const decode_token = jwt.verify(token, process.env.JWT_SECRET);
        const Uid = decode_token.UId;
        const result = await getProfileData(Uid);
        console.log("result = ",result);

        responseObj = {
            fullName: result.fullName,
            birthDate: result.birthDate,
            userName: result.userName,
            email: result.email,
            role: result.role,
        }

        return res.json({data: responseObj});
        
    } catch (error) {
        console.log("Error in getting log data", error)
    }
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server started at ", PORT)
});

