const express = require('express');

const router = express.Router();

const getUsersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', getUsersController.getAll);
router.get('/:id', getUsersController.getSingle);

router.post('/',isAuthenticated, getUsersController.createUser);

router.put('/:id',isAuthenticated, getUsersController.updateUser);

router.delete('/:id',isAuthenticated, getUsersController.deleteUser);


module.exports = router;