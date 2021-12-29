const verifyToken = require('../middleware/auth')
const Cart = require('../models/cart')
const User = require('../models/user')
const express = require('express')
const route = express.Router()

// get cart 
route.get('/',verifyToken,async (req,res)=>{
    const userId = req.userId

    try {
        const user = await User.findOne({user:userId})
        if(!user) {
            return res.status(400).json(
              {
                success:false,
                message:'Can not find user'
              }
            )
        }

        const cart = await Cart.findOne({user:userId}).populate({
            path:'products',
            populate:{
                path: 'productId',
                select:'name imageUrl description'
            }
        })
        res.status(200).json({
            success:true,
            message:' get cart item successfully',
            cart:cart
        })

    } catch (error) {
        console.error(error)
        res.status(404).json({
            message:'somethings went wrongs'
        })
    }
})



//api/cart
// add item to cart

route.put('/add',verifyToken, async (req,res) => {
    const userId = req.userId

    try {
        const products = req.body
        const user = await User.findOne({user:userId})
        if(!user) {
            return res.status(400).json(
              {
                success:false,
                message:'Can not find user'
              }
            )
        }

        const cart = await Cart.findOneAndUpdate(
            {user:userId},
            {$push:{products:products}},
            {new:true}

        )
       
        console.log(cart)
        res.status(200).json({
            success:true,
            message:'Cart added successfully',
            cart:cart
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Some Things went wrongs'
        })
        
    }
})


//update cart

route.patch('/update/:id',verifyToken, async (req,res) =>{
    const userId = req.userId
    const id = req.params.id

    try {
        const item = req.body
        console.log(item)
        const user = await User.findOne({user:userId})
        if(!user) {
            return res.status(400).json(
              {
                success:false,
                message:'Can not find user'
              }
            )
        }

        const cart = await Cart.findOneAndUpdate(
            {
                user:userId,
                products:{ $elemMatch:{_id:id}}
            },
            {
                $set: {
                    "products.$.skus":req.body.skus,
                    "products.$.quantity":req.body.quantity,
                    "products.$.productId":req.body.productId,
                }
            },
            {
                new:true,
            }
            
        )
       

        res.status(200).json({
            success:true,
            message:'Cart update successfully',
            cart:cart
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Some Things went wrongs'
        })
        
    }
})

// delete item of cart 

route.delete('/delete/:id', verifyToken,async (req,res) =>{
    const userId = req.userId
    const id = req.params.id

    try {
        const user = await User.findOne({user:userId})
        if(!user) {
            return res.status(400).json(
              {
                success:false,
                message:'Can not find user'
              }
            )
        }
        const cart = await Cart.findOneAndUpdate(
            {
                user:userId,
                products:{ $elemMatch:{_id:id}}
            },
            {
                $pull: {
                    products:{_id:id}
                }
            },
            {
                new:true,
            }
            
        )
        
        res.status(200).json({
            success:true,
            message:' delete item successfully',
            cart:cart
        })

    } catch (error) {
        console.error(error)
        res.status(404).json({
            message:'somethings went wrongs'
        })

    }
})







module.exports = route