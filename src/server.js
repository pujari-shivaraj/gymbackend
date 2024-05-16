import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";

import registrationRoutes from"./routes/registrationRoutes.js"
import plansRoutes from "./routes/plansRoutes.js"




dotenv.config();

connectDB()
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());

//routes

app.use('/registration', registrationRoutes);
app.use('/plans',plansRoutes)








    
app.listen(PORT, () =>  console.log(`server started at localhost:${PORT}`));
