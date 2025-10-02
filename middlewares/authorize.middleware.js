import { JWT_SECRET } from "../config/dotenv";
import jwt from 'jsonwebtoken';
import User from "../models/userModel";

const authorizeMiddleware = async (req, res, next) =>{

    try{

        let token; 

        if(req.headers.authorization && req.headers.authorization.startWith('Bearer')){
          token = req.headers.authorization.split(' ')[1]; // get the only token (i.e, second part)
        }

        if(!token){
           return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const userId = await User.findById(decoded.userId);

        if(!userId){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        
        // assign the requested user with the current userId
        req.user = userId;

        next();


    }

    catch(error){
        res.status(401).json({
            message:"Unauthorised",
            error: error.message
        })
    }
}