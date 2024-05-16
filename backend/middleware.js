const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./config');

const authmiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(404).json({})
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        res.userID = decoded.userID;
        next();
    }
    catch{
        return res.status(403).json({})
    }

}

module.exports = {
    authmiddleware
}