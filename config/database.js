const mongoose = require('mongoose')

mongoose.connect(process.env.LOCAL_DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('connected', function () {
	console.log(`Connected to ${db.name} MongoDB at ${db.host}:${db.port}`)
})
