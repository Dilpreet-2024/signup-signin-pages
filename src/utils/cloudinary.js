import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const uploadOnCloudinary=async(localfilepath)=>{
    try
    {
        if(!localfilepath)
        {
            return null;
        }
const res=await cloudinary.uploader.upload(localfilepath,
    {
        resource_type:"auto"
    }
);
fs.unlinkSync(localfilepath);
console.log(res.url);
return res.url;
    }
    catch(error)
    {
fs.unlinkSync(localfilepath);
return null;
    }
}