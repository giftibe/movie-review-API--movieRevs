const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/sequelize.database');


const Review = sequelize.define('Review', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    reviewerId: {
        type: DataTypes.UUID,
        // allowNull: false,
    },

    movieID: {
        type: DataTypes.UUID,
        // allowNull: false,
    }


}, { timestamps: true },

);

module.exports = Review