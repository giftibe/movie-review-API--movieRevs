const express = require('express');
const helmet = require('helmet')
const colors = require('colors');
const app = express();
app.use(helmet())
const { database } = require('./scripts/databases/sequelize.database')
const router = require('./scripts/routes/index.route')
app.use(express.urlencoded({ extended: true }))

require('dotenv').config({ path: '../../.env' })
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT
app.use(express.json())

require('../server/scripts/associations/index.Association')


app.use('/api', router)




async function startServer() {
    try {
        await database();
        app.listen(PORT, () => {
            console.log(`🚀 ${'Server up and running'.blue}`);
        });

    } catch (error) {
        console.error('Database connection error:', error);
    }
}
startServer();


