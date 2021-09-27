const { Category } = require('../models');

const categorydata = [
    {
        name: 'Support'
    },
    {
        name: 'Gripe'
    }
]

const seedCategories = () => Category.bulkCreate(categorydata); 

module.exports = seedCategories; 