const Movie = require('../models/movie.model');
const Review = require('../models/review.model');


function MovieReviewAssociation() {
    Movie.hasMany(Review, {
        foreignKey: {
            name: 'moviesId',
            allowNull: true,
        }, onDelete: 'CASCADE'
    })

    Review.belongsTo(Movie, {
        foreignKey: {
            name: 'ReviewsId',
            allowNull: true,
        }

    })
}

module.exports = MovieReviewAssociation;