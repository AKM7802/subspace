
const fetch=require('node-fetch')
const _=require('lodash')

const options = {
    method: 'GET',
    headers: {
      'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
    }
};

//Memoize for search function
const search=_.memoize(function(arr,elem){
    let searchWord=_.lowerCase(elem)
    const resultArr=_.filter(arr.blogs,(el)=>{
        let lc=_.words(_.lowerCase(el.title))
            
        if(_.includes(lc,searchWord)) return el
    })
    return resultArr
})

exports.getSearchResults=async (req,res,next)=>{
    try{
        const doc=await fetch("https://intent-kit-16.hasura.app/api/rest/blogs",options)
        const resp=await doc.json()
        
        if(!req.query.query) {
            res.status(400).json({status:"Query parameter not provided"})
            return
        }

        const resultArr=search(resp,req.query.query)
        res.status(200).json({
            status:"Success",
            searchResult:resultArr
        })
    }catch(err){
        res.status(400).json({
            error:"Cannot fetch data"
        })
    }
}