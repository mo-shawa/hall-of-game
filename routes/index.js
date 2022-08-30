var express = require('express')
var router = express.Router()
const passport = require('passport')

/* GET home page. */
router.get('/', function (req, res) {
	// res.redirect("/items");
	let user = req.user
	res.render('landing', { user })
})

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
	'/oauth2callback',
	passport.authenticate('google', {
		successRedirect: '/games',
		failureRedirect: '/',
	})
)

router.get('/logout', function (req, res) {
	req.logOut()
	res.redirect('/')
})

router.get('/test', function (req, res) {
	console.log(req.user)
	res.send('tested')
})

module.exports = router
