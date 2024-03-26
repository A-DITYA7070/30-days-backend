import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please enter your name "],
        minLength:[2,"Name must be atleast 2 characters long "]
    },
    email:{
        type:String,
        required:[true,"Email is required "],
        unique:[true,"User already exists "]
    },
    password:{
        type:String,
        required:[true,"Password is required "],
        select:false
    },
    phoneNumber:{
        type:String,
        required:[true,"Phone number is required "],
        unique:[true,"Phone number exists. "]
    },
    role:{
        type:String,
        default:"User"
    }
},{
    timestamps:true
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
       return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(this.password,password);
}

userSchema.methods.getjwtToken = function(){
    return jwt.sign(
        {_id:this._id},
        process.env.JWT_SECRET,
        {expiresIn:"15d"},
    )
}

export const User = mongoose.model("User",userSchema);