const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    category:{
        type:String,
    },
    status:{
        type:String,
        enum:['available','unavailable'],
        require:true,
        default:'available'
    },
    imageUrl:{
        type:String,
        require:true
        
    },
    color:{
        type:Array,
        require:true

    },
    description:{
        type:String,
        require:true

    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    skus:[
        {
            size:{
                type:String,
                require:true
            },
            price:{
                type:Number,
                require:true
            }
        }
    ],
    brand:{
        type:String,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }

})

module.exports = mongoose.model('product',productSchema)