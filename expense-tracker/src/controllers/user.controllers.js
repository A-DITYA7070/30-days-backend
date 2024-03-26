import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/user.models.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async(req,res,next)=>{
    const {name,email,password,phoneNumber} = req.body;
    if(!name || !email || !password || !phoneNumber){
        return next(new ErrorHandler("Please enter all fields ",400));
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User already exists ",400));
    }
    user = await User.create({
        name,
        email,
        password,
        phoneNumber
    });
    sendToken(res,user,"Registered successfully",201);
})