const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();

// router.get('/', async (req, res) => {
//     try {
//         await res.render('homepage');
//     } catch (err) {
//         res.status(500).json(err);
//       }
// });

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            // console.log(dbPostData)
            // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // res.render('homepage', { posts, loggedIn: req.session.loggedIn });
            console.log('------------------------------------------');
            console.log(posts);
            console.log('------------------------------------------');
            // giving an obj w/ a prop called posts that is and array of obj(post objects)
            res.render('homepage', { post: posts[0] });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;