const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String,
        unique:true
    }
})

module.exports = mongoose.model('user',UserSchema)