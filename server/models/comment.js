const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    rating:{
        type:Number,
        require:true,
        default:5
    },
    comment:{
        type:String,
        require:true
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'product'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('comment',CommentSchema)