const { Comment } = require('../models');

const commentdata = [
    {
        content: "Thank you friend, I needed that. (T~T)b",
        flagged: false,
        user_id: 5,
        post_id: 1
    },
    {
        content: "Fret not, that's what I'm here for~!",
        flagged: false,
        user_id: 2,
        post_id: 4
    },
    {
        content: "THIS IS EXACTLY WHAT I NEEDED, GOODNIGHT! (`~`)",
        flagged: false,
        user_id: 4,
        post_id: 3
    },
    {
        content: "I used to feel like that too, it's miserable. What really helped me was setting smaller goals, you know taking baby steps. Hopefully that will help you too. (^^)b",
        flagged: false,
        user_id: 1,
        post_id: 2
    },
    {
        content: '<insert rude comment here>',
        flagged: true,
        user_id: 3,
        post_id: 3
    },
    {
        content: "Thank you friend, this helped me get through today!",
        flagged: false,
        user_id: 1,
        post_id: 5
    },
    {
        content: 'Ayyo this post kinda sus',
        flagged: false,
        user_id: 1,
        post_id: 6
    }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments; 

