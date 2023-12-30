const sequelize = require('../config/connection');
const {
  User,
  Blog,
  Comment,
} = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed User data
  await User.bulkCreate(userData);

  // Seed Blog data
  await Blog.bulkCreate(blogData);

  //Seed comment data:
  await Comment.bulkCreate(commentData);


  process.exit(0);
};

seedDatabase();
