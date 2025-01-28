import express from 'express'
import cors from 'cors'
const app=express();
app.use(express.json())
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Home Page')
})
import userRegister from './routes/user.routes.js'
app.use('/api/v1/users',userRegister);
export default app;