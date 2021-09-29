const router = require('express').Router();

const apiRoutes = require('./api')
const testRoutes = require('./test-routes');

router.use('/test', testRoutes);
router.use('/api', apiRoutes);

module.exports = router; 