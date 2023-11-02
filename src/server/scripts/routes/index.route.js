const { Router } = require('express')
const router = Router()

const userRouter = require('./user.route')

router.use('/v1', userRouter)

module.exports = router