const passport = require('passport')
const User = require('../models/user')

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK,
		},
		function (accessToken, refreshToken, profile, cb) {
			console.log(profile)
			User.findOne({ googleID: profile.id }, function (err, user) {
				if (err) return cb(err)
				if (user) return cb(null, user)

				let newUser = new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					googleID: profile.id,
				})

				newUser.save(function (err) {
					if (err) {
						return cb(err)
					} else {
						return cb(null, user)
					}
				})
			})
		}
	)
)

passport.serializeUser(function (user, done) {
	done(null, user.id)
})

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user)
	})
})
