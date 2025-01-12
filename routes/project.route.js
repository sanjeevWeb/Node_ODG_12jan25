const authenticateToken = require("../auth/auth.middleware");
const { createProject, getTasksOfProject, assignUserToProject, getProjects, getProjectById, updateProject, deleteProject } = require("../controllers/project.controller");
const routes = require('express').Router()

routes.post('/projects', authenticateToken, createProject);

routes.get('/projects', authenticateToken, getProjects);

routes.get('/project/:projectId', authenticateToken, getProjectById);

routes.put('/project/:projectId', authenticateToken, updateProject);

routes.delete('/project/:projectId', authenticateToken, deleteProject);

routes.get('/projects/:projectId/tasks', authenticateToken, getTasksOfProject); // get All Tasks for a Project

routes.post('/projects/user', authenticateToken, assignUserToProject); // assign User to Project

module.exports = routes