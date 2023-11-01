const User = require('../models/user.model')
const generateToken = require('../utils/tokenGen')
const { MESSAGES } = require('../config/constant.config')


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

            if (newUser) {
                const userDetails = await User.findByPk(newUser.id, { attributes: { exclude: ["password"] } });
                const Token = generateToken(userDetails)

                const { password, ...details } = data.toJSON();
                return {
                    message: MESSAGES.USER_LOGGEDIN,
                    success: true,
                    details,
                    Token
                }
            } else {
                return {
                    message: 'Unable to create user',
                    success: false
                }
            }

        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error,
                success: false,
            };
        }
    }



    //login a user
    async loginUser(userData) {

        try {
            const email = userData.email;

            //check if the user email exists in db
            const findUser = await User.findOne({ where: { email: email } })
            if (!findUser) {
                return {
                    message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED,
                    success: false
                }
            }

            //compare passwords with jwt
            const inputPassword = userData.password
            const isMatch = await bcrypt.compare(inputPassword, findUser.password);
            if (!isMatch) {
                return res.status(403).send({
                    message: MESSAGES.USER.WRONG_PASSWORD,
                    success: false,
                });
            }

            const token = jwt.sign({ _id: findUser.id }, SECRET_KEY);
            const { password, ...userDetails } = findUser.toJSON();

            return {
                message: MESSAGES.USER_LOGGEDIN,
                success: true,
                userDetails,
                token
            }

        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error,
                success: false,
            };
        }
    }





    //update user

    async updateUser(userId, updatedUserInfo) {

        try {
            const searchUser = await User.findByPk(userId, { attributes: { exclude: ['password'] } });

            if (searchUser) {
                const updated = await User.update(updatedUserInfo, {
                    where: {
                        id: userId
                    }, returning: true
                });

                if (updated) {
                    return {
                        message: MESSAGES.USER.ACCOUNT_UPDATED,
                        success: true,
                        updated,
                    };
                } else {
                    return {
                        message: MESSAGES.USER.NOT_UPDATED,
                        success: false,
                    };
                }
            } else {
                return {
                    success: false,
                    message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED,
                };
            }

        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error,
                success: false,
            };
        }
    }


    //delete user


    
    //make a review
    //delete a review
    //update a review



}

module.exports = userService

