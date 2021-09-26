const { User, Category, Post, Comment, Hug } = require('../../models');
const router = require('express').Router();

// Get all categories

router.get('/', (req, res) => {
    Category.findAll({})
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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
                if(!dbCategorydata) {
                    res.status(404).json({ message: 'No category found with that id' });
                    return; 
                }
                res.status(200).json(dbCategorydata ); 
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err); 
            });
});

// Delete a category

router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if(!dbCategoryData) {
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
