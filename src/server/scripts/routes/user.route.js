const { Router } = require('express')
const userRouter = Router()
const userControllers = require('../controllers/user.controller')
const {
    create_User,
    login_user,
    update_user,
    find_User,
    create_Review,
    delete_Review,
    update_Review
} = userControllers


userRouter.post('/user/signup', create_User)
userRouter.post('/user/login', login_user),
    userRouter.post('/user/createReview/:movieID', create_Review)

userRouter.patch('/user/updateuser/:userId', update_user),
    userRouter.patch('/user/updateReview/:ReviewId', update_Review)

userRouter.get('/user/:userId', find_User),
    userRouter.delete('/user/deleteReview/:reviewId', delete_Review),
    module.exports = userRouter