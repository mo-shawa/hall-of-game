const User = require('../models/user');

module.exports = {
    create: create,
}
function create(req, res) {

    delete req.body.password_confirm
    console.log(req.body);

    User.create(req.body, function (err, user) {
        if (err) return res.send(err.message);
        res.redirect('items')

    });


}