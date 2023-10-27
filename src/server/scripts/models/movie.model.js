const { DataTypes } = require('sequelize')
const sequelize = require('../databases/sequelize.database');
const { default: User } = require('./user.model');

const Movies = sequelize.define('movie', {
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

    reviews: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'username'
        },
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

Movies.hasOne(User, { foreignKey: 'reviews' });

module.exports = Movies