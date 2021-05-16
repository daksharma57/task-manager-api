const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req , res , next)  => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')   // To replace bearer from header and remove it from token to use token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)                  //To verify the token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user  // We will restore the user rather than showing it
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate. ' })
    }
}


module.exports = auth