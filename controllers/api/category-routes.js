const { User, Category, Post, Comment, Hug } = require('../../models');
const loggedIn = require('../../utils/loggedIn');
const router = require('express').Router();
const sequelize = require('../../config/connection');

// Get all categories

router.get('/', (req, res) => {
    Category.findAll({
        attributes: [
            'id',
            'name',
            // Using raw MySQL syntax, we are grabbing the number of rows in the hug model where the category_id column value in the hug table is equal to the current category_id
            [sequelize.literal('(SELECT COUNT(*) FROM post WHERE category.id = post.category_id)'), 'post_count']
        ]
    })
        .then(dbCategoryData => res.status(200).json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get one category 

router.get('/:id', (req, res) => {

    Category.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            // Using raw MySQL syntax, we are grabbing the number of rows in the hug model where the category_id column value in the hug table is equal to the current category_id
            [sequelize.literal('(SELECT COUNT(*) FROM post WHERE category.id = post.category_id)'), 'post_count']
        ],

        include: [
            {
                model: Post,
                attributes: ['id', 'content', 'created_at']
            }
        ]
    })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No category with that id could be found' });
                return;
            }
            res.status(200).json(dbCategoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a category

router.post('/', loggedIn, (req, res) => {
    Category.create({
        name: req.body.name
    })
        .then(dbCategoryData => {
            res.status(200).json(dbCategoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update a category

router.put('/:id', loggedIn, (req, res) => {
    Category.update(
        {
            name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbCategorydata => {
            if (!dbCategorydata) {
                res.status(404).json({ message: 'No category found with that id' });
                return;
            }
            res.status(200).json(dbCategorydata);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete a category

router.delete('/:id', loggedIn, (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No category found with that id' });
                return;
            }
            res.status(200).json(dbCategoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
