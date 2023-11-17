const DBconfig = {
    database: process.env.db,
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    ddialect: process.env.dialect
};

require('dotenv').config({ path: '../../.env' })


MESSAGES = {
    DATABASE: {
        CONNECTED: 'Database connected',
        ERROR: "An error occured while connecting to database ",
    },

    SECRET: {
        SECRET_KEY: process.env.SECRET_KEY
    },

    USER: {
        EMAIL_UNSENT: 'Email not sent to receiver ',
        CREATED: 'Account created successfully ',
        EMAIL_DUPLICATE: 'Email already exist ',
        ERROR: 'An error occured ',
        RESET_PASSWORD_LINK_SENT: 'Reset pasword link sent to mail ',
        ACCOUNT_NOT_REGISTERED: 'Account is not registered ',
        VALID_LINK: 'Link is valid ',
        PASSWORD_UPDATED: 'Password Updated Successfully',
        N_CREATED: "User account creation unsuccessfully",
        USER_FOUND: "Users found successfully",
        USER_NOT_FOUND: "User not found",
        ENTER_EMAIL: "Enter email address",
        DUPLICATE_USERNAME: "Username already exists",
        REGISTERED: "Registration successful",
        EMAIL_NOTFOUND: "Email not found",
        LOGGEDIN: "Logged in successfully",
        W_PASSWORD: "Wrong password",
        INCORRECT_DETAILS: "Invalid credentials",
        LOGGEDOUT: "successfully loggedout",
        ACCOUNT_DELETED: "Account deleted successfully",
        NOT_ACCOUNT_DELETED: "Unable to delete user account",
        ACCOUNT_UPDATED: "Account updated successfully",
        NOT_UPDATED: "Account update unsuccessful",
        UNAUTHORIZED: "Unauthorized access ",
        EMAIL_SENT: "Reset link has been sent to your email",
        INVALID_LINK: "Link is invalid or has expired",
        EMAIL_VER_FAILED: "Email verification failed.",
        EMAIL_VERIFIED: "Email verified successfully.",
        WELCOME_EMAIL_ERROR: "error sending welcome email",
        INVALID_TOKEN: "Invalid or expired verification token.",
        NOT_VERIFIED: "user is not verified.",
        EMAIL_NOT_VERIFIED:
            "Email not verified. Please check your email for a verification link.",
        NO_ADS: 'No ads posted',
    },

    REVIEWS: {
        ADD_SUCCESSFUL: 'Review added successfully',
        RATING_CHANGED: 'Rating changed successfully',
        REVIEW_DELETED: 'Deletion was successful',
        DELETE_FAILED: 'Failed to delete review',
        UPDATE_SUCCESSFUL: 'Update was successful',
        UPDATE_FAILED: 'Failed to update review',
        ADD_FAILED: 'Addition of review failed',
        GET_ALL_FAILED: 'Fetching all reviews failed',
        GET_ONE_FAILED: 'Fetching one review failed',
        GET_ALL_SUCCESSFUL: 'All reviews fetched successfully',
        GET_ONE_SUCCESSFUL: 'One review fetched successfully',
    }
}

module.exports = { MESSAGES, DBconfig }
