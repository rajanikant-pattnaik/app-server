import mongoose from "mongoose";

const connectSchema=new mongoose.Schema({
    userId1:{
        type:String,
        require:true
    },
    userId2:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const connection=mongoose.model('connections',connectSchema);