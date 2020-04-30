const config =require('config')
const jwt =require("jsonwebtoken")
function auth(req,res,next){
    // get Token from header
    const token =req.header('x-auth-token')
    //check for token
    if(!token) return res.status(401).json({msg:"no token authorization false"})
    try {
    //verifiy token
    const decoded =jwt.verify(token, config.get('jwtSecret'))
    //add user from payload
    req.user=decoded.user
    next()
    } catch (e) {
        res.status(400).json({msg:'token is not valid'})
    }
    
}
module.exports= auth