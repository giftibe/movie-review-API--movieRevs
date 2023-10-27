import Admin from '../models/Admin.model';
const Movie = require('../models/movie.model');

function adminMovieAssociation() {
    Admin.hasMany(Movie, {
        foreignKey: 'movies',
        allowNull: true
    })

    Movie.hasOne(Admin, {
        foreignKey: {
            name: 'adminId',
            allowNull: false
        }
    })

}

module.exports = adminMovieAssociation
