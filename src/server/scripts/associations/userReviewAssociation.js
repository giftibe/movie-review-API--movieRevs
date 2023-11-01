const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const Review = require('../models/review.model');

function userReviewAssociation() {

    User.hasMany(Review,
        {
            foreignKey: {
                name: 'userReviews',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });


    Review.belongsTo(User, {
        foreignKey: {
            name: 'userReviewId',
            allowNull: false
        },
        onDelete: 'CASCADE'
    })
}

module.exports = userReviewAssociation;

