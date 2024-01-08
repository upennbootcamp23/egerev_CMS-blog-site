const router = require('express').Router();

const apiRoutes = require('../controllers/api');
const homeRoutes = require('../controllers/home-routes.js');
const dashboardRoutes = require('../controllers/dashboard-routes.js');


router.use('/api',apiRoutes);
router.use('/',homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;