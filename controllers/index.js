// imports express' router object
const router = require('express').Router();
// points to our index.js within the api folder
const apiRoutes = require('./api');
// imports our home-route
const homeRoutes = require('./home-routes.js');
// imports our dashboard-routes
const dashboardRoutes = require('./dashboard-routes.js');

// directs route variable based on what comes from front end javascript or user
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
// request object contains info about the HTTP request
// if response does not trigger any of the above routes
// throw a 404 which is "This localhost page can't be found" on Chrome
router.use((req, res) => {
    res.status(404).end();
});
module.exports = router;