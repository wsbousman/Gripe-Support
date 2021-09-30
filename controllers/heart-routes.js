const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Hug } = require('../models');
const addFunc = require('../heart.js')

router.get('/gripe', (req,res) => {
    Post.findAll({
    where:{
        category_id: 2
    },
    attributes: [
        [sequelize.literal('(SELECT COUNT(*) FROM post)'), 'support_posts']
    ]
    }).then( dbPostData => {
        const totalGripes = dbPostData;
        addFunc(totalGripes);
    });
});

router.get('/encouragement', (req,res) => {
    Post.findAll({
        where:{
            category_id: 2 
        },
        attributes: [
            [sequelize.literal('(SELECT COUNT(*) FROM hug)'), 'hug_count']
        ]
    }).then( dbPostData => {
        const totalHugs = dbPostData;
        addFunc(totalHugs);
    });
});

module.exports = router;