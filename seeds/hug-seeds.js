const { Hug } = require('../models');

const hugdata = [
    {
        user_id: 2,
        post_id: 1,
        category_id: 1
    },
    {
        user_id: 5,
        post_id: 1,
        category_id: 1
    },
    {
        user_id: 1,
        post_id: 2,
        category_id: 2
    },
    {
        user_id: 2,
        post_id: 2,
        category_id: 2
    },
    {
        user_id: 4,
        post_id: 2,
        category_id: 2
    },
    {
        user_id: 5,
        post_id: 2,
        category_id: 2
    },
    {
        user_id: 1,
        post_id: 4,
        category_id: 2
    },
    {
        user_id: 2,
        post_id: 4,
        category_id: 2
    },
    {
        user_id: 3,
        post_id: 4,
        category_id: 2
    },
    {
        user_id: 5,
        post_id: 4,
        category_id: 2
    },
    {
        user_id: 1,
        post_id: 5,
        category_id: 1
    },
    {
        user_id: 2,
        post_id: 5,
        category_id: 1
    },
    {
        user_id: 3,
        post_id: 5,
        category_id: 1
    }
];

const seedHugs = () => Hug.bulkCreate(hugdata); 

module.exports = seedHugs; 