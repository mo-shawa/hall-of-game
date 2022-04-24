var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/users');


router.post('/', userCtrl.create);

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });



module.exports = router;
