import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateToken = (user) => {
    return jwt.sign(
        {email: user.email, id: user._id},
        'secretKey',
        {expiresIn: '1h'} // 1 hour
    )
}

// creating the user
export const signup = async(req, res) => {
    const {email, password, confirmPassword, name} = req.body
    console.log(email, password, confirmPassword, name)

    try {
        // some checks performed
        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.status(400).json({mssg: "User already exists"})
        }

        if(password!==confirmPassword) {
            return res.status(400).json({mssg: "Passwords do not match"})
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const user = await User.create({name: name, email, password: hashedPassword})

        const token = generateToken(user)
        
        res.status(200).json({user, token})
    }
    catch {
        res.status(500).json({mssg: "Something went wrong"})
    }
}

export const signin = async(req, res) => {
    const {email, password} = req.body
    try {
        const existingUser = await User.findOne({email}); 

        if(!existingUser) return res.status(404).json({mssg: "User does not exist"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(404).json({mssg: "Invalid password"})

        const token = generateToken(existingUser)

        res.status(200).json({result: existingUser, token})
    }
    catch(error){
        return res.status(500).json({mssg: "Something went wrong"})
    }
}

export const getUserProfile = async(req, res) => {
    try {
        const user = await User.findById(req.userId)

        if(!user) {
            return res.status(400).json({mssg: "User not found"})
        }

        return res.status(200).json({user})
    }
    catch(error){
        res.status(500).json({mssg: "Something went wrong"})
    }
}