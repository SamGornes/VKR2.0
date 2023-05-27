const Router =require('express')
const router = new Router()
const gps_fileController = require('../controllers/gps_fileController')

router.post('/', gps_fileController.create)
router.get('/', gps_fileController.getAll)
router.get('/:id', gps_fileController.getOne)


module.exports = router