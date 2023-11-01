const Admin = require('../models/Admin.model');
const Movie = require('../models/movie.model');

function adminMovieAssociation() {
    Admin.hasMany(Movie, {
        foreignKey: 'adMovieId',
        allowNull: false
    })

    Movie.hasOne(Admin, {
        foreignKey: {
            name: 'adminId',
            allowNull: false
        }
    })

}

module.exports = adminMovieAssociation

