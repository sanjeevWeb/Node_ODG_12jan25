const authenticateToken = require('../auth/auth.middleware')
const { createTask, getTasks, getTasksOfProject, updateTaskStatus, deleteTask, getTaskById } = require('../controllers/task.controller')

const routes = require('express').Router()

routes.post('/task', authenticateToken, createTask)

routes.get('/task', authenticateToken, getTasks)

routes.get('/task/project/:projectId', authenticateToken, getTasksOfProject)

routes.get('/task/:taskId', authenticateToken, getTaskById)

routes.put('/task', authenticateToken, updateTaskStatus)

routes.delete('/task/:taskId', authenticateToken, deleteTask)

module.exports = routes