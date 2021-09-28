const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./points-routes');

router.use('/api', apiRoutes);
router.use('/points', dashboardRoutes);

module.exports = router; 