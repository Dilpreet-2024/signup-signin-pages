import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js'
const generateAccessAndRefreshToken=async function(userID)
{
    const user=await User.findById(userID);
    const accessToken= user.generateAccessToken();
    const refreshToken= user.generateRefreshToken();
    user.refreshToken=refreshToken;
    await user.save();
    return {accessToken,refreshToken};
}
export const registerUser = async (req,res) => {
    // this controller is used for registering user with image
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
const imgLocalPath=req.files?.photo[0]?.path;
const photo=await uploadOnCloudinary(imgLocalPath);
if(!photo)
{
    return res.status(400).json({message:"Photo is a required field"})
}
const user=await User.create({name,email,password,photo});
const updated=await User.findById(user._id).select("-password");
res.status(200).json({message:"User registered successfully",updated});
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
        const {accessToken,refreshToken}=await generateAccessAndRefreshToken(existedUser._id);
        const options={
            httpOnly:true,
            secure:true
        }
        res.
        cookie("AccessToken",accessToken,options).
        cookie("RefreshToken",refreshToken,options).
        status(200).json({message:"logged in successfully!!",accessToken,refreshToken});
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}
export const changePassword=async(req,res)=>{
    try
    {
        const {email,oldpassword,newpassword}=req.body;
        if(!email||!oldpassword||!newpassword)
        {
            return res.status(400).json({message:"Required fields are empty"});
        }
        const euser=await User.findOne({email});
        if(!euser)
        {
            return res.status(403).json({message:"User does not exist"});
        }
        if(oldpassword===newpassword)
        {
            return res.status(400).json({message:"Old & new password are same"});
        }
        const cpassword=await euser.isPasswordCorrect(oldpassword);
        if(!cpassword)
        {
            return res.status(403).json({message:"Incorrect password"});
        }
        euser.password=newpassword;
        await euser.save();
        res.status(200).json({message:"Password changed sucessfully"})

    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
}
//this function is used to watch all existing users inside database
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
export const logoutUser=async(req,res)=>{
    try
    {
        await User.findByIdAndUpdate(
           req.user._id,
           {
            $set:{
                refreshToken:undefined
            }
           },
           {
            new:true
           }
        )
        const options={
            httpOnly:true,
            secure:true
        }
        res.
        status(200).
        clearCookie("AccessToken",options).
        clearCookie("RefreshToken",options).
        json({message:"Logged out successfully"});
    }
    catch(err)
    {
return res.status(500).json({message:err.message});
    }
}