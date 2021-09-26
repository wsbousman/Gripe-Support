const { json } = require('sequelize/types');
const { User, Category, Post, Comment, Hug } = require('../../models');
const router = require('express').Router();

// Get all posts 

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'content',
            'created_at',
            'flagged',
            // Using raw MySQL syntax, we are grabbing the number of rows in the hug model where the post_id column value in the hug table is equal to the current post_id
            [sequelize.literal('SELECT COUNT(*) FROM hug WHERE post.id = hug.post_id'), 'hug_count']
        ],
        include: [
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
            [sequelize.literal('SELECT COUNT(*) FROM hug WHERE post.id = hug.post_id'), 'hug_count']
        ],
        include: [
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

router.post('/', (req, res) => {
    Post.create({
        content: req.body.content,
        user_id: req.body.user_id,
        category_id: req.body.category_id
    })
        .then(dbPostData => res.status(200).json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Edit a post

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostdata => {
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