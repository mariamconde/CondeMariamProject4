const express = require('express');
const controller = require('../controllers/connectionController');

const router = express.Router();

//GET /connections: send all connections to the user
router.get('/', controller.index);

//GET /connections/new: send html form for creating a new connection
router.get('/new', controller.new);

//POST /connections: create a new connection
router.post('/', controller.create);

//GET /connections/:id send details of connections identified by id
router.get('/:id', controller.show);

//GET /connections/:id/edit send html form for editing an existing conection
router.get('/:id/edit', controller.edit);

//PUT /connections/:id update the connection identified by id
router.put('/:id', controller.update);

//DELETE /connections/:id, delete the connection by id
router.delete('/:id', controller.delete);

module.exports = router;
