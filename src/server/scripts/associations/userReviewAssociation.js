const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const Review = require('../models/review.model');

function userReviewAssociation() {

    User.hasMany(Review,
        {
            foreignKey: {
                name: 'user_Id',
                allowNull: false
            },
            // onDelete: 'CASCADE'
        });


    Review.belongsTo(User, {
        foreignKey: {
            name: 'review_Id',
            allowNull: false
        },
        // onDelete: 'CASCADE'
    })
}

module.exports = userReviewAssociation;

