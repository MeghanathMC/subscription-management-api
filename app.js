import express from "express";
import { PORT } from "./config/dotenv.js";
import authRouter from "./routes/authRouter.js";
import subsRouter from "./routes/subsRouter.js";
import userRouter from "./routes/userRouter.js";
import connectDB from "./database/db.js";
import cookieParser from "cookie-parser";

const app = express();

// inbuilt middleware to handle to json data from the requests
app.use(express.json());

// for handling the form data that is sent through the HTML forms
app.use(express.urlencoded({extended: false}));

// reads the cookie from the incoming request to store the user data
app.use(cookieParser());


app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subsRouter);


app.get("/",(req,res)=>{
    res.send("Hello world!");
})


app.listen(PORT || 3001, async ()=>{
    console.log(`server running on PORT http://localhost:${PORT}`);
    await connectDB();
})



