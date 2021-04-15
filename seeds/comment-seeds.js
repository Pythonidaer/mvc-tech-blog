const { Comment } = require('../models');

const commentData = [{
        comment_text: "I deserve to get hired.",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "I hope this recruiter can help...",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "I don't even know if I want to code anymore!",
        user_id: 3,
        post_id: 3
    },
    {
        comment_text: "Don't let yourself get burnt out",
        user_id: 4,
        post_id: 4
    }
];

// here we edit more than one record at a time by utilizing bulkCreate
// we will use the above array of objects to seed our database with some sample comments
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;