const Connection = require('../models/connection');

//check if user is a guest
exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        req.flash('error', 'you are logged in already');
        return res.redirect('/users/profile');
    }
};
//check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'you need to log in first');
        return res.redirect('/users/login');
    }
};
//check if user is author of the connection
exports.isAuthor = (req, res, next) => {
    let id = req.params.id;

    //an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    Connection.findById(id)
        .then(connection => {
            if (connection) {
                if (connection.author == req.session.user) {
                    return next();
                } else {
                    let err = new Error('Unauthorized to access the resource');
                    err.status = 401;
                    return next(err);
                }
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};