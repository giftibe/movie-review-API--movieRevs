const { DataTypes } = require('sequelize')
const sequelize = require('../databases/sequelize.database');
const Review = sequelize.define('review', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Review