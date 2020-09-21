require('dotenv').config()
const jwt = require('jsonwebtoken')
const helpers = require('../helpers/response')
const auth = {
    verifyAccsess: (req, res, nex)=>{
        let token = req.headers.authorization
        token = token.split(' ')[1]
        jwt.verify(token, process.env.SECRET, function(err){
            if(err){
                if (err.name === 'JsonWebTokenError'){
                    return helpers.response(res, {message: 'Token Invalid!'}, 403, null)
                } else if (err.name === 'TokenExpiredError'){
                    return helpers.response(res, {message: 'Token Expired !'}, 403, null)
                } else {
                    return helpers.response(res, null, 403, err)
                }
            }
        })
    }
}

module.exports = auth