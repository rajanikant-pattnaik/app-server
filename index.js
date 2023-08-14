import express from 'express'
import cors from "cors"
import dotenv from 'dotenv'
import connectDb from './config.js';
import userRouter from './router/user.js';
import cookieParser from "cookie-parser";

dotenv.config();
connectDb();
const app=express();
app.use(express.json())
app.use(cors());
app.use(cookieParser());

app.use('/api/v1/users',userRouter);

app.listen(4000,()=>{
    console.log(`the app is running at port no 4000`)
})
