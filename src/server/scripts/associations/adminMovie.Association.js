const Admin = require('../models/Admin.model');
const Movie = require('../models/movie.model');

function adminMovieAssociation() {
    Admin.hasMany(Movie, {
        foreignKey: 'admin_Id',
        allowNull: false
    })

    Movie.belongsTo(Admin, {
        foreignKey: {
            name: 'review_Id',
            allowNull: false
        }
    })

}

module.exports = adminMovieAssociation

