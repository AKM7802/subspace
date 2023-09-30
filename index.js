const express=require('express')
const cors=require('cors')
const ErrorController=require('./controllers/errorController')
const blogRouter=require('./routes/blogRouter')
const searchRouter=require('./routes/searchRouter')

const app=express()

app.use(cors())
app.options('*',cors)

app.use(express.json())

app.use('/api/blog-stats',blogRouter)
app.use('/api/blog-search',searchRouter)

app.use('/',(req,res)=>{
    res.end("Welcome to subspace")
})

app.use(ErrorController)
module.exports=app