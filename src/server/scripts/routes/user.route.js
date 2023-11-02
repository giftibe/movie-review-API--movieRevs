const { Router } = require('express')
const userRouter = Router()
const userControllers = require('../controllers/user.controller')
const {
    create_User,
    login_user
} = userControllers


userRouter.post('/user/signup', create_User)
userRouter.post('/user/login', login_user)

module.exports = userRouter