const router = require('express').Router();
// imports user, post, and comment models to use with our routes
const { User, Post, Comment } = require('../../models');

// for /api/users, find all of this users data besides the password
// if found, return it to the screen; otherwise - drive an error
// 500 - internal Server Error - unexpected condition prevents request fulfill
router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['[password'] }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get back to this later to better understand this process
// when you click on this id, you get user info minus the password
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'created_at'
                    ]
                },

                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                },
                {
                    model: Post,
                    attributes: ['title'],
                }
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// when user signs up, we create a username and password in the request
// for our user data, what we want to is log them into their session
router.post('/', (req, res) => {

    User.create({
        username: req.body.username,
        password: req.body.password
    })

    .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// when user clicks login button, find their corresponding username
// if there is no username with that data, let them know with a 400
// 400 - Bad Request (seed MDN docs)
// otherwise, check password against stored bcrypted password
// if incorrect - 400
//  otherwise, save their session
// otherwise, 500 - Internal Server Error
router.post('/login', (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        }).then(dbUserData => {
            if (!dbUserData) {
                // json message does not appear
                res.status(400).json({ message: 'No user with that username!' });
                return;
            }
            const validPassword = dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }
            req.session.save(() => {

                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// when user clicks logout, frontend script triggers to destroy sessions
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            // 204 - No Content success status
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;