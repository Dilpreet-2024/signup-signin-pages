import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
})
import app from './app.js';
import {db_Connect} from './db/index.js'
db_Connect().
then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log('mongodB connection error',err);
})