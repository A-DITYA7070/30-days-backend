import { catchAsyncError } from "../middlewares/catchAsyncError";
import Category from "../models/category.models.js";
import ErrorHandler from "../utils/errorHandler.js";


export const createCategory = catchAsyncError(async(req,res,next) => {
    const {name,description} = req.body;
    if(!name || !description){
        return next(new ErrorHandler("Bad Request !! ",400))
    }
    const createdBy = req.user._id;
    const category = await Category.create({
        name,
        description,
        createdBy:createdBy
    });
    res.status(200)
    .json({
        success:true,
        category,
        message:"category created successfully !! "
    })
});


export const getCategories = catchAsyncError(async(req,res,next) => {
    const categories = await Category.find({});
    res.status(200).json({
        success:false,
        categories
    })
});


export const getCategory = catchAsyncError(async(req,res,next)=>{
    const categoryId = req.params.id;
    if(!categoryId){
        return next(new ErrorHandler("Bad request ",400));
    }
    const category = await Category.findById(categoryId);
    if(!category){
        return next(new ErrorHandler("Not found ",404));
    }
    res.status(200)
    .json({
        success:true,
        category
    })
});


export const updateCategory = catchAsyncError(async(req,res,next)=>{
    const {name,description} = req.body;
    if(!name && !description){
        return next(new ErrorHandler("Bad request ",400));
    }
    const categoryId = req.params.id;
    if(!categoryId){
        return next(new ErrorHandler("Bad request ",400));
    }
    let category = await Category.findById(categoryId);
    if(!category){
        return next(new ErrorHandler("Not found ",404));
    }
    if(name){
        category.name = name;
    }
    if(description){
        category.description=description;
    }
    await category.save();
    res.status(200)
    .json({
        success:true,
        message:"Updated successfully !! "
    });
});


const deleteCategory = catchAsyncError(async(req,res,next) => {
    const categoryId=req.params.id;
    if(!categoryId){
        return next(new ErrorHandler("Bad request ",400));
    }
    const category = await Category.findById(categoryId);
    if(!category){
        return next(new ErrorHandler("Not found",404));
    }
    await category.deleteOne();
    res.status(200)
    .json({
        success:true,
        message:"Deleted successfully !! "
    })
});