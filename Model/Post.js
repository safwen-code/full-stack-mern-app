const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    likes:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    }],
    comments:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        text:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        }
    }],
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Post = mongoose.model('post',PostSchema)