const movieReviewAssociation = require('./movieReview.Association')
const userReviewAssociation = require('./userReviewAssociation')
const adminMovieAssociation = require('./adminMovie.Association')


function mergedAssociations() {
    adminMovieAssociation()
    userReviewAssociation()
    movieReviewAssociation()    
}

module.exports = mergedAssociations();