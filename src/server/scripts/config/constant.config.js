const DBconfig = {
    database: process.env.db,
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    ddialect: process.env.dialect
};
exports.module = DBconfig