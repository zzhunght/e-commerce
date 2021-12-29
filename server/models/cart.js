const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    products:[
       {    
           skus:{
               size:{
                   type:String,
                   require:true
               },
               price:{
                   type:Number,
                   require:true
               }
           },
           productId:{
               type:Schema.Types.ObjectId,
               ref:'product',
               require:true
           },
          
           quantity:{
               type:Number,
               default:1,
               require:true
           },
           
       }
    ]
})


module.exports = mongoose.model('carts',CartSchema)