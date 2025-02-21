import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'
export const jwtVerify=async(req,res,next)=>{
    try
    {
        const token= req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token)
        {
            return res.status(401).json({message:"Access denied. No token provided."})
        }
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        if(!decodedToken)
        {
            return res.status(400).json({message:"Unauthorized request"})
        }
        const user=await User.findById(decodedToken._id);
        req.user=user;
        next();
    }
    catch(err)
    {
        return res.status(500).json({message:message})
    }
}