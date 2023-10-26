const { DataTypes } = require('sequelize');
const sequelize = require('../databases/sequelize.database')
const bcrypt = require('bcrypt')
const rounds = +process.env.ROUNDS


const Admin = sequelize.define('admin', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'admin'
    }
}, {
    hooks: {

        beforeCreate: async (admin) => {
            admin.role = 'admin';
            // Hash the admin password during user creation
            const hashedPassword = await bcrypt.hash(admin.password, rounds);
            admin.password = hashedPassword;
        },

        beforeUpdate: async (admin) => {
            //hash the admin password when updated
            if (admin.changed('password')) {
                const hashedPassword = await bcrypt.hash(admin.password, rounds);
                admin.password = hashedPassword;
            }
        },
    },

    timestamps: true,
});
export default Admin;