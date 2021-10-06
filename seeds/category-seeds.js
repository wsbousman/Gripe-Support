const { Category } = require('../models');

const categorydata = [
    {
        name: 'Encouragement'
    },
    {
        name: 'Gripe'
    }
]

const seedCategories = () => Category.bulkCreate(categorydata); 

module.exports = seedCategories; 