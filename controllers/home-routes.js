const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        await res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;