const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '../../.env' })

const sequelize = new Sequelize(
    process.env.db,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.host,
        dialect: process.env.dialect
    }
);

const database = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log(`${"✔✔✔".green}`, 'database connected'.green);
        return sequelize;
    } catch (error) {
        console.log('An error occurred '.red, error);
    }
};

module.exports = { sequelize, database };
