import mongoose from "mongoose";

export const connectToDb = () => mongoose.connect(process.env.DB_URI,{})
.then((conn)=>{
    console.log(`database connected to ${conn.connection.host}`);
}).catch((err)=>{
    console.log(`Error connecting to database ${err} `);
});
