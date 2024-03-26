import mongoose,{Schema} from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required "]
    },
    description:{
        type:String,
        required:[true,"Description is required "]
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"Creaeted by required "]
    }
});

export const Category = mongoose.model("Category",categorySchema);