const Sequelize = require('sequelize');

require('dotenv').config();

// let sequelize;

// if (process.env.JAWSDB_URL) {
//     sequelize = new Sequelize(process.env.JAWSDB_URL);
//     console.log('jaws');
// } else {
//     sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//         host: 'localhost',
//         dialect: 'mysql',
//         port: 3306
//     });
//     console.log('local');
// }


// the process.env global variable is injected by the Node at runtime for your application to use and it represents the state of the system environemnt your application is in when it starts
// if the environment contains a JAWSDB_URL (used in our .env to connect to the Heroku Jaws database) then create a new Sequelize instance
// otherwise create a Sequelize instance with names for the database name, user, and password
const sequelize = process.env.JAWSDB_URL ? new Sequelize(process.env.JAWSDB_URL) : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
// the underlying connector library used by Sequelize for MySQL is mysql2 npm package
    dialect: 'mysql',
// we can provide custom options to it using the dialectOptions in the Seuqlize constructor:
    dialectOptions: {
// if we are sure that our data won't run into precision issues we can set decimalNumbers to true when instantiating to get the previous behaviour (float not string)
        decimalNumbers: true,
    },
});

module.exports = sequelize;