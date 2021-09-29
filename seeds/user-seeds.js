const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
    {
        username: 'supremoadmino',
        password: 'password',
        admin: true
    },
    {
        username: 'ILOVEGIVINGHUGS',
        password: 'password',
    },
    {
        username: 'SketchySketch',
        password: 'password',
    },
    {
        username: 'ILOVEHUGS',
        password: 'password',
    },
    {
        username: 'SupremeDreamin',
        password: 'password',
    }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers; 