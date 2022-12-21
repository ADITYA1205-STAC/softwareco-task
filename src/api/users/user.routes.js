const { Router } = require('express');

const userController = require('./user.controller');
const userValidation = require('./user.validation');
const { Authorize } = require('../../middleware/auth')

const Validate = require('../../middleware/validate');

const router = Router();

router.post('/login', Validate(userValidation.login), userController.login);

router.post('/register', Validate(userValidation.register), userController.register);

router.get('/', Authorize('USER'), userController.list);
router.put('/', Authorize('USER'), userController.bulkUpdateDetails);
router.put('/bulk', Authorize('USER'), userController.bulkUpdateWithDiffCondition);

module.exports = router;