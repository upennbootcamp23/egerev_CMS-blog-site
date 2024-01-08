const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');

User.hasMany(Post,
{
    foreignKey: 'user_id'
});

Post.belongsTo(User,
{
    foreignKey: 'user_id' 
});
      
User.hasMany(Comment, 
{
    foreignKey: 'user_id'
});

Comment.belongsTo(User, 
{
    foreignKey: 'user_id'
});

Post.hasMany(Comment, 
{
    foreignKey: 'post_id'
});
      
Comment.belongsTo(Post, 
{
    foreignKey: 'post_id'
});
          
module.exports = {Post,Comment,User};