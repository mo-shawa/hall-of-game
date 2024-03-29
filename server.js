var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var logger = require('morgan')
var methodOverride = require('method-override')
var favicon = require('serve-favicon')
require('dotenv').config()
require('./config/database')
require('./config/passport')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var itemsRouter = require('./routes/items')
var gamesRouter = require('./routes/games')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')))
app.use(methodOverride('_method'))

// set user to res.locals
app.use(function (req, res, next) {
	res.locals.user = req.user || null
	next()
})

app.use('/', indexRouter)
app.use('/users', usersRouter)
// New routes
app.use('/items', itemsRouter)
app.use('/games', gamesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
