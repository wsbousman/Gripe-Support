const { User, Category, Post, Comment, Hug } = require('../../models');
const router = require('express').Router();

// Get all users

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(500).json(err);
        });
});

// Get one user

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'content', 'created_at'],
                include: {
                    model: Category,
                    attributes: ['id', 'name']
                }
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['id', 'content']
                }
            },
            {
                model: Post,
                attributes: ['id', 'content'],
                through: Hug,
                as: 'hugged_posts'
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.status(200).json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Route to create a user

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin
    })
        .then(dbUserData => {
            res.status(200).json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Route to update user => expects both a username and password, important to include both as the password gets salted again on update. If no 'req.body.admin' is provided, then it should default to false. 

router.put('/:id', (req, res) => {
    User.update(
        {
            username: req.body.username,
            password: req.body.password
            // ,admin: req.body.admin
        },
        {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.status(200).json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Route to delete user 

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.status(200).json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); 
        });
});

module.exports = router; 

