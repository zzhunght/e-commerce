const express = require('express')
const route = express.Router()
const Category = require('../models/category')



route.post('/', async (req,res)=>{

    const form = req.body
    try {
        const category = new Category(form)
        await category.save()

        res.json({
            success: true,
            category: category
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
    
})

route.get('/',async (req,res)=>{

    try {
        const category = await Category.find()
        res.json({
            success: true,
            category: category
        })

    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
})


module.exports = route