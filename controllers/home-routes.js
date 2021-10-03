const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Category, Hug, User } = require('../models');
const loggedIn = require('../utils/loggedIn');

router.get('/', async (req, res) => {
    res.render('homepage', {
    loggedIn: req.session.loggedIn
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
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch( err => {
        res.status(500).json(err);
    });
});

router.get('/encouragement', (req,res) => {
    Post.findAll({
        where:{
            category_id: 1 
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
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch( err => {
        res.status(500).json(err);
    });
});

router.get('/signup', (req,res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('sign-up');
});

module.exports = router;