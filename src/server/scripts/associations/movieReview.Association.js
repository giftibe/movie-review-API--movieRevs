const Movie = require('../models/movie.model');
const Review = require('../models/review.model');


function MovieReviewAssociation() {
    Movie.hasMany(Review, {
        foreignKey: {
            name: 'movie_Id',
            allowNull: true,
        }, onDelete: 'CASCADE'
    })

    Review.belongsTo(Movie, {
        foreignKey: {
            name: 'movie_Id',
            allowNull: true,
        }

    })
}

module.exports = MovieReviewAssociation;