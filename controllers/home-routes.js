// imports our connections
const sequelize = require('../config/connection');
// imports our 3 model object files
const { Post, User, Comment } = require('../models');
// imports express' router object
const router = require('express').Router();

// router.get('/', async (req, res) => {
//     try {
//         await res.render('homepage');
//     } catch (err) {
//         res.status(500).json(err);
//       }
// });

// on home page, find all posts
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
    // map response to remove extra Sequelize model crap
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
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// if login button is clicked, redirect to login handlebars page
// if on route and user is logged in, redirect to home page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// same as our login page, except signup counts as a login
router.get('/signup', (req, res) => {
    res.render('signup');
});

// when a user clicks on a post on the home page, view it
// eventually this will be where a user can add comments
router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
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
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbPostData.get({ plain: true });
            console.log(post);
            res.render('single-post', { post, loggedIn: req.session.loggedIn });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;