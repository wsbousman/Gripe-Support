const seedUsers = require('./user-seeds');
const seedCategories = require('./category-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const seedHugs = require('./hug-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force:true });
    
    console.log('Seeding Users');
    await seedUsers();

    console.log('Seeding Categories');
    await seedCategories();

    console.log('Seeding Posts');
    await seedPosts();

    console.log('Seeding Comments');
    await seedComments();

    console.log('Seeding Hugs');
    await seedHugs();

    process.exit(0);
};

seedAll();