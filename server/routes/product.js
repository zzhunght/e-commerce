const express = require('express')
const route = express.Router()


//api/products
//post Method
//pivates the route

route.post('/', async (req,res)=>{
    console.log(req.body)
    const { name, category , color,description,skus,quantity,imageUrl,brand } = req.body
    try {
        if(
            !name || !skus || !color ||
            !quantity || !imageUrl ||
            !description || !category || !brand
        ){
            return res.status(400).json({
                success: false,
                message:'Post product failed'
            })
        }
        
        res.json({success: true, message:'1111'})
    } catch (error) {
        
    }
})

module.exports = route