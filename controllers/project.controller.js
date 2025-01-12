const { Project, User } = require("../models");


const createProject = async (req, res) => {
    try {
        const { name } = req.body;
        const project = await Project.create({ name, ownerId: req.user.id });
        res.status(201).json({ project });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTasksOfProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findByPk(projectId, {
            include: [Task],
        });
        console.log(project);
        if (!project) return res.status(404).json({ message: 'Project Not Found' });
        return res.status(200).json({ tasks: project.Tasks });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: {
                ownerId: req.user.id
            }
        });
        console.log(projects);
        if (!projects) return res.status(404).json({ message: 'Projects Not Found' });
        return res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params
        const project = await Project.findOne({
            where: {
                projectId,
                ownerId: req.user.id
            }
        });
        console.log(project);
        if (!project) return res.status(404).json({ message: 'Project Not Found' });
        return res.status(200).json({ project });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const assignUserToProject = async (req, res) => {
    try {
        const { projectId, userId } = req.body;
        const project = await Project.findByPk(projectId);
        if (!project) return res.status(404).json({ message: 'Project Not Found' });

        if (project.ownerId !== req.user.id) {
            return res.status(403).json({ message: 'Only the owner can assign users' });
        }

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User Not Found' });

        // Assign user to project
        await project.addUser(user);

        return res.status(200).json({ message: 'User assigned to project successfully' });
    } 
    catch (error) {
        console.error('Error assigning user to project:', error);
        return res.status(500).json({ error: error.message });
    }
}
const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name, newOwnerId } = req.body
        const project = await Project.findByPk(projectId);
        if (!project) return res.status(404).json({ message: 'Project Not Found' });
        if (project.ownerId !== req.user.id) {
            return res.status(403).json({ message: 'Only the owner can update projects' });
        }
        // const user = await Project.update({name?: name},{ where: { projectId } })
        const updates = {};
        if (name) updates.name = name;
        if (newOwnerId) {
            const newOwner = await User.findByPk(newOwnerId);
            if (!newOwner) return res.status(404).json({ message: 'New owner not found' });
            updates.ownerId = newOwnerId;
        }

        // updating the project with the specified fields
        await project.update(updates)

        return res.status(204).json({ message: 'Project updated successfully', project });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findByPk(projectId);
        if (!project) return res.status(404).json({ message: 'Project Not Found' });
        if (project.ownerId !== req.user.id) {
            return res.status(403).json({ message: 'Only the owner can delete projects' });
        }
        await Project.destroy({ where: { ownerId: req.user.id } })
        return res.status(204).json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    getTasksOfProject,
    assignUserToProject,
    updateProject,
    deleteProject
}