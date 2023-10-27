const Movie = require('../models/movie.model');
const Review = require('../models/review.model');


function MovieReviewAssociation() {
    Movie.hasMany(Review, {
        foreignKey: {
            name: 'MovieReviews',
            allNull: false,
        }, onDelete: 'CASCADE'
    })
}

module.exports = MovieReviewAssociation;