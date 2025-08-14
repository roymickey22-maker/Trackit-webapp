import {DB_Name}  from "../constants.js";
import mongoose from "mongoose";

 

 const ConnectDB = async ()=>{
       try{
        const response = await  mongoose.connect (`${process.env.MONGODB_URI}/${DB_Name}`);
        if(response){
            console.log("MongoDB connected Successfully !!")
        }
       }

       catch(error){
        console.log('Error in connecting MongoDB')
       }
 }

export {ConnectDB}