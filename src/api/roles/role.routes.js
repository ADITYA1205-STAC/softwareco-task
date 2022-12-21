const { Router } = require('express');
const roleController = require('./role.controller');
const roleValidation = require('./role.validations');

const Validate = require('../../middleware/validate');

const router = Router();

router.get('/:id', roleController.get);
router.put('/:id', roleController.update);
router.post('/', Validate(roleValidation.createRole), roleController.create);
router.put('/user/:id', Validate(roleValidation.addRole), roleController.addRole);
router.delete('/:id', roleController.deleteRole);
router.post('/user/:id', Validate(roleValidation.addRole), roleController.removeRole);


module.exports = router;