const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Category, Hug, User } = require('../models');

router.get('/', async (req, res) => {

    const totalPosts = await Post.count();
    console.log(totalPosts);
    const encouragementPosts = await Post.count({
        where: {
            category_id: 1
        }
    });
    console.log(encouragementPosts);
    const positivePercent = encouragementPosts/totalPosts*100;
    console.log(positivePercent);

    res.render('homepage', { totalPosts, encouragementPosts, positivePercent });
    
});

router.get('/gripe', (req, res) => {
    Post.findAll({
        where: {
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
            attributes: ['content'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('gripes', {
                posts
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/encouragement', (req, res) => {
    Post.findAll({
        where: {
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
            attributes: ['content'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('encouragements', {
                posts
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('sign-up');
});

module.exports = router;