const model = require('../models/connection')
const Rsvp = require('../models/rsvp');

exports.index = (req, res) => {
    model.find()
        .then(connections => res.render('./connection/connections', { connections }))
        .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render('./connection/new');
};

exports.create = (req, res, next) => {
    //res.send('Created a new connection');
    let connection = new model(req.body);//create a new connection document
    connection.author = req.session.user;
    connection.save()//insert the document to the database
        .then(connection => {
            req.flash('success', 'Connection has been created successfully');
            res.redirect('/connections');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id).populate('author', 'firstName lastName')
        .then(connection => {
            if (connection) {
                console.log(connection);
                res.render('./connection/show', { connection });
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
        .then(connection => {
            return res.render('./connection/edit', { connection });
        })
        .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, connection, { useFindAndModify: false, runValidators: true })
        .then(connection => {
            res.redirect('/connections/' + id);
        })
        .catch(err => {
            if (err.name === 'ValidationError')
                err.status = 400;
            next(err)
        });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    model.findByIdAndDelete(id, { useFindAndModify: false })
        .then(connection => {
            res.redirect('/connections');
        })
        .catch(err => next(err));

    Rsvp.deleteMany({ connection: id }, { useFindAndModify: false })
        .then(result => {
            res.redirect('/connections');
        })
        .catch(err => next(err));

};

exports.rsvp = (req, res, next) => {
    let id = req.params.id;
    let rsvp = req.params.rsvp;
    let user = req.session.user;

    let userRsvp = {
        connection: id,
        rsvp: req.body.rsvp,
        user: req.session.user.id
    }

    Rsvp.findOneAndUpdate({ connection: id, user: user }, userRsvp, { useFindAndModify: false, runValidators: true, upsert: true, new: true })
        .then(rsvp => {
            req.flash('success', 'Successful RSVP!');
            res.redirect('/users/profile');
        })
        .catch(err => next(err));
};
