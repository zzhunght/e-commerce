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
    quantity:{
        type:Number,
        default:100,
        require:true
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
    }

})

module.exports = mongoose.model('product',productSchema)