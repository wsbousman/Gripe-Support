const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Category, Hug, User } = require('../models');

router.get('/', (req,res) => {
    Post.findAll({
    attributes: [
        'id',
        'category_id',
        [sequelize.literal('SELECT COUNT(*) FROM post WHERE post.category_id = 1)'), 'support_posts'],
        [sequelize.literal('SELECT COUNT(*) FROM post)'), 'all_posts']   
    ]
    })
    .then( dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts
        });
    });    
});

router.get('/gripe', (req,res) => {
    Post.findAll({
        where:{
            category_id: 2 
        },
        attributes: [
            'id',
            'content',
            'flagged',
            'category_id',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM hug WHERE post.id = hug.post_id)'), 'hug_count']
        ],      
        include: {
            model: Comment, 
            attributes:['content'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
    .then( dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('gripes', {
            posts
        });
    });
});

router.get('/encouragement', (req,res) => {
    Post.findAll({
        where:{
            category_id: 2 
        },
        attributes: [
            'id',
            'content',
            'flagged',
            'category_id',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM hug WHERE post.id = hug.post_id)'), 'hug_count']
        ],      
        include: {
            model: Comment, 
            attributes:['content'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
    .then( dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('encouragements', {
            posts
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
    res.render('sign-up');
});

module.exports = router;