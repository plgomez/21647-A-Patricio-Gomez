const { Sequelize } = require('sequelize');

const dbName = process.env.dbName;
const dbUserName = process.env.dbUserName;
const dbPassword = process.env.dbPassword;
const dbDialect = process.env.dbDialect;

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
    host: 'localhost',
    dialect: dbDialect
});

const DBTest = async () => {
    try {
        await sequelize.authenticate();
        console.log('Se pudo conectar a la base de datos.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}

module.exports = { sequelize, DBTest }
