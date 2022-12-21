const { Router } = require('express');

const userRoutes = require('./users/user.routes');
const roleRoutes = require('./roles/role.routes');

const { Authorize } = require('../middleware/auth');

const router = Router();

router.use('/user', userRoutes);
router.use('/roles', Authorize('ROLE'), roleRoutes);

module.exports = router;