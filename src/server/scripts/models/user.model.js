// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('../databases/sequelize.database');
// const bcrypt = require('bcrypt');
// const rounds = +process.env.ROUNDS


// class User extends Model { }

// User.init(
//     {
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//             unique: true,
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             set(value) {
//                 this.setDataValue('email', value.trim().toLowerCase());
//             },
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         role: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             defaultValue: 'user',
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     },
//     {
//         sequelize,
//         hooks: {
//             beforeCreate: async (user) => {
//                 const hashedPassword = await bcrypt.hash(user.password, rounds);
//                 user.password = hashedPassword;
//             },
//             beforeUpdate: async (user) => {
//                 if (user.changed('password')) {
//                     const hashedPassword = await bcrypt.hash(user.password, rounds);
//                     user.password = hashedPassword;
//                 }
//             },
//         },
//         timestamps: true,
//         modelName: 'User',
//     }
// );

// module.exports = User;
































const { DataTypes } = require('sequelize');
const sequelize = require('../databases/sequelize.database');
const bcrypt = require('bcrypt');
const rounds = +process.env.ROUNDS

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
