const authenticateToken = require("../auth/auth.middleware");
const { createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controller");

const routes = require('express').Router()


routes.post('/register', createUser);

routes.post('/login', loginUser);

routes.get('/users',authenticateToken ,getAllUsers);

routes.get('/user/:id',authenticateToken ,getUserById);

routes.put('/user',authenticateToken, updateUser);

routes.delete('/user',authenticateToken ,deleteUser);

module.exports = routes