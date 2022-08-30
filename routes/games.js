var express = require('express')
var router = express.Router()
var gamesCtrl = require('../controllers/games')

router.get('/', gamesCtrl.index)
router.get('/new', gamesCtrl.new)
router.get('/:id', gamesCtrl.show)
router.post('/', gamesCtrl.create)
router.post('/:id/comments', gamesCtrl.createComment)

module.exports = router
