const { User, Category, Post, Comment, Hug } = require('../../models');
const loggedIn = require('../../utils/loggedIn');
const router = require('express').Router();

// Get all comments

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'content',
            'created_at',
            'flagged'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Post,
                attributes: ['id'],
                include: {
                    model: Category,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbCommentData => res.status(200).json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

// Get one comment

router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'created_at',
            'flagged'
        ],
        include: [
            {
                model: Post,
                attributes: ['id'],
                include: {
                    model: Category,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id.' });
            return;
        }
        res.status(200).json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

// Create a comment

router.post('/', loggedIn, (req, res) => {
    Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.status(200).json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

// Update a comment

router.put('/:id', loggedIn, (req, res) => {
    Comment.update({
        content: req.body.content,
        flagged: req.body.flagged
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.status(200).json(dbCommentData); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

// Delete a comment

router.delete('/:id', loggedIn, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return; 
        }
        res.status(200).json(dbCommentData); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

module.exports = router; 