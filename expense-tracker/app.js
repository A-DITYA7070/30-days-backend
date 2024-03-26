import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./database/database.js";
import errorMiddleware from "./src/middlewares/error.js";
import cookieParser from "cookie-parser";

dotenv.config({path:"config/config.env"});

// connecting to database..
connectToDb();
const app=express();


app.use(express.json());
app.use(cookieParser());


import user from "./src/routes/user.routes.js";

app.use("/api/v1/user",user);





export default app;

app.use(errorMiddleware);