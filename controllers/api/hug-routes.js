const { User, Category, Post, Comment, Hug } = require('../../models');
const router = require('express').Router();

// Get all hugs

router.get('/', (req, res) => {
    Hug.findAll().then(dbHugData => res.status(200).json(dbHugData)).catch(err => {console.log(err); res.status(500).json(err);});
});

module.exports = router; 