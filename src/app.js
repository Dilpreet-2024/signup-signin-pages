import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app=express();
app.use(express.json())
app.use(cors());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('Home Page')
})
import userRegister from './routes/user.routes.js'
app.use('/api/v1/users',userRegister);
export default app;