const express = require('express')
const route = express.Router()
const Product = require('../models/product')
const verifyToken = require('../middleware/auth')


//api/products
//post Method
//pivates the route

route.post('/',verifyToken, async (req,res)=>{
    const userId = req.userId
    console.log(req.body)
    const { name, category , color,description,skus,imageUrl,brand } = req.body
    try {
        if(
            !name || !skus || !color ||
            !imageUrl ||
            !description || !category || !brand
        ){
            return res.status(400).json({
                success: false,
                message:'Post product failed'
            })
        }

        const newProduct = new Product({
            name,
            description,
            skus,
            color,
            category,
            brand,
            imageUrl,
            user:userId
        })
        
        await newProduct.save()

        res.json({success: true, product:newProduct})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'something went wrongs'
        })
    }
})


//get all item
// public methods
route.get('/', async (req,res)=>{
    try {
        const products = await Product.find()

        if(!products) return res.json({
            success: false,
            message:'No item Found'
        })

        res.json({
            success:true,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'something went wrongs'
        })
    }
})

//get one product
route.get('/:id/p', async (req,res)=>{
    const id = req.params.id
    try {
        const product = await Product.findById(id)

        if(!product) return res.json({
            success: false,
            message:'No item Found'
        })

        res.json({
            success:true,
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'something went wrongs'
        })
    }
})


//get pivates item
// pivate method
route.get('/myproducts',verifyToken,async (req,res)=>{
    const userId = req.userId
    console.log('userId',userId)
    
    try {
        const products = await Product.find({user:userId})
        console.log(products)
        if(!products) return res.json({
            success: false,
            message:'No item Found'
        })

        res.json({
            success:true,
            products
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'something went wrongs'
        })
    }
})


//update item
// pivate route
route.put('/:id',verifyToken,async (req,res)=>{
    const userId = req.userId
    const itemId = req.params.id

    try {
        console.log(req.body)

        const conditions = {
            _id:itemId,
            user:userId
        }
        const UpdateItem = {
            ...req.body,
            updatedAt: Date.now()
        }

        const newItem = await Product.findOneAndUpdate(conditions, UpdateItem,{
            new:true
        } )

        res.status(200).json({
            success:true,
            productsItem: newItem
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'something went wrongs'
        })
    }
})


// delete item
// pivate route
route.delete('/:id',verifyToken,async (req,res)=>{

    const userId = req.userId
    const itemId = req.params.id

    try {
        const conditions = {
            _id: itemId,
            user:userId
        }
        const  deleteItem = await Product.findOneAndDelete(conditions)
        if(!deleteItem) return res.status(404).json({
            success:false,
            message:' item not found'
        })

        res.status(200).json({
            success:true,
            message:'delete item successfully',
            deleteItem
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'something went wrongs'
        })
    }

})


module.exports = route