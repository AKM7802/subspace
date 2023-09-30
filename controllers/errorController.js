const AppError=require('../utils/appError')


const sendErrorDev=(err,req,res)=>{
    
    if(req.originalUrl.startsWith('/api')){
        res.status(err.statusCode).json({
            status:err.status,
            error:err,
            message:err.message,
            stack:err.stack
        })
    }else{
      
        res.status(err.statusCode).render('error',{
            title:"Something went wrong!",
            msg:err.message 
        })
    }
    
}

const sendErrorProd=(err,req,res)=>{
    
    if(req.originalUrl.startsWith('/api')){
            
            if(err.isOperational){
                res.status(err.statusCode).json({
                    status:err.status,
                    message:err.message
                })
            }else{ 
                res.status(500).json({
                    error:err,
                    status:'error',
                    message:"Something went very wrong! Please be patient until it is taken care of"
                })
            }
    }else{
            if(err.isOperational){
                res.status(err.statusCode).render('error',{
                    title:"Something went wrong!",
                    msg:err.message 
                })
            }else{ 
                res.status(err.statusCode).render('error',{
                    title:"Something went wrong!",
                    msg:"Please try again later." 
                })
            }
    }
    
}

module.exports=(err,req,res,next)=>{

    err.statusCode=err.statusCode || 500;
    err.status=err.status || 'error';
    
    if(process.env.NODE_ENV=='development'){
        
        sendErrorDev(err,req,res)
    }else if(process.env.NODE_ENV=='production'){
        let error={...err}
        sendErrorProd(error,req,res)
    }
}