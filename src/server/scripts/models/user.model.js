const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/sequelize.database');
const bcrypt = require('bcrypt');
const rounds = +process.env.ROUNDS;

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('email', value.trim().toLowerCase());
        },
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['user', 'admin']], 
        },
        defaultValue: 'user',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, rounds);
            user.password = hashedPassword;
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const hashedPassword = await bcrypt.hash(user.password, rounds);
                user.password = hashedPassword;
            }
        },
    },
    timestamps: true,
});

module.exports = User;
