const sequelize = require('../databases/sequelize.database');
const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const Review = require('../mddels/review.model');

User.hasMany(Review);
Movie.hasMany(Review);
User.belongsToMany(Movie, { through: Review, as: 'MoviesReviewed', foreignKey: 'userId' });
Movie.belongsToMany(User, { through: Review, as: 'Reviewers', foreignKey: 'movieId' });
