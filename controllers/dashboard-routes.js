const router = require('express').Router();
const sequelize = require('../config/connection');
<<<<<<< HEAD
const { User, Post, Hug, Category, Comment} = require('../models');
=======
const { User, Post, Hug, Category, Comment } = require('../models');
>>>>>>> 45f500c6f46fcd77bcfb70899495f74ebf0e2f18
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
<<<<<<< HEAD
            model: User,
            attributes:['username']
            },
            {
                model: Category,
                attributes: ['name']    
=======
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['name']
>>>>>>> 45f500c6f46fcd77bcfb70899495f74ebf0e2f18
            },
            {
                model: Comment,
                attributes: ['content']
            }
<<<<<<< HEAD
        ]    
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
=======
        ]
>>>>>>> 45f500c6f46fcd77bcfb70899495f74ebf0e2f18
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