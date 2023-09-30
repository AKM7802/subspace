
const fetch=require('node-fetch')
const _=require('lodash')

const options = {
    method: 'GET',
    headers: {
      'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
    }
  };
  

exports.getAllDetails=async (req,res,next)=>{
    try{
        //DATA RETRIEVAL
        const doc=await fetch("https://intent-kit-16.hasura.app/api/rest/blogs",options)
        const resp=await doc.json()
        
        
        //DATA ANALYSIS
        const blogsPresent=_.size(resp.blogs)
        let privacyCount=0
        let length=0
        let LongestString=""
        let curL
        _.forEach(resp.blogs,(el)=>{
            if((curL=_.size(el.title)) > length){
                length=curL
                LongestString=el.title
            }
            let lc=_.words(_.lowerCase(el.title))
            
            if(_.includes(lc,'privacy')) privacyCount+=1

        })
        const uniqueArray=_.uniqBy(resp.blogs,"title")
        
        //DATA RESPONSE
        res.status(200).json({
            status:"Success",
            NumberOfBlogs:blogsPresent,
            LongestBlog:LongestString,
            NumberOfPrivacyBlogs:privacyCount,
            UniqueBlogs:uniqueArray
        })
    }catch(err){
        res.status(400).json({
            error:"There has been an error retrieving data."
        })
    }
    
    
}