const { Post } = require('../models');

const postdata = [
    {
        content: "Sometimes you just need to rest, and that's ok. (^^)b",
        flagged: false,
        user_id: 1,
        category_id: 1
    },
    {
        content: "SOMETIMES IT JUST FEELS LIKE I'M CONSTANTLY RUNNING IN A TUNNEL AND THERE'S NO END.",
        flagged: false,
        user_id: 3,
        category_id: 2
    },
    {
        content: "Sending you hugs and sweet dreams~!",
        flagged: false,
        user_id: 2,
        category_id: 1
    },
    {
        content: "You know, I kinda just need a hug. (;~;)",
        flagged: false,
        user_id: 4,
        category_id: 2
    },
    {
        content: "Don't tell yourself you aren't doing enough. You are doing your best, and I'm proud of you. Keep your head up, and keep dreaming!",
        flagged: false,
        user_id: 5, 
        category_id: 1
    },
    {
        content: "<insert sketchy comment that needs to be flagged and deleted here>",
        flagged: true,
        user_id: 3, 
        category_id: 2
    }
]

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;