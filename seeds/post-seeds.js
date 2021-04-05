const { Post } = require('../models');

const postData = [{
        title: "Fear of Job Insecurity",
        content: "I am afraid to leave my current job in pursuit of an internship.",
        user_id: 1

    },
    {
        title: "So much to learn!",
        content: "Are we guinea pigs on a wheel? I think not! Why is it then that we are expected to learn so many new concepts in so little time?",
        user_id: 2
    },
    {
        title: "Perpetually burnt out",
        content: "What is the point of pursuing a better life thanks to tech, when all I feel like is a cog in the machine, for years now? And I still havent landed my first job?",
        user_id: 3
    },
    {
        title: "I miss socializing",
        content: "I got into tech for a better life, but it takes so long just to get your first job. I just wish it got easier. I wish I could be coddled, or I wish I could be strong enough. I wish I could be loved. I wish I had balance. I wish I had a teacher on command. Oh well... Im venting. I just wish I enjoyed my situation more.",
        user_id: 4
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;