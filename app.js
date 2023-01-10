import dotenv from "dotenv"
dotenv.config()
import express from 'express';
import connectDB from './DB/connection.js';
import * as indexRouter from './Modules/index.router.js'
const app = express();
const port = 3000
const baseUrl =process.env.BASEURL

app.use(express.json());
app.use(`${baseUrl}/auth`, indexRouter.authRouter);
app.use(`${baseUrl}/user`, indexRouter.userRouter);
app.use(`${baseUrl}/trans`, indexRouter.TransPortRouter);
app.use("*", (req,res) => res.send ("in_Valid"))
connectDB()
app.listen(port,()=> console.log(`listening on port${port}`));
