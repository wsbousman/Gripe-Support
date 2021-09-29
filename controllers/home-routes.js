const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post } = require('../models');

router.get('/', (req,res) => {
    Post.findAll({

    })
    .then( dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('splash-page', {
            posts
            //count var
        });
});

router.get('/home', (req,res) => {

});

router.get('/login', (req,res) => {

});

router.get('/signup', (req,res) => {

});

module.exports = router;