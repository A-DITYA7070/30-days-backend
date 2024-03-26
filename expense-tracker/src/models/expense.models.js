import mongoose,{Schema} from "mongoose";

const expenseSchema = new Schema({
    title:{
        type:String,
        required:[true,"Title is required "]
    },
    description:{
        type:String,
        required:[true,"Description of expense is required "]
    },
    date:{
        type:Date,
        default:new Date(Date.now())
    },
    from:{
        type:Date,
        default:new Date(Date.now())
    },
    to:{
        type:Date,
        required:[true,"Time Frame to is required "]
    },
    amount:{
        type:String,
        required:[true,"Amount of expense is required "]
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    
});

export const Expense = mongoose.model("Expense",expenseSchema);

