const User = require('../models/user.model')
const Review = require('../models/review.model')
const generateToken = require('../utils/tokenGen')
const { MESSAGES } = require('../config/constant.config')
const validateID = require('../utils/validateID')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = MESSAGES.SECRET;





class userService {

    //create user
    async createUser(data) {
        try {
            const { email } = data;
            // Check if email exists
            const users = await User.findAll({
                where: { email },
                attributes: { exclude: ["password"] }
            });

            const emailExists = users.length > 0;
            const errorMessage = emailExists
                ? MESSAGES.USER.ERROR + "Email already exist"
                : " User created";

            if (emailExists) {
                return {
                    message: errorMessage,
                    success: false,
                };
            }

            // Create a new user
            const newUser = await User.create({
                email: email,
                password: data.password,
                username: data.username
            });

            if (newUser) {
                const userDetails = await User.findByPk(newUser.id, { attributes: { exclude: ["password"] } });
                const Token = generateToken(userDetails);

                return {
                    message: MESSAGES.USER.CREATED,
                    success: true,
                    userDetails,
                    Token
                };
            }

            return {
                message: "ERROR: Unable to create user",
                success: false
            };
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
                const searchUser = await User.findByPk(userId, { attributes: { exclude: ['password'] } });


                if (updated) {
                    return {
                        message: MESSAGES.USER.ACCOUNT_UPDATED,
                        success: true,
                        result: searchUser,
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


    //find a user
    async findUser(userId) {
        try {
            //validate the userData
            if (validateID(userId)) {
                const findUser = await User.findByPk(userId, { attributes: { exclude: ['password'] } })
                if (findUser) {
                    return {
                        message: MESSAGES.USER.USER_FOUND,
                        success: true,
                        findUser
                    }
                } else {
                    return {
                        message: MESSAGES.USER.NO_USER_FOUND,
                        success: false
                    }
                }
            } else {
                return {
                    message: MESSAGES.USER.INCORRECT_DETAIL,
                    success: false
                }
            }
        }
        catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error,
                success: false,
            };
        }
    }




    //delete a review
    async deleteReview(reviewID) {
        try {
            const deletedUser = await Review.destroy({
                where: {
                    id: reviewID
                }
            });

            if (deletedUser) {
                return {
                    message: MESSAGES.REVIEW.REVIEW_DELETED,
                    success: true
                }
            } else {
                return {
                    message: MESSAGES.REVIEW.DELETE_FAILED,
                    success: false
                }
            }
        }
        catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error,
                success: false,
            };
        }
    }

    //update a review

    async updateReview(reviewID, updateInfo) {
        try {
            if (validateID(reviewID)) {
                const searchUser = await Review.findAll({
                    where: { id: reviewID }
                });
                if (searchUser) {
                    const newUpdate = await Review.update({ review: updateInfo }, {
                        where: {
                            id: reviewID
                        },
                        returning: true
                    });
                    if (newUpdate) {
                        return {
                            message: MESSAGES.REVIEW.UPDATED,
                            success: true,
                            newUpdate
                        }
                    } else {
                        return {
                            message: MESSAGES.REVIEW.UPDATE_FAILED,
                            success: false
                        }
                    }
                } else {
                    return {
                        message: MESSAGES.REVIEW.NOT_FOUND,
                        success: false
                    }
                }
            }
        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error,
                success: false,
            };

        }
    }


    // make a review
    async createReview(movieID, review) {

        //validate if the movieID
        console.log('first', movieID)
        console.log('second', review)

        // if (validateID(movieID)) {
            const newReview = await Review.create({
                movieID: movieID,
                content: review,
                // reviewerId: user.ID //coming from the cookies
            })

            console.log('newReview', newReview)

            if (newReview) {
                return {
                    message: MESSAGES.REVIEW.ADD_SUCCESSFUL,
                    success: true,
                    newReview
                }
            }

            else {
                return {
                    message: MESSAGES.REVIEW.ADD_FAILED,
                    success: false
                }
            }
        // } else {
            // return {
            //     message: MESSAGES.USER.INCORRECT_DETAIL,
            //     success: false
            // }
        // }
    }

}

module.exports = new userService()



