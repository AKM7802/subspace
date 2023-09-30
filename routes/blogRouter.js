const express=require('express')
const blogController=require('../controllers/blogController')

const blogRouter=express.Router()

blogRouter.route('/').get(blogController.getAllDetails)

module.exports=blogRouter