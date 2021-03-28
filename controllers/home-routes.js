const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        await res.json('Hello');
    } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;