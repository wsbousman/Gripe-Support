const { User, Category, Post, Comment, Hug } = require('../../models');
const loggedIn = require('../../utils/loggedIn');
const isAdmin = require('../../utils/isAdmin');
const router = require('express').Router();
const sequelize = require('../../config/connection');

// Get all posts 

router.get('/' , (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'content',
            'created_at',
            'flagged',
            // Using raw MySQL syntax, we are grabbing the number of rows in the hug model where the post_id column value in the hug table is equal to the current post_id
            [sequelize.literal('(SELECT COUNT(*) FROM hug WHERE post.id = hug.post_id)'), 'hug_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Category,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'created_at', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get Encouragement Posts + Total Posts 
router.get('/count', async (req, res) => {

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

    res.status(200).json({encouragementPosts, totalPosts});
    
});

// Grab one post

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'created_at',
            'flagged',
            // Using raw MySQL syntax, we are grabbing the number of rows in the hug model where the post_id column value in the hug table is equal to the current post_id
            [sequelize.literal('(SELECT COUNT(*) FROM hug WHERE post.id = hug.post_id)'), 'hug_count']
        ],
        include: [
            {
                model: Category,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'created_at', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.status(200).json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a post 

router.post('/', loggedIn, (req, res) => {
    Post.create({
        content: req.body.content,
        user_id: req.session.user_id,
        category_id: req.body.category_id
    })
        .then(dbPostData => res.status(200).json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Add a hug to a post - must come before the /:id put request

router.put('/giveHug', loggedIn, (req, res) => {
    // First, create a new Hug in the hug model, then find the post that was given the hug, and return it with the new hug count. 
    Hug.create({
        user_id: req.session.user_id,
        post_id: req.body.post_id,
        category_id: req.body.category_id
    })
    .then(() => {
        return Post.findOne({
            where: {
                id: req.body.post_id
            },
            attributes: [
                'id',
                'content',
                'created_at',
                'flagged',
                [sequelize.literal('(SELECT COUNT(*) FROM hug WHERE post.id = hug.post_id)'), 'hug_count']
            ]
        })
    })
    .then(dbPostData => res.status(200).json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

// Edit a post

router.put('/:id', loggedIn, (req, res) => {
    Post.update(
        {
            content: req.body.content,
            flagged: req.body.flagged
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with that id' });
                return;
            }
            res.status(200).json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete a post

router.delete('/:id', loggedIn, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with that id' });
            return; 
        }
        res.status(200).json(dbPostData); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

module.exports = router;