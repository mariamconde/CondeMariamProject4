const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//GET /home send the user to the homepage
router.get('/', controller.index);

//GET /about send the user to the about page
router.get('/about', controller.show);

//GET /contact send the user to the contact page
router.get('/contact', controller.update);

module.exports = router;