var express = require('express')
var router = express.Router()

var itemController = require('../controllers/itemController')

router.get('/', itemController.all)
router.post('/add', itemController.add)
router.get('/create', itemController.create)
router.post('/update', itemController.update)
router.post('/delete', itemController.delete)
router.get('/view/(:id)', itemController.one)
router.get('/edit/(:id)', itemController.edit)

module.exports = router