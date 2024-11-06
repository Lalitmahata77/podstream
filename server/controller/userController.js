import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import becrypt from "bcryptjs"
import createToken from "../utils/createToken.js"
export const createUser = asyncHandler(async(req,res,next)=>{
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        throw new Error("Please fill all fields")
    }

    const existedUser = await User.findOne({email})
    if (existedUser) {
        res.status(401)
        throw new Error("User already exists")
    }
    const salt = await becrypt.genSalt(10)
    const hashedPassword = await becrypt.hash(password,salt)

    const newUser = new User({username, email,password : hashedPassword})

    try {
        await newUser.save()
        createToken(res,newUser._id)
        res.status(201).json({
            id : newUser._id,
            username : newUser.username,
            email : newUser.email,
            password : newUser.password
        })
    } catch (error) {
        console.log(error);
        res.status(401)
        throw new Error("Invalid user data.")
        
    }
})

export const login = asyncHandler(async(req,res,next)=>{
    const { email, password} = req.body;
    const existedUser = await User.findOne({email})
    if (existedUser) {
        const isPasswordValid = await becrypt.compare(password, existedUser.password)
        if (isPasswordValid) {
            createToken(res,existedUser._id)
            res.status(201).json({
                id : existedUser._id,
                username : existedUser.username,
                email : existedUser.email,
                isAdmin : existedUser.isAdmin
            })
        }else{
            res.status(401).json({ message: "Invalid Password" });
        }
    }else{
        res.status(400).json({message : "User not found"})
    }
})

export const logout = asyncHandler(async(req,res,next)=>{
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(201).json({message : " Logout successfully"})
})

export const getAlluser = asyncHandler(async(req,res,next)=>{
    const users = await User.find({})
    res.status(200).json(users)
})

export const userProfile = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        res.status(201).json({
            _id : user._id,
            username : user.username,
            email : user.email,
            password : user.password
        })
    }else{
        res.status(401)
        throw new Error("User not found.")
    }
})

export const updateUser = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email


        if (req.body.password) {
            const salt = await becrypt.genSalt(10)
            const hashedPassword = await becrypt.hash(req.body.password , salt)
            user.password = hashedPassword
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
          });
        } else {
          res.status(404);
          throw new Error("User not found");
        }
})