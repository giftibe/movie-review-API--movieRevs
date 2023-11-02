const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, SECRET)
}

module.exports = generateToken