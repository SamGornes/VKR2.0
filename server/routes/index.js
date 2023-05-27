const Router = require('express')
const router = new Router()
const gps_fileRouter = require ('./gps_fileRouter')
const typeRouter = require ('./typeRouter')
const userRouter = require ('./userRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/gps_file', gps_fileRouter)


module.exports = router