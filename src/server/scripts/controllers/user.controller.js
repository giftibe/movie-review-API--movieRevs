const userServices = require('../services/user.service')
const {
    createUser,
    loginUser,
    updateUser,
    findUser,
    deleteReview,
    createReview
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
                message: result
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


    //    @route   PATCH /api/v1/user/update
    //     @desc    Handles user update
    //     *  @access  Private

    async update_user(req, res) {
        try {
            const updatedUserInfo = req.body
            const { userId } = req.params

            const result = await updateUser(userId, updatedUserInfo)
            return res.status(200).send({
                result
            })
        } catch (error) {
            res.status(500).send({
                message: 'Internal Server Error ' + error,
            })
        }
    }

    //    @route   POST /api/v1/user/search
    //     @desc    Handles user search
    //     *  @access  Private

    async find_User(req, res) {
        try {

            const { userId } = req.params
            const result = await findUser(userId)
            return res.status(200).send({
                result
            })

        } catch (error) {
            res.status(500).send({
                message: 'Internal Server Error ' + error,
            })
        }
    }

    // delete a review
    async delete_Review(req, res) {
        try {
            const { reviewID } = req.params
            const result = await deleteReview(reviewID)
            return res.status(200).send({
                result
            })
        } catch (error) {
            res.status(500).send({
                message: 'Internal Server Error ' + error,
            })
        }
    }


    //update review
    async update_Review(req, res) {
        try {
            const { reviewID } = req.params;
            const { updateInfo } = req.body
            const result = await updateReview(reviewID, updateInfo)
            return res.status(200).send({
                result
            })
        } catch (error) {
            res.status(500).send({
                message: 'Internal Server Error ' + error,
            })
        }
    }


    // make a review
    async create_Review(req, res) {
        try {
            const { movieID } = req.params;
            const review = req.body
            const result = await createReview(movieID, review)
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