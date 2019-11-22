const employeeCtrl = require('../controllers/employee');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, employeeCtrl.addEmployee);
router.get('/' + '', auth, employeeCtrl.getAllEmployee);
router.get('/:id', auth, employeeCtrl.getOneEmployee);
router.delete('/:id', auth, employeeCtrl.deleteEmployee);
router.put('/:id', auth, employeeCtrl.updateEmployee);


module.exports = router;