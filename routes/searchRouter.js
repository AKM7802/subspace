const express=require('express')
const searchController=require('../controllers/searchController')

const searchRouter=express.Router()

searchRouter.route('/').get(searchController.getSearchResults)

module.exports=searchRouter