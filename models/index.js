const User = require('./User');
const Category = require('./Category');
const Post = require('./Post');
const Comment = require('./Comment');
const Hug = require('./Hug');

// A Post belongs to one User, but a User can have many Posts

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Post, {
    foreignKey: 'user_id',
});

// A Post belongs to one Category, but a Category can have many Posts

Post.belongsTo(Category, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

Category.hasMany(Post, {
    foreignKey: 'category_id'
});

// A Comment belongs to one User, but a User can have many Comments

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// A Comment belongs to one Post, but a Post can have many Comments

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// A Hug belongs to one Category, but a Category can have many Hugs

Hug.belongsTo(Category, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

Category.hasMany(Hug, {
    foreignKey: 'category_id'
});

// A Hug belongs to one User, but a User can have many Hugs

Hug.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Hug, {
    foreignKey: 'user_id'
});

// A Hug belongs to one Post, but a Post can have many Hugs

Hug.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

User.hasMany(Hug, {
    foreignKey: 'post_id'
});

// Many Users can Hug many Posts -> relationship set through the Hug model, as User (parent) does not reference its child (Post). Hug references both User & Post

// The foreign key here is the key that is associated with model A in the through model. 

Post.belongsToMany(User, {
    through: Hug,
    as: 'hugged_posts',
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

User.belongsToMany(Post, {
    through: Hug,
    as: 'hugged_posts',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Category, Post, Comment, Hug}

