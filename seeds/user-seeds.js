const { User } = require('../models');

const userData = [{
        username: 'Jesse',
        password: 'Asalamalenka'

    },
    {
        username: 'Francis',
        password: 'Powerman5000'
    },
    {
        username: 'JefferyD',
        password: 'CannibalCorpse!58'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;