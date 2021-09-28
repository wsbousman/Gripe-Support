const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Hug, Category } = require('../models');

router.get('/:id', async (req, res) => {
    let postHugs = 0;
    let encouragementPosts = 0; 
    await Post.findAll({
        where: {
            user_id: req.params.id,
            category_id: 1
        },
        attributes: ['id', 'content', [sequelize.literal('(SELECT COUNT(*) FROM hug WHERE post.id = hug.post_id)'), 'hug_count']]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            encouragementPosts = posts.length; 
            console.log(encouragementPosts);
            posts.forEach(post => {
                postHugs = postHugs + post.hug_count
            });
            console.log(postHugs);

        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })

    const comments = await Comment.count({
        where: {
            user_id: req.params.id
        }
    });
    console.log(comments);

    const hugsGiven = await Hug.count({
        where: {
            user_id: req.params.id
        }
    });
    
    console.log(hugsGiven);

    res.status(200).json({ user_points: hugsGiven + comments + postHugs + encouragementPosts});

});

module.exports = router;