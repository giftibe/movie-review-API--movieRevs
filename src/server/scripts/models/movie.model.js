// const { default: User } = require('./user.model');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/sequelize.database');


const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        set(value) {
            this.setDataValue('title', value.trim());
        }
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        set(value) {
            this.setDataValue('description', value.trim());
        }
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})



module.exports = Movie