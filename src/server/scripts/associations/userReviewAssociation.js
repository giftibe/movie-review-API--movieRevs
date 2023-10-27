const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const Review = require('../models/review.model');

function userReviewAssociation() {

    User.hasMany(Movie,
        {
            foreignKey: {
                name: 'userReviews',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });


    Review.belongsToMany(Movie, {
        foreignKey: {
            name: 'user',
            allowNull: false
        },
        onDelete: 'CASCADE'
    })
}

module.exports = userReviewAssociation;

