const { Sequelize } = require("sequelize");
require('dotenv').config()

const { PGDATABASE, PGHOST, PGUSER, PGPASSWORD, POSTGRESQL_DB_URI } = process.env

// const sequelize = new Sequelize(PGDATABASE,
//     PGUSER,
//     PGPASSWORD,
//     {
//         host: PGHOST,
//         dialect: 'postgres'
//     });

const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI, {
    dialect: 'postgres',
});

const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = {
    sq: sequelize, testDbConnection
}