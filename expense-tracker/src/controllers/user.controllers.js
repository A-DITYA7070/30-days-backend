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
});


export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email && !password){
        return next(new ErrorHandler("Please enter all the fields ",400));
    }
    let user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Not found ",404));
    }
    const isMatch = user.isPasswordCorrect(password);
    if(!isMatch){
        return next(new ErrorHandler("Invalid credentials ",401));
    }
    sendToken(res,user,"Logged in successfully ",200);
});


export const logout = catchAsyncError(async(req,res,next)=>{
    const options = {
        secure:true,
        sameSite:"none",
        httpOnly:true,
        expires:new Date(Date.now())
    };
    res.status(200)
    .cookie("token",null,options)
    .json({
        success:false,
        message:"User logged out successfully !! "
    })
});


export const changePassword = catchAsyncError(async(req,res,next)=>{
    const {oldPassword,newPassword} = req.body;
    if(!oldPassword || !newPassword){
        return next(new ErrorHandler("Bad request ",400));
    }
    const user = await User.findById(req.user?._id).select("+password");
    const isMatch = user.isPasswordCorrect(oldPassword);
    if(!isMatch){
        return next(new ErrorHandler("Invalid credentials ",401));
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success:true,
        message:"Password updated successfully !! "
    })
})