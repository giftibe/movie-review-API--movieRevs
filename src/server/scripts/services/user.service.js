const User = require('../models/user.model')
const generateToken = require('../utils/tokenGen')


class userService {

    //create user
    async createUser(data) {
        try {

            const { email } = data;
            //check if email exist
            const users = await User.findAll({ where: email, attributes: { exclude: ["password"] } });
            if (users) {
                return res.status(409).send({
                    message: 'Email already exists',
                    success: false
                })
            }

            const newUser = await create({
                email: email,
                password: data.password
            })

            const userDetails = await User.findByPk(newUser.id, { attributes: { exclude: ["password"] } });
            const Token = generateToken(userDetails)

            const { password, ...details } = data.toJSON();
            return {
                message: 'MESSAGES.USER_LOGGEDIN',
                success: true,
                details,
                Token
            }


        } catch (error) {

        }
    }

    //login a user
    //update user
    //delete user
    //make a review
    //delete a review
    //update a review



}

module.exports = userService

