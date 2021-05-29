const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const tokenSecret = 'my-token-secret'

function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}

exports.checkLogin = (req,res) => {
    User.findOne({phone: req.query.phone})
        .then(user => {
            if (!user) res.status(404).send({err:'no user with that phone'})
            else {
                bcrypt.compare(req.query.password, user.password, (error, match) => {
                    if (error) res.status(500).send(error)
                    else if (match) res.status(200).send({id:user._id,token: generateToken(user)})
                    else res.status(403).json({error:'passwords do not match'})
                })
            }
        }).catch(error => res.status(500).send(error))
}
