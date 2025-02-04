import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        requird:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    }
},{timestamps:true})
userSchema.pre('save',async function(next)
{
    if(!this.isModified('password'))
    {
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
})
userSchema.methods.isPasswordCorrect=async function(password)
{
    return await bcrypt.compare(password,this.password);
}
export const User=mongoose.model("User",userSchema);