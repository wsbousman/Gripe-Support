const { User, Category, Post, Comment, Hug } = require('../../models');
const sequelize = require('../../config/connection');
const router = require('express').Router();

// Get all users

router.get('/', (req, res) => {
    User.findAll({
        attributes: [
            'id',
            'username',
            'admin',
        ]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(500).json(err);
        });
});

// Get one user

router.get('/:id', (req, res) => {
    
    Post.sum('hug_count', {where: {'user_id': req.params.id}}).then(sum => console.log(sum));

    User.findOne({
        attributes: [
            'id',
            'username',
            'admin',
            // Using raw MySQL syntax, we are grabbing the number of rows in the hug model where the user_id column value in the hug table is equal to the current user_id
            [sequelize.literal('(SELECT COUNT(*) FROM hug WHERE user.id = hug.user_id)'), 'hug_count']
        ],
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
            // {
            //     model: Comment,
            //     attributes: ['id', 'content', 'created_at'],
            //     include: {
            //         model: Post,
            //         attributes: ['id', 'content']
            //     }
            // },
            // {
            //     model: Post,
            //     attributes: ['id', 'content'],
            //     through: Hug,
            //     as: 'hugged_posts'
            // }
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
            req.session.save(() => {
                req.session.user_id = dbUserData.id,
                req.session.admin = dbUserData.admin,
                req.session.loggedIn = true

                res.status(200).json({user: dbUserData, message: 'You are now logged in!' });
            });
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
            password: req.body.password,
            admin: req.body.admin
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

// Route to log in user

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json({message: 'No user exists with that username!'});
                return;
            }

            const validPassword = dbUserData.checkPassword(req.body.password); 

            if(!validPassword) {
                res.status(400).json({ message: 'Incorrect username or password' });
                return; 
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id,
                req.session.admin = dbUserData.admin,
                req.session.loggedIn = true

                res.status(200).json({user: dbUserData, message: 'You are now logged in!' });
            });
        });
});

// Route to logout user

router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router; 

