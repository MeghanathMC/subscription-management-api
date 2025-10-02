import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/dotenv.js";
import User from "../models/userModel.js";

export const signUp = async (req, res, next) => {
  // to create a new User
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    // check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    // if exists, throw an error
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // generate the hash password for the given password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // if not, create a new user

    const newUser = await User.create(
      [{ name: name, email: email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign(
      {
        user: newUser[0]._id,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    await session.commitTransaction();
    session.endSession();

    // send the data as a response after creating the user
    res.status(201).json({
        message:"User created successfully",
        success:true,
       data:{
        token, 
        user: newUser[0]
       }
    });

  }
   catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {

    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        
        //  this will compare the user entered password (by hashing it), with the existing db password
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            const error = new Error("Password is not valid");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId : user._id}, JWT_SECRET, {expiresIn : JWT_EXPIRES_IN} );


        res.status(200).json({
            message:"User Signed in Successfully",
            success:true,
            data:{
                token,
                user
            }
        });
    }
    catch(error){
        next(error);
    }
};

export const signOut = async (req, res, next) => {};
