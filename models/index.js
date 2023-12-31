  // models/index.js

  const Blog = require('./Blog');
  const User = require('./User');
  const Comment = require('./Comment');

  // Associations
  User.hasMany(Blog, { foreignKey: 'user_id', onDelete: 'CASCADE' });
 Blog.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  Comment.belongsTo(Blog, {foreignKey: 'blog_id', onDelete: 'CASCADE'});
  User.hasMany(Comment,{foreignKey: 'user_id', onDelete: 'CASCADE'});
  Blog.hasMany(Comment, {
    foreignKey: 'blog_id', onDelete: 'CASCADE'  // This should match the name of the foreign key in the Comment model
  });

  module.exports = {
    Blog,
    User,
    Comment
  };
