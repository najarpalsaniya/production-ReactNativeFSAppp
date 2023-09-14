const JWT = require('jsonwebtoken')
const { hashPassword, comparePasssword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
const userModal = require('../models/userModel')
var { expressjwt: jwt } = require("express-jwt");



// Middleware 
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

//  Register 
const registerController = async(req, res)=>{
try {
    const {name, email, password} = req.body 
    // Validation
    if (!name){
        return res.status(400).send({
            success:false,
            message:'Name is Requiered'
        })
    }
    if (!email){
        return res.status(400).send({
            success:false,
            message:'Email is Requiered'
        })
    }
    if (!password || password.length < 6 ){
        return res.status(400).send({
            success:false,
            message:'Password is Requiered and 6 Character Long'
        })
    }
    // Existing Use Check

    const existingUser = await userModal.findOne({email:email})
    if(existingUser)
    {
    return res.status(500).send({
        success:false,
        message:"Use Aleready Register With this Email" ,
    })
    }

    // Hashed password

    const hashedPassword = await hashPassword(password)
    
    // Save User Data in database
    const user = await userModal({name, email, password:hashedPassword}).save()

    return res.status(201).send({
    success: true,
    message: "Registration Successful... Please Login"

})
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error In Register API",
        error:error,
    })
}
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        // Validation
        if (!email || !password) { 
            return res.status(500).send({
                success: false,
                message:"Please Provide Email Or password"
            })
        }
        // FIND USER AVAILABLE OR NOT
        const user = await userModel.findOne({ email })
        if (!user) { 
            return res.status(500).send({
                success: false,
                message:"User Not Found",
            })
        }

        // MATCH PASSWORD

        const match = await comparePasssword(password, user.password)

        if (!match) { 
            return res.status(500).send({
                success: false,
                message:"Something Went Wrong In PWD",
            })
        }

        //  Token Json Web Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn:'7d'
        })
        
        // Undefined Password
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token, user
        })          
    } catch (error)
    {
        console.log(error) 
        return res.status(500).send({
            success: false,
            message: 'Error In Login API',
            error,
        })    
    }
};
 
// UPDATE USER FUNCTION

const updateUserController = async (req, res) => {
    try {
        const { name, password, email } = req.body
        // Use Find
        const user = await userModel.findOne({email})
        // Password Validation
        if (password && password.length < 6) {
            return res.status(400).send({
                success: false,
                message: "Password is Required 6 letter"
            })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        // Updated User
        const updatedUser = await userModel.findOneAndUpdate({ email }, {
            name: name || user.name, password: hashedPassword || user.password
        }, { new: true });
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Profile Updated Please Login",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error In Update User Api",
            error
        })
    }
}



module.exports = { registerController, loginController, updateUserController, requireSignIn };