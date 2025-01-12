const { Task, Project } = require("../models");


const createTask = async (req, res) => {
    try {
        const { projectId,title, status } = req.body;
        const project = await Project.findByPk(projectId);
        if (!project) return res.status(404).json({ message: 'Project Not Found' });

        if (project.ownerId !== req.user.id) {
            return res.status(403).json({ message: 'Only the owner can create task in this project' });
        }
        const task = await Task.create({ title, status, projectId });
        return res.status(201).json({ task });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getTasksOfProject = async (req,res) => {
    try {
        const {projectId} = req.params
        const project = await Project.findByPk(projectId);
        if (!project) return res.status(404).json({ message: 'Project Not Found' });
        const tasks = await Task.findAll({ where: { projectId }})
        return res.status(201).json( tasks );
    } 
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getTasks = async (req,res) => {
    try {
        const task = await Task.findAll();
        if (!task) return res.status(404).json({ message: 'Tasks Not Found' });
        return res.status(200).json(task);
    } 
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const getTaskById = async (req,res) => {
    try {
        const {taskId} = req.params
        const task = await Task.findByPk(taskId);
        if (!task) return res.status(404).json({ message: 'Task Not Found' });
        return res.status(200).json({ task });
    } 
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateTaskStatus = async (req,res) => {
    try {
        const {taskId, newStatus } = req.body
        const task = await Task.findByPk(taskId);
        if (!task) return res.status(404).json({ message: 'Task Not Found' });
        // console.log(task);
        const project = await Project.findOne({ where: { projectId: task.projectId}})
        if(project.ownerId !== req.user.id) return res.status(403).json({ message: 'Only the owner can update task status' });
        await Task.update({status: newStatus},{ where: { taskId }})
        return res.status(204).json({ message: 'Task status updated successfully' });
    } 
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteTask = async (req,res) => {
    try {
        const {taskId } = req.params
        const task = await Task.findByPk(taskId);
        if (!task) return res.status(404).json({ message: 'Task Not Found' });
        // console.log(task);
        const project = await Project.findOne({ where: { projectId: task.projectId}})
        if(project.ownerId !== req.user.id) return res.status(403).json({ message: 'Only the owner can delete task' });
        await Task.destroy({ where: { taskId }})
        return res.status(204).json({ message: 'Task deleted successfully' });
    } 
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createTask,
    getTasks,
    getTasksOfProject,
    getTaskById,
    updateTaskStatus,
    deleteTask
}