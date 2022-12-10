const express = require('express');
const controller = require('../controllers/connectionController');
const { isLoggedIn, isAuthor } = require('../middlewares/auth');
const { validateId, validateConnection } = require('../middlewares/validator');

const router = express.Router();

//GET /connections: send all connections to the user
router.get('/', controller.index);

//GET /connections/new: send html form for creating a new connection
router.get('/new', isLoggedIn, controller.new);

//POST /connections: create a new connection
router.post('/', isLoggedIn, validateConnection, controller.create);

//GET /connections/:id send details of connections identified by id
router.get('/:id', validateId, controller.show);

//GET /connections/:id/edit send html form for editing an existing connection
router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

//PUT /connections/:id update the connection identified by id
router.put('/:id', validateId, validateConnection, isLoggedIn, isAuthor, controller.update);

//DELETE /connections/:id, delete the connection by id
router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

module.exports = router;
