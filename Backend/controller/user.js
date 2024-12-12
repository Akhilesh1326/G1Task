const {userSchema} = require("../Models/user");
const bcrypt = require("bcrypt")

async function registerUser(fullName, birthDate, userName, email, password, role) {
    try {
        const existingUser = await userSchema.findOne({$or: [{ email }, { userName }]});
        if(existingUser){
            return "repeat"
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const result =  await userSchema.create({fullName, birthDate, userName, email, password:hashedPassword, role});   
        return result;
        
    } catch (error) {
        console.log("Erorr occured in user controller in registerUser",error);
        
    }
}

async function loginUserByEmail(email, password) {
    try {
        const user =  await userSchema.findOne({email, })
        if(!user){
            return {status: "Not Found"};
        }
        const chkPass = await bcrypt.compare(password, user.password);
        if(!chkPass){
            return {status: "Password Invalid"};
        }
        return user

    } catch (error) {
        console.log("Error in user controller while finding login Info by email",error);
    }
}

async function loginUserByUserName(userName, password) {
    try {
        const user =  await userSchema.findOne({userName})
        if(!user){
            return {status: "Not Found"};
        }
        const chkPass =  await bcrypt.compare(password, user.password);
        if(!chkPass){
            return {status: "Password Invalid"};
        }
        return user;

    } catch (error) {
        console.log("Error in user controller while finding login Info by userName",error);
    }
}

module.exports = {registerUser, loginUserByEmail, loginUserByUserName }
