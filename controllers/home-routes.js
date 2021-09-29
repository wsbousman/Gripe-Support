const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Category } = require('../models');

router.get('/', (req,res) => {
    Post.findAll({
    attributes: {
        include: [
            'id',
            'category_id',
            [sequelize.literal('SELECT COUNT(*) FROM post WHERE post.category_id = 1)'), 'support_posts'],
            [sequelize.literal('SELECT COUNT(*) FROM post)'), 'all_posts']
        ],   
        exclude: ['user_id']
    }
    })
    .then( dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('splash', {
            posts
            //count var
        });
    });    
});

router.get('/home', (req,res) => {
    Post.findAll({
        attributes: {
            include: [
            'id',
            'content',
            'flagged',
            'category_id',
            'created_at'
            ],
            exclude: ['user_id']
        }         
    })
    .then( dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts
            //count var
        });
    });
});

router.get('/login', (req,res) => {
   if(req.session.loggedIn) {
       res.redirect('/');
       return;
   }
   res.render('login');
});

router.get('/signup', (req,res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;