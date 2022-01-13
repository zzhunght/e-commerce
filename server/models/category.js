const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name:{
        type:String,
        require:true
    },
    label:{
        en:{
            type:String,
            require:true
        },
        vi:{
            type:String,
            require:true
        }
    }
   
})

module.exports = mongoose.model('category',categorySchema)