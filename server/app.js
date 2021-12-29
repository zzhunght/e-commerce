const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

//api route 
const UserRoute = require('./routes/user')
const ProductRoute = require('./routes/product')
const CartRoute = require('./routes/cart')


//

app.use(cors())
app.use(express.json())
const connecDb = async ()=>{
    try {
        mongoose.connect('mongodb://localhost:27017/e-commerce',()=>console.log('connect Db successfully'))
        
    } catch (error) {
        console.log('connect Db fail',error)
    }
}

connecDb()


app.use('/api/auth',UserRoute)
app.use('/api/products',ProductRoute)
app.use('/api/cart',CartRoute)
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`App listening on port ${PORT}`))