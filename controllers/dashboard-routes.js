const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Hug, Category, Comment } = require('../models');
const loggedIn = require('../utils/loggedIn');

router.get('/', loggedIn, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'content',
            'flagged',
            'user_id',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['content']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/view/:id', loggedIn, (req, res) => {
    Post.findOne({
        where: {
            user_id: req.session.user_id,
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'flagged',
            'user_id',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM hug WHERE post.id = hug.post_id)'), 'hug_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['content']
            }
        ]
    })
        .then(dbPostData => {
            const post = dbPostData.get({ plain: true });
            res.render('view-my-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    
});

// router.get('/edit/:id', (req,res) => {
//     Post.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: [
//             'id',
//             'content',
//             'flagged',
//             'user_id',
//             'created_at'
//         ],
//         include: [
//             {
//             model: User,
//             attributes:['username']
//             },
//             {
//             model: Hug,
//             attributes:['id', 'user_id', 'post_id', 'created_at']
//             }    
//         ]    
//     })
//     .then(dbPostData => {
//         const posts = dbPostData.map(post => post.get({ plain: true }));
//         res.render('edit-post', { posts, loggedIn: true });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

module.exports = router;