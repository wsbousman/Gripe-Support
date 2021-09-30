const { User, Category, Post, Comment, Hug } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req,res) => {
    res.render('test', {});
});

router.get('/success', (req,res) => {
    res.render('success', {});
})

module.exports = router; 