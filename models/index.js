// import our 3 models created in the other files
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// creating an association will add a foreign key constraint to the attributes

// Creates a 1:m association between User and Posts
// combines one user to multiple posts
// adds a foreign key to target and plural association mixins to the source
User.hasMany(Post, {
// as foreign key to User
    foreignKey: 'user_id'
});

// associations where the foreign key for the 1:1 relation exists on the source model - in this case, Post
Post.belongsTo(User, {
// allows us to set source model key in the through relation
// adds foreign key to Post
// by default, the target key for a belongsTo relation will be the target models' primary key
    foreignKey: 'user_id',
// set cascade if foreignKey does not allow nulls
    onDelete: "cascade"
});

// adds a foreign key and singular association mixins to the source
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})
module.exports = { User, Post, Comment };