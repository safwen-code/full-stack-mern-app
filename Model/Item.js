const mongoose =require("mongoose")
const Schema =mongoose.Schema
//create schema

const DocumentSchema = new Schema({
    avatar:{
        type:String,
        required:true
    },
    titel:{
        type:String,
        required:true
    },
    
    description:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    date :{
        type:Date,
        default:Date.now()
    }
})
module.exports= documents =mongoose.model("document",DocumentSchema)