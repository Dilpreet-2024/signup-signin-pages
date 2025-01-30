import { trusted } from "mongoose";
import { User } from "../models/user.models.js";
export const registerUser = async (req,res) => {
    try
    {
const {name,email,password}=req.body;
if(!name||!email||!password)
{
    return res.status(400).json({message:"Required fields are empty"})
}
const existingUser=await User.findOne({$or:[{name},{email}]});
if(existingUser)
{
    return res.status(400).json({message:"Username or email already exists"});
}
const user=await User.create({name,email,password});
res.status(200).json({message:"User registered successfully"});
    }
    catch(err)
    {
     res.status(500).json({message:err.message})
    }
}
export const loginUser = async (req,res) => {
    try
    {
        const {email,password}=req.body;
        if(!email||!password)
        {
            return res.status(400).json({success:false,message:"Required fields are empty"});
        }
        const existedUser=await User.findOne({email});
        if(!existedUser)
        {
return res.status(402).json({success:false,message:"User doesn't exist"})
        }
        const correctUser=await existedUser.isPasswordCorrect(password);
        if(!correctUser)
        {
            return res.status(402).json({success:false,message:"Incorrect password"})
        }
        res.status(200).json({message:"logged in successfully!!"})
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}
export const forgetUser=async(req,res)=>{
    try
    {
        const {email,password}=req.body;
        if(!email||!password)
        {
            return res.status(400).json({message:"Required fields are empty"});
        }
        const euser=await User.findOne({email});
        if(!euser)
        {
            return res.status(403).json({message:"User does not exist"});
        }
        euser.password=password;
        await euser.save();
        res.status(200).json({message:"Password changed sucessfully",euser})

    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
}
export const getUsers=async(req,res)=>{
    try
    {
        const users=await User.find().select("-password");
        res.status(200).json(users);
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}