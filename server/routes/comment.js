const express = require('express')
const route = express.Router()
const Comment = require('../models/comment')

//get comment
route.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const comments = await Comment.find({product:id}).populate({
            path:'user',
            select:'firstName lastName'
        })

        if(!comments) {
            return res.json({
                success: false,
                message: 'NO Comment Found !'
            })
        }

        res.status(200).json({
            success: true,
            comments
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Somethings went wrongs !'
        })
    }
})

// post comment

route.post('/:id', async (req, res) => {

    try {
        const id = req.params.id
        console.log(req.body)
        const {rating,user,comment} = req.body
        const newcmt = new Comment({
            product:id,
            user,
            rating,
            comment
        })
        await newcmt.save()
        res.status(200).json({
            success:true,
            comment:newcmt
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Somethings went wrongs !'
        })
    }
})

module.exports = route