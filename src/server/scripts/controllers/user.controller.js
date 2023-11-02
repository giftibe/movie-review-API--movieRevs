const userServices = require('../services/user.service')
const {
    createUser,
    loginUser,
    updateUser,
    findUser,
    deleteReview,
} = userServices

class userController {


    //    @route   POST /api/v1/user/createUser
    //     @desc    Handles user account creation
    //     *  @access  Private
    async create_User(req, res) {
        try {

            const data = req.body
            const result = await createUser(data)
            return res.status(200).send({
                message: result,
            })
        } catch (error) {
            res.status(500).send({
                message: 'Internal Server Error ' + error,
            })
        }
    }

    //    @route   POST /api/v1/user/login
    //     @desc    Handles user login
    //     *  @access  Private
    async login_user(req, res) {
        try {
            const userData = req.body
            const result = await loginUser(userData)
            return res.status(200).send({
                result
            })
        } catch (error) {
            res.status(500).send({
                message: 'Internal Server Error ' + error,
            })
        }
    }

}

module.exports = new userController()